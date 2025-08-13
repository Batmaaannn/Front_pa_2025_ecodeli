<template>
  <div class="w-full max-w-2xl space-y-8">
    <Alert v-if="successMessage" isSuccess>{{ successMessage }}</Alert>
    <Alert v-if="errorMessage" isError>{{ errorMessage }}</Alert>

    <div v-if="!successMessage">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">
        Documents professionnels
      </h2>

      <div class="space-y-6">
        <div v-for="doc in requiredDocuments" :key="doc.key" class="">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ doc.label }}
            <span class="text-red-500">*</span>
          </label>
          <DropUploadFile
            :files="getFilesForDocument(doc.key)"
            :multiple="false"
            @upload="handleFileUpload($event, doc.key)"
            @delete="handleFileDelete($event, doc.key)"
          />
        </div>
      </div>

      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
    </div>

    <StepperNavigationButtons
      v-if="!successMessage"
      :show-previous="navigation.canGoPrevious"
      :disable-next="!allFilesUploaded"
      :loading="loading"
      :next-text="navigation.nextButtonText.value"
      @previous="navigation.goToPreviousStep"
      @next="handleNext"
    />

    <div v-if="successMessage" class="flex justify-center">
      <Button @click="goToLogin" isGreen>Se connecter</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStepperNavigation } from "@/composables/useStepperNavigation";
import { useAuthStore } from "@/stores/auth.store";
import StepperNavigationButtons from "@/components/StepperNavigationButtons.vue";
import Button from "@/components/formControls/Button.vue";
import DropUploadFile from "@/components/formControls/DropUploadFile.vue";
import Alert from "@/components/formControls/Alert.vue";

const navigation = useStepperNavigation();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Determine registration type from route
const registrationType = computed(() => {
  if (route.path.includes("/livreur")) return "delivery_agent";
  if (route.path.includes("/commercant")) return "merchant";
  if (route.path.includes("/prestataire")) return "service_agent";
  return "";
});

// Define required documents based on registration type
const requiredDocuments = computed(() => {
  const baseDocuments = [
    { key: "identity", label: "Pièce d'identité", accept: "image/*,.pdf" },
    { key: "kbis", label: "Extrait Kbis", accept: "image/*,.pdf" },
  ];

  if (registrationType.value === "delivery_agent") {
    return [
      ...baseDocuments,
      {
        key: "driving_license",
        label: "Permis de conduire",
        accept: "image/*,.pdf",
      },
      {
        key: "vehicle_registration",
        label: "Carte grise du véhicule",
        accept: "image/*,.pdf",
      },
    ];
  }

  return baseDocuments;
});

const uploadedFiles = ref<Record<string, File[]>>({});
const error = ref("");
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const allFilesUploaded = computed(() => {
  return requiredDocuments.value.every(
    (doc) => uploadedFiles.value[doc.key]?.length > 0
  );
});

const getFilesForDocument = (key: string): File[] => {
  return uploadedFiles.value[key] || [];
};

const handleFileUpload = (file: File, key: string) => {
  if (!uploadedFiles.value[key]) {
    uploadedFiles.value[key] = [];
  }
  // Only allow one file per document type
  uploadedFiles.value[key] = [file];
  error.value = "";
};

const handleFileDelete = (fileName: string, key: string) => {
  if (uploadedFiles.value[key]) {
    uploadedFiles.value[key] = uploadedFiles.value[key].filter(
      (file) => file.name !== fileName
    );
  }
};

const goToLogin = () => {
  router.push("/connexion");
};

onMounted(() => {
  const savedData = navigation.getCurrentStepData();
  if (savedData && savedData.uploadedFiles) {
    uploadedFiles.value = savedData.uploadedFiles;
  }
});

const handleNext = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    if (!allFilesUploaded.value) {
      error.value = "Veuillez télécharger tous les documents requis";
      loading.value = false;
      return;
    }

    // Save current step data
    navigation.saveStepData({
      uploadedFiles: uploadedFiles.value,
    });

    // If it's the last step, submit registration
    if (navigation.isLastStep.value) {
      await submitRegistration();
    } else {
      navigation.goToNextStep();
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
};

const getStepSuffixe = () => {
  switch (registrationType.value) {
    case "delivery_agent":
      return "DeliveryAgent";
    case "merchant":
      return "Merchant";
    case "service_agent":
      return "ServiceAgent";
    default:
      return "";
  }
};

const submitRegistration = async () => {
  try {
    const allStepData = authStore.stepData;
    const suffix = getStepSuffixe();

    const registrationData: any = {};

    // Add personal information
    const personalInfo = allStepData[`Informations${suffix}`] || {};
    Object.assign(registrationData, personalInfo);

    // Add company information
    const companyInfo = allStepData[`CompanyInformations${suffix}`] || {};
    Object.assign(registrationData, companyInfo);

    // Add specific step data based on registration type
    if (registrationType.value === "delivery_agent") {
      const vehicleInfo =
        allStepData[`VehiculeInformations${suffix}`] || {};
      Object.assign(registrationData, vehicleInfo);
    } else if (registrationType.value === "service_agent") {
      const prestationsInfo =
        allStepData[`PrestationsChoice${suffix}`] || {};
      Object.assign(registrationData, prestationsInfo);
    }

    // Add files (flatten the array of arrays)
    registrationData.files = Object.values(uploadedFiles.value).flat();

    console.log("Registration Data:", registrationData);
    // Call appropriate registration method
    switch (registrationType.value) {
      case "delivery_agent":
        await authStore.registerDeliveryAgent(registrationData);
        break;
      case "merchant":
        await authStore.registerMerchant(registrationData);
        break;
      case "service_agent":
        await authStore.registerServiceAgent(registrationData);
        break;
    }

    successMessage.value =
      "Votre inscription a été soumise avec succès ! Un email de confirmation vous sera envoyé après validation.";
    authStore.stepData = {};
  } catch (err: any) {
    errorMessage.value =
      err ||
      "Une erreur est survenue lors de l inscription. Veuillez reessayer.";
  }
};
</script>

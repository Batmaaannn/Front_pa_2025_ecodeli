<template>
  <div class="w-full max-w-2xl space-y-8">
    <!-- Success Message -->
    <div v-if="successMessage" class="bg-green-50 p-4 rounded-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="bg-red-50 p-4 rounded-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
        </div>
      </div>
    </div>

    <div v-if="!successMessage">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Documents professionnels</h2>

      <!-- File upload section -->
      <div class="space-y-4">
        <div v-for="doc in requiredDocuments" :key="doc.key" class="border rounded-lg p-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ doc.label }}
            <span class="text-red-500">*</span>
          </label>
          <input
            type="file"
            :accept="doc.accept"
            @change="handleFileChange($event, doc.key)"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
          <p v-if="uploadedFiles[doc.key]" class="mt-2 text-sm text-green-600">
            [OK] {{ uploadedFiles[doc.key].name }}
          </p>
        </div>
      </div>

      <!-- Validation error -->
      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
    </div>

    <!-- Navigation buttons -->
    <StepperNavigationButtons
      v-if="!successMessage"
      :show-previous="navigation.canGoPrevious"
      :disable-next="!allFilesUploaded"
      :loading="loading"
      :next-text="navigation.nextButtonText.value"
      @previous="navigation.goToPreviousStep"
      @next="handleNext"
    />

    <!-- After success, show login button -->
    <div v-if="successMessage" class="flex justify-center">
      <Button @click="goToLogin" isGreen>Se connecter</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStepperNavigation } from '@/composables/useStepperNavigation';
import { useAuthStore } from '@/stores/auth.store';
import StepperNavigationButtons from '@/components/StepperNavigationButtons.vue';
import Button from '@/components/formControls/Button.vue';

const navigation = useStepperNavigation();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Determine registration type from route
const registrationType = computed(() => {
  if (route.path.includes('/livreur')) return 'delivery_agent';
  if (route.path.includes('/commercant')) return 'merchant';
  if (route.path.includes('/prestataire')) return 'service_agent';
  return '';
});

// Define required documents based on registration type
const requiredDocuments = computed(() => {
  const baseDocuments = [
    { key: 'identity', label: 'Piece d identite', accept: 'image/*,.pdf' },
    { key: 'kbis', label: 'Extrait Kbis', accept: 'image/*,.pdf' },
  ];

  if (registrationType.value === 'delivery_agent') {
    return [
      ...baseDocuments,
      { key: 'driving_license', label: 'Permis de conduire', accept: 'image/*,.pdf' },
      { key: 'vehicle_registration', label: 'Carte grise du vehicule', accept: 'image/*,.pdf' },
    ];
  }

  return baseDocuments;
});

const uploadedFiles = ref<Record<string, File>>({});
const error = ref('');
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const allFilesUploaded = computed(() => {
  return requiredDocuments.value.every(doc => uploadedFiles.value[doc.key]);
});

const handleFileChange = (event: Event, key: string) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    uploadedFiles.value[key] = target.files[0];
    error.value = '';
  }
};

const goToLogin = () => {
  router.push('/connexion');
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
    errorMessage.value = '';

    if (!allFilesUploaded.value) {
      error.value = 'Veuillez telecharger tous les documents requis';
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
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
};

const getStepPrefix = () => {
  switch (registrationType.value) {
    case 'delivery_agent': return 'Livreur';
    case 'merchant': return 'Commercant';
    case 'service_agent': return 'Prestataire';
    default: return '';
  }
};

const submitRegistration = async () => {
  try {
    const allStepData = authStore.stepData;
    const prefix = getStepPrefix();
    
    // Prepare data for registration
    const registrationData: any = {};
    
    // Add personal information
    const personalInfo = allStepData[`${prefix} - Informations Personnelles`] || {};
    Object.assign(registrationData, personalInfo);
    
    // Add company information  
    const companyInfo = allStepData[`${prefix} - Informations Entreprise`] || {};
    Object.assign(registrationData, companyInfo);

    // Add specific step data based on registration type
    if (registrationType.value === 'delivery_agent') {
      const vehicleInfo = allStepData[`${prefix} - Informations Vehicule`] || {};
      Object.assign(registrationData, vehicleInfo);
    } else if (registrationType.value === 'service_agent') {
      const prestationsInfo = allStepData[`${prefix} - Prestations`] || {};
      Object.assign(registrationData, prestationsInfo);
    }
    
    // Add files
    registrationData.files = Object.values(uploadedFiles.value);

    // Call appropriate registration method
    switch (registrationType.value) {
      case 'delivery_agent':
        await authStore.registerDeliveryAgent(registrationData);
        break;
      case 'merchant':
        await authStore.registerMerchant('merchant', registrationData);
        break;
      case 'service_agent':
        await authStore.registerServiceAgent(registrationData);
        break;
    }

    successMessage.value = "Votre inscription a ete soumise avec succes ! Un email de confirmation vous sera envoye apres validation.";
    authStore.stepData = {};
  } catch (err: any) {
    errorMessage.value = err || "Une erreur est survenue lors de l inscription. Veuillez reessayer.";
  }
};
</script>
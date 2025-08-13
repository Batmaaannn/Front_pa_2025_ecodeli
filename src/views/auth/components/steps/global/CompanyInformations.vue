<template>
  <div class="max-w-2xl w-full space-y-8">
    <div class="bg-white shadow-xl rounded-2xl p-8 space-y-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          Informations de l'entreprise
        </h2>
        <p class="text-gray-600 mb-6">
          Veuillez fournir les informations de votre entreprise.
        </p>
      </div>

      <form @submit.prevent="handleNext" class="space-y-6">
        <div class="space-y-4">
          <h3
            class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2"
          >
            Informations generales
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Nom de l'entreprise"
              v-model="form.companyName"
              name="company-name"
              :error="error.companyName"
              @blur="processCompanyName()"
            ></InputField>
            <InputField
              label="Numero SIRET"
              v-model="form.companySiret"
              name="company-siret"
              :error="error.companySiret"
              @blur="processCompanySiret()"
            ></InputField>
          </div>
        </div>

        <!-- Address Section -->
        <div class="space-y-4">
          <h3
            class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2"
          >
            Adresse
          </h3>
          <div class="space-y-4">
            <InputField
              label="Adresse"
              v-model="form.companyAddress"
              name="company-address"
              :error="error.companyAddress"
              @blur="processCompanyAddress()"
            ></InputField>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Code postal"
                v-model="form.companyPostalCode"
                name="company-postal-code"
                :error="error.companyPostalCode"
                @blur="processCompanyPostalCode()"
              ></InputField>
              <InputField
                label="Ville"
                v-model="form.companyCity"
                name="company-city"
                :error="error.companyCity"
                @blur="processCompanyCity()"
              ></InputField>
            </div>
          </div>
        </div>

        <StepperNavigationButtons
          :show-previous="navigation.canGoPrevious"
          :disable-next="formHasError"
          :loading="loading"
          submit-type="submit"
          @previous="navigation.goToPreviousStep"
          @next="handleNext"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import InputField from "@/components/formControls/InputField.vue";
import StepperNavigationButtons from "@/components/StepperNavigationButtons.vue";
import { useStepperNavigation } from "@/composables/useStepperNavigation";

const navigation = useStepperNavigation();

onMounted(() => {
  // Get saved data for current step
  const savedData = navigation.getCurrentStepData();
  if (savedData) {
    form.value.companyName = savedData.companyName || "";
    form.value.companySiret = savedData.companySiret || "";
    form.value.companyAddress = savedData.companyAddress || "";
    form.value.companyPostalCode = savedData.companyPostalCode || "";
    form.value.companyCity = savedData.companyCity || "";
  }
});

const form = ref({
  companyName: "",
  companySiret: "",
  companyAddress: "",
  companyPostalCode: "",
  companyCity: "",
});

const error = ref({
  companyName: "",
  companySiret: "",
  companyAddress: "",
  companyPostalCode: "",
  companyCity: "",
});

const loading = ref(false);

const formHasError = computed(() => {
  return !!(
    error.value.companyName ||
    error.value.companySiret ||
    error.value.companyAddress ||
    error.value.companyPostalCode ||
    error.value.companyCity ||
    !form.value.companyName ||
    !form.value.companySiret ||
    !form.value.companyAddress ||
    !form.value.companyPostalCode ||
    !form.value.companyCity
  );
});

function processCompanyName() {
  error.value.companyName = form.value.companyName ? "" : "Nom de l'entreprise requis";
}

function processCompanySiret() {
  if (!form.value.companySiret) {
    error.value.companySiret = "Numero SIRET requis";
  } else if (form.value.companySiret.length !== 14) {
    error.value.companySiret = "Le numero SIRET doit contenir 14 chiffres";
  } else {
    error.value.companySiret = "";
  }
}

function processCompanyAddress() {
  error.value.companyAddress = form.value.companyAddress ? "" : "Adresse requise";
}

function processCompanyPostalCode() {
  if (!form.value.companyPostalCode) {
    error.value.companyPostalCode = "Code postal requis";
  } else if (!/^\d{5}$/.test(form.value.companyPostalCode)) {
    error.value.companyPostalCode = "Code postal invalide";
  } else {
    error.value.companyPostalCode = "";
  }
}

function processCompanyCity() {
  error.value.companyCity = form.value.companyCity ? "" : "Ville requise";
}

const handleNext = async () => {
  try {
    loading.value = true;

    processCompanyName();
    processCompanySiret();
    processCompanyAddress();
    processCompanyPostalCode();
    processCompanyCity();

    if (formHasError.value) return;

    navigation.saveAndNext({
      companyName: form.value.companyName,
      companySiret: form.value.companySiret,
      companyAddress: form.value.companyAddress,
      companyPostalCode: form.value.companyPostalCode,
      companyCity: form.value.companyCity,
    });
  } catch (err) {
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
};
</script>
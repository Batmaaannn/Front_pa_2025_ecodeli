<template>
  <div class="max-w-2xl w-full space-y-8">
    <div class="bg-white shadow-xl rounded-2xl p-8 space-y-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          Informations du véhicule
        </h2>
        <p class="text-gray-600 mb-6">
          Veuillez fournir les informations du vehicule qui sera utilsé pour les
          livraisons.
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <InputField
              label="Numéro de permis de conduire"
              v-model="form.licenseNumber"
              name="licence-number"
              :error="error.licenseNumber"
              @blur="processLicenseNumber()"
            ></InputField>

            <div>
              <label
                for="vehicule-type"
                class="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Type de véhicule
              </label>
              <div class="mt-2 grid grid-cols-1">
                <select
                  id="vehicule-type"
                  v-model="form.vehiculeType"
                  class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-primary-500"
                  @change="processVehiculeType()"
                >
                  <option :value="VehiculeType.CAR">Voiture</option>
                  <option :value="VehiculeType.TRUCK">Camion</option>
                  <option :value="VehiculeType.VAN">Camionnette</option>
                </select>
                <ChevronDownIcon
                  class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                  aria-hidden="true"
                />
              </div>

              <p v-if="error.vehiculeType" class="mt-1 text-sm text-red-600">
                {{ error.vehiculeType }}
              </p>
            </div>
          </div>
        </div>

        <StepperNavigationButtons
          :show-previous="navigation.canGoPrevious"
          :disable-next="formHasError"
          :loading="loading"
          submit-type="button"
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
import { VehiculeType } from "@/types/delivery";
import * as Validators from "@/utils/validate";
import { ChevronDownIcon } from "@heroicons/vue/16/solid";

const navigation = useStepperNavigation();

onMounted(() => {
  const savedData = navigation.getCurrentStepData();

  if (savedData && savedData.licenseNumber !== undefined) {
    form.value.licenseNumber = savedData.licenseNumber || "";
  }
  if (savedData && savedData.vehiculeType !== undefined) {
    form.value.vehiculeType = savedData.vehiculeType || "";
  }
});

const loading = ref(false);

const form = ref({
  licenseNumber: "",
  vehiculeType: VehiculeType.CAR,
});

const error = ref({
  licenseNumber: "",
  vehiculeType: "",
});

const formHasError = computed(() => {
  const hasError = !!(
    error.value.licenseNumber ||
    error.value.vehiculeType ||
    !form.value.licenseNumber ||
    !form.value.vehiculeType
  );

  return hasError;
});

function processLicenseNumber() {
  error.value.licenseNumber = Validators.validateCarlicenseNumber(
    form.value.licenseNumber
  );
}

function processVehiculeType() {
  if (!form.value.vehiculeType) {
    error.value.vehiculeType = "Veuillez sélectionner un type de véhicule";
  } else {
    error.value.vehiculeType = "";
  }
}

const handleSubmit = async () => {
  await handleNext();
};

const handleNext = async () => {
  try {
    loading.value = true;
    processLicenseNumber();
    processVehiculeType();

    if (formHasError.value) return;

    navigation.saveAndNext({
      licenseNumber: form.value.licenseNumber,
      vehiculeType: form.value.vehiculeType,
    });
  } catch (err) {
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
};
</script>

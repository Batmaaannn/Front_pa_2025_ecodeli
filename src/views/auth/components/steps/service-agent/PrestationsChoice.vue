<template>
  <div class="max-w-2xl w-full space-y-8">
    <div class="bg-white shadow-xl rounded-2xl p-8 space-y-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          Prestations proposées
        </h2>
        <p class="text-gray-600 mb-6">
          Sélectionnez les services que vous souhaitez proposer et indiquez vos
          tarifs souhaités. EcoDeli se réserve le droit d'ajuster ces tarifs.
        </p>
      </div>

      <div v-if="isLoadingPrestations" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"
        ></div>
        <p class="text-gray-600 mt-4">Chargement des prestations...</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="prestation in prestationStore.prestations"
          :key="prestation.id"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-start space-x-4">
            <input
              :id="`prestation-${prestation.id}`"
              type="checkbox"
              :checked="isSelected(prestation.id)"
              @change="togglePrestation(prestation.id)"
              class="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />

            <div class="flex-1">
              <label
                :for="`prestation-${prestation.id}`"
                class="block font-medium text-gray-900 cursor-pointer"
              >
                {{ prestation.label }}
              </label>
              <p class="text-sm text-gray-600 mt-1">
                {{ prestation.description }}
              </p>
              <p class="text-sm text-orange-600 mt-1">
                Prix EcoDeli: {{ prestation.ecodeli_price }}€/{{
                  prestation.pricing_unit
                }}
              </p>
            </div>

            <div v-if="isSelected(prestation.id)" class="w-32">
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Votre tarif
              </label>
              <div class="flex">
                <input
                  v-model.number="
                    getSelectedPrestation(prestation.id)!.requestedPrice
                  "
                  type="number"
                  step="0.50"
                  min="1"
                  required
                  class="w-full px-2 py-1 text-sm border border-gray-300 rounded-l-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0.00"
                />
                <span
                  class="px-2 py-1 text-xs bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-600"
                >
                  €/{{ prestation.pricing_unit }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="form.selectedPrestations.length === 0"
        class="text-center py-8"
      >
        <p class="text-gray-500">
          Sélectionnez au moins une prestation pour continuer
        </p>
      </div>

      <StepperNavigationButtons
        :show-previous="navigation.canGoPrevious"
        :disable-next="formHasError"
        :loading="loading"
        submit-type="button"
        @previous="navigation.goToPreviousStep"
        @next="handleNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import StepperNavigationButtons from "@/components/StepperNavigationButtons.vue";
import { useStepperNavigation } from "@/composables/useStepperNavigation";
import { usePrestationStore } from "@/stores/prestation.store";

interface SelectedPrestation {
  prestationId: number;
  requestedPrice: number;
}

const navigation = useStepperNavigation();
const prestationStore = usePrestationStore();

onMounted(async () => {
  try {
    isLoadingPrestations.value = true;
    await prestationStore.getPrestations();
  } finally {
    isLoadingPrestations.value = false;
  }
  
  const savedData = navigation.getCurrentStepData();
  if (savedData && savedData.selectedPrestations) {
    form.value.selectedPrestations = savedData.selectedPrestations;
  }
});

const loading = ref(false);
const isLoadingPrestations = ref(false);

const form = ref<{
  selectedPrestations: SelectedPrestation[];
}>({
  selectedPrestations: [],
});

const formHasError = computed(() => {
  return (
    form.value.selectedPrestations.length === 0 ||
    form.value.selectedPrestations.some((p) => !p.requestedPrice || p.requestedPrice <= 0)
  );
});

const availablePrestations = computed(() => {
  return prestationStore.prestations || [];
});

const isSelected = (prestationId: number): boolean => {
  return form.value.selectedPrestations.some(
    (p: SelectedPrestation) => p.prestationId === prestationId
  );
};

const getSelectedPrestation = (prestationId: number): SelectedPrestation | undefined => {
  return form.value.selectedPrestations.find(
    (p: SelectedPrestation) => p.prestationId === prestationId
  );
};

const togglePrestation = (prestationId: number) => {
  const index = form.value.selectedPrestations.findIndex(
    (p: SelectedPrestation) => p.prestationId === prestationId
  );

  if (index > -1) {
    form.value.selectedPrestations.splice(index, 1);
  } else {
    const prestation = availablePrestations.value.find(
      (p: any) => p.id === prestationId
    );
    if (prestation) {
      form.value.selectedPrestations.push({
        prestationId,
        requestedPrice: prestation.ecodeli_price,
      });
    }
  }
};

const handleNext = async () => {
  try {
    loading.value = true;

    if (formHasError.value) return;
    navigation.saveAndNext({
      selectedPrestations: form.value.selectedPrestations,
    });
  } catch (err) {
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
};
</script>

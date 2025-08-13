import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

export function useStepperNavigation() {
  const router = useRouter();
  const authStore = useAuthStore();

  const goToNextStep = () => {
    authStore.goToNextStep(router);
  };

  const goToPreviousStep = () => {
    authStore.goToPreviousStep(router);
  };

  const saveStepData = (data: any) => {
    if (authStore.currentStep) {
      authStore.setStepData(authStore.currentStep.name, data);
    }
  };

  const saveAndNext = (data: any) => {
    saveStepData(data);
    goToNextStep();
  };

  const getStepData = (stepName?: string) => {
    const name = stepName || authStore.currentStep?.name;
    return name ? authStore.getStepData(name) : {};
  };

  const getCurrentStepData = () => {
    return authStore.currentStep ? authStore.getStepData(authStore.currentStep.name) : {};
  };

  const isLastStep = computed(() => !authStore.canGoNext);
  const nextButtonText = computed(() => isLastStep.value ? 'Confirmer' : 'Suivant');

  return {
    goToNextStep,
    goToPreviousStep,
    saveStepData,
    saveAndNext,
    getStepData,
    getCurrentStepData,
    canGoNext: authStore.canGoNext,
    canGoPrevious: authStore.canGoPrevious,
    currentStep: authStore.currentStep,
    isLastStep,
    nextButtonText,
  };
}
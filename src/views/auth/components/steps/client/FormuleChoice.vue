<template>
  <div class="w-full max-w-2xl space-y-8">
    <!-- Success Message -->
    <div v-if="successMessage" class="bg-green-50 p-4 rounded-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-green-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
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
          <svg
            class="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
        </div>
      </div>
    </div>

    <div v-if="!successMessage">
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Formule d'abonnement
      </label>
      <div class="space-y-3">
        <div
          v-for="plan in subscriptionPlans"
          :key="plan.value"
          @click="selectPlan(plan.value)"
          :class="[
            'p-4 border-2 rounded-lg cursor-pointer transition-all duration-200',
            formData.subscriptionPlan === plan.value
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 hover:border-gray-300',
          ]"
        >
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-semibold text-gray-900">{{ plan.name }}</h3>
              <p class="text-sm text-gray-600">{{ plan.description }}</p>
            </div>
            <div class="text-right">
              <div class="font-bold text-gray-900">{{ plan.price }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Validation error message -->
      <p v-if="error" class="mt-2 text-sm text-red-600">
        {{ error }}
      </p>
    </div>

    <!-- Navigation buttons -->
    <StepperNavigationButtons
      v-if="!successMessage"
      :show-previous="navigation.canGoPrevious"
      :disable-next="!formData.subscriptionPlan"
      :loading="loading"
      :next-text="navigation.nextButtonText.value"
      @previous="navigation.goToPreviousStep"
      @next="handleNext"
    />

    <!-- After success, show login button -->
    <div v-if="successMessage" class="flex justify-center">
      <Button @click="goToLogin" isGreen> Se connecter </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStepperNavigation } from "@/composables/useStepperNavigation";
import { useAuthStore } from "@/stores/auth.store";
import StepperNavigationButtons from "@/components/StepperNavigationButtons.vue";
import Button from "@/components/formControls/Button.vue";
import { SubscriptionPlan } from "@/types/subscription-plan";

const navigation = useStepperNavigation();
const authStore = useAuthStore();
const router = useRouter();

const subscriptionPlans = ref([
  {
    value: SubscriptionPlan.FREE,
    name: "Gratuit",
    price: "0€/mois",
    description: "Fonctionnalités de base",
  },
  {
    value: SubscriptionPlan.STARTER,
    name: "Starter",
    price: "9,90€/mois",
    description: "Assurance jusqu'à 115€, 5% de réduction",
  },
  {
    value: SubscriptionPlan.PREMIUM,
    name: "Premium",
    price: "19,99€/mois",
    description: "Assurance jusqu'à 3000€, 9% de réduction",
  },
]);

const formData = ref({
  subscriptionPlan: SubscriptionPlan.FREE,
});

const error = ref("");
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const selectPlan = (planValue: SubscriptionPlan) => {
  formData.value.subscriptionPlan = planValue;
  error.value = "";
};

const validateSelection = () => {
  if (!formData.value.subscriptionPlan) {
    error.value = "Veuillez sélectionner une formule";
    return false;
  }
  return true;
};

onMounted(() => {
  const savedData = navigation.getCurrentStepData();
  if (savedData && savedData.subscriptionPlan) {
    formData.value.subscriptionPlan = savedData.subscriptionPlan;
  }
});

const goToLogin = () => {
  router.push("/connexion");
};

const handleNext = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    if (!validateSelection()) {
      loading.value = false;
      return;
    }

    navigation.saveStepData({
      subscription_plan: formData.value.subscriptionPlan,
    });

    await submitRegistration();
  } catch (err) {
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
};

const submitRegistration = async () => {
  try {
    const allStepData = authStore.stepData;

    const registrationData = {
      // Update to use the new unique step name
      firstName: allStepData["Client - Informations Personnelles"]?.firstName,
      lastName: allStepData["Client - Informations Personnelles"]?.lastName,
      email: allStepData["Client - Informations Personnelles"]?.email,
      phoneNumber: allStepData["Client - Informations Personnelles"]?.phoneNumber,
      password: allStepData["Client - Informations Personnelles"]?.password,
      subscriptionPlan: formData.value.subscriptionPlan,
    };

    await authStore.registerClient(registrationData);

    successMessage.value =
      "Votre inscription a été réalisée avec succès ! Vous pouvez maintenant vous connecter.";

    authStore.stepData = {};
  } catch (err: any) {
    errorMessage.value =
      err ||
      "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
  }
};
</script>

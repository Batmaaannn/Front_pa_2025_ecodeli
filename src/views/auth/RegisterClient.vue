<template>
  <div class="relative isolate overflow-hidden min-h-screen flex flex-col">
    <svg
      class="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_bottom_left,white,transparent)] stroke-gray-200"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
          width="200"
          height="200"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
        <path
          d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
          stroke-width="0"
        />
      </svg>
      <rect
        width="100%"
        height="100%"
        stroke-width="0"
        fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
      />
    </svg>
    <div
      class="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <Stepper
        :steps="authStore.stepperSteps"
        :current-step-index="authStore.currentStepIndex"
        @step-click="handleStepClick"
      />

      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>

      <div class="mt-8 flex justify-between">
        <Button
          @click="authStore.goToPreviousStep(router)"
          :disabled="!authStore.canGoPrevious"
          isGreen
        >
          Précédent
        </Button>
        <Button
          @click="handleNextStep"
          :disabled="!authStore.canGoNext"
          isGreen
        >
          Suivant
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import InputField from "@/components/formControls/InputField.vue";
import Button from "@/components/formControls/Button.vue";
import { useAuthStore } from "@/stores/auth.store";
import { passwordStrengthCheck } from "@/libs/password";
import * as Validators from "@/utils/validate";
import Alert from "@/components/formControls/Alert.vue";
import Stepper from "@/components/Stepper.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const handleStepClick = (step: any, index: number) => {
  if (index < authStore.currentStepIndex) {
    if (step.pathName) {
      router.push(step.pathName);
    }
    authStore.currentStepIndex = index;
    authStore.updateStepStatuses();
  }
};

onMounted(() => {
  // Initialize stepper with steps
  authStore.initializeStepper([
    {
      name: "Informations Personnelles",
      pathName: "/inscription/client",
    },
    {
      name: "Choix de la Formule",
      pathName: "/inscription/client/formule",
    },
  ]);

  // Set the current step based on current route
  authStore.updateCurrentStepByRoute(route.path);
});

// Update current step when route changes
watch(
  () => route.path,
  (newPath) => {
    if (newPath) {
      authStore.updateCurrentStepByRoute(newPath);
    }
  }
);

// Save step data before moving to next step
const handleNextStep = () => {
  // Save current step data
  const currentStep = authStore.currentStep;
  if (currentStep) {
    // Example: Save form data from current step
    const formData = {
      /* your form data */
    };
    authStore.setStepData(currentStep.name, formData);
  }
  authStore.goToNextStep(router);
};

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  passwordStrength: "",
  passwordConfirmation: "",
});

const error = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: [] as string[],
  passwordConfirmation: "",
});
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const formClientHasError = computed(() => {
  return !!(
    error.value.phone ||
    error.value.email ||
    error.value.password.length > 0 ||
    error.value.passwordConfirmation ||
    error.value.firstName ||
    error.value.lastName ||
    !form.value.phone ||
    !form.value.email ||
    !form.value.password ||
    !form.value.passwordConfirmation ||
    !form.value.lastName ||
    !form.value.firstName
  );
});

const passwordStrengthColor = computed(() => {
  const strength = form.value.passwordStrength.toLowerCase();
  if (strength.includes("très faible") || strength.includes("faible"))
    return "text-red-600";
  if (strength.includes("moyen")) return "text-yellow-600";
  if (strength.includes("fort") || strength.includes("très fort"))
    return "text-green-600";
  return "text-gray-600";
});

const passwordStrengthBarColor = computed(() => {
  const strength = form.value.passwordStrength.toLowerCase();
  if (strength.includes("très faible")) return "bg-red-300";
  if (strength.includes("faible")) return "bg-red-500";
  if (strength.includes("moyen")) return "bg-yellow-500";
  if (strength.includes("fort")) return "bg-green-500";
  if (strength.includes("très fort")) return "bg-green-600";
  return "bg-gray-300";
});

const passwordStrengthPercentage = computed(() => {
  const strength = form.value.passwordStrength.toLowerCase();
  if (strength.includes("très faible")) return "20%";
  if (strength.includes("faible")) return "40%";
  if (strength.includes("moyen")) return "60%";
  if (strength.includes("fort")) return "80%";
  if (strength.includes("très fort")) return "100%";
  return "0%";
});

function setStrength(strength: string) {
  form.value.passwordStrength = strength;
}
function validatePassword(): string[] {
  if (!error.value.password) return ["Mot de passe obligatoire"];
  const { errors, strength } = passwordStrengthCheck(form.value.password);
  setStrength(strength);
  if (errors.length > 0) return errors;
  return [];
}
function processPassword() {
  error.value.password = validatePassword();
}
function processPasswordConfirmation() {
  error.value.passwordConfirmation = Validators.validatePasswordConfirmation(
    form.value.passwordConfirmation,
    form.value.password
  );
}
function processEmail() {
  error.value.email = Validators.validateEmail(form.value.email);
}
function processPhoneNumber() {
  error.value.phone = Validators.validatePhoneNumber(form.value.phone);
}
function processFirstName() {
  error.value.firstName = Validators.validateFirstName(form.value.firstName);
}
function processLastName() {
  error.value.lastName = Validators.validateLastName(form.value.lastName);
}

async function submitRegistrationClient() {
  try {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    if (formClientHasError.value) return;

    await authStore.registerClient({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phoneNumber: form.value.phone,
      password: form.value.password,
    });
    successMessage.value =
      "L'inscription a été validée avec succès. Vous pouvez vous maintenant vous connecter.";
  } catch (error: any) {
    errorMessage.value = error;
  } finally {
    loading.value = false;
  }
}
</script>

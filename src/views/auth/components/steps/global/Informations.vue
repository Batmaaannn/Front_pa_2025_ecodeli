<template>
  <div class="max-w-2xl w-full space-y-8">
    <div class="bg-white shadow-xl rounded-2xl p-8 space-y-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          Informations personnelles
        </h2>
        <p class="text-gray-600 mb-6">
          Veuillez fournir vos informations personnelles pour continuer
          l'inscription.
        </p>
      </div>

      <form @submit.prevent="handleNext" class="space-y-6">
        <div class="space-y-4">
          <h3
            class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2"
          >
            Identite
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Prenom"
              v-model="form.firstName"
              name="first-name"
              autoCompleteName="given-name"
              :error="error.firstName"
              @blur="processFirstName()"
            ></InputField>
            <InputField
              label="Nom de famille"
              v-model="form.lastName"
              name="last-name"
              autoCompleteName="family-name"
              :error="error.lastName"
              @blur="processLastName()"
            ></InputField>
          </div>
        </div>

        <!-- Contact Information Section -->
        <div class="space-y-4">
          <h3
            class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2"
          >
            Contact
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Email"
              v-model="form.email"
              name="email"
              autoCompleteName="email"
              @blur="processEmail()"
              :error="error.email"
            ></InputField>
            <InputField
              label="Numero de telephone"
              v-model="form.phone"
              name="phone"
              autoCompleteName="phone"
              @blur="processPhoneNumber()"
              :error="error.phone"
            ></InputField>
          </div>
        </div>
        <!-- Password Section -->
        <div class="space-y-4">
          <h3
            class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2"
          >
            Securite
          </h3>
          <div class="space-y-4">
            <div>
              <InputField
                type="password"
                label="Mot de passe"
                v-model="form.password"
                name="password"
                @blur="processPassword()"
              ></InputField>
              <span v-if="form.passwordStrength"
                >Force du mot de passe : {{ form.passwordStrength }}</span
              >
              <div v-if="error.password.length > 0" class="mt-2 space-y-1">
                <p
                  v-for="passwordError in error.password"
                  :key="passwordError"
                  class="text-sm text-red-600 flex items-center"
                >
                  {{ passwordError }}
                </p>
              </div>
            </div>

            <InputField
              type="password"
              label="Confirmation de mot de passe"
              v-model="form.passwordConfirmation"
              name="password-confirmation"
              :error="error.passwordConfirmation"
              @blur="processPasswordConfirmation()"
            ></InputField>
          </div>
        </div>

        <StepperNavigationButtons
          :show-previous="navigation.canGoPrevious"
          :disable-next="formClientHasError"
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
import { ref, computed } from "vue";
import InputField from "@/components/formControls/InputField.vue";
import StepperNavigationButtons from "@/components/StepperNavigationButtons.vue";
import { useStepperNavigation } from "@/composables/useStepperNavigation";
import { passwordStrengthCheck } from "@/libs/password";
import * as Validators from "@/utils/validate";
import { onMounted } from "vue";

const navigation = useStepperNavigation();

onMounted(() => {
    // Get saved data for current step
    const savedData = navigation.getCurrentStepData();
    if (savedData) {
        form.value.firstName = savedData.firstName || "";
        form.value.lastName = savedData.lastName || "";
        form.value.email = savedData.email || "";
        form.value.phone = savedData.phoneNumber || "";
        form.value.password = savedData.password || "";
        form.value.passwordConfirmation = savedData.passwordConfirmation || "";
    }
});

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

const handleNext = async () => {
  try {
    loading.value = true;

    if (formClientHasError.value) return;

    navigation.saveAndNext({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phoneNumber: form.value.phone,
      password: form.value.password,
      passwordConfirmation: form.value.passwordConfirmation,
    });
  } catch (err) {
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
};
</script>

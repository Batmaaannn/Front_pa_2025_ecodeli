<template>
  <div class="mx-auto max-w-7xl py-40 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div v-if="!!successMessage">
        <Alert isSuccess>{{ successMessage }}</Alert>
      </div>
      <div v-else>
        <div>
          <h2 class="text-l font-semibold">Informations personnelles</h2>
          <p class="mb-4">
            Veuillez fournir vos informations personnelles pour continuer
            l'inscription.
          </p>
        </div>

        <form @submit.prevent="submitRegistrationClient" class="lg:flex-auto">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <InputField
                label="Prénom"
                v-model="form.firstName"
                name="first-name"
                autoCompleteName="given-name"
                :error="error.firstName"
                @blur="processFirstName()"
              ></InputField>
            </div>
            <div class="flex-1">
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
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <InputField
                label="Email"
                v-model="form.email"
                name="email"
                autoCompleteName="email"
                @blur="processEmail()"
                :error="error.email"
              ></InputField>
            </div>
            <div class="flex-1">
              <InputField
                label="Numéro de téléphone"
                v-model="form.phone"
                name="phone"
                autoCompleteName="phone"
                @blur="processPhoneNumber()"
                :error="error.phone"
              ></InputField>
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="flex-1">
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
              <div v-if="error.password.length > 0">
                <p
                  v-for="passwordError in error.password"
                  :key="passwordError"
                  class="error"
                >
                  {{ passwordError }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="flex-1">
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
          <div class="flex col-span-full justify-between gap-4 py-4">
            <Button type="submit" isGreen :disabled="formClientHasError"
              >Valider l'inscription</Button
            >
          </div>
          <div v-if="!!errorMessage" class="py-4">
            <Alert isError>{{ errorMessage }}</Alert>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import InputField from "@/components/formControls/InputField.vue";
import Button from "@/components/formControls/Button.vue";
import { useAuthStore } from "@/stores/auth.store";
import { passwordStrengthCheck } from "@/libs/password";
import * as Validators from "@/utils/validate";
import Alert from "@/components/formControls/Alert.vue";

const authStore = useAuthStore();

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
  error.value.phone = Validators.validateEmail(form.value.email);
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

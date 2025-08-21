<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full space-y-8">
      <div v-if="!!successMessage" class="text-center">
        <Alert isSuccess>{{ successMessage }}</Alert>
      </div>
      <div v-else class="bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <!-- Header Section -->
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-bold text-gray-900">Créer votre compte</h1>
          <p class="text-gray-600">
            Rejoignez Ecodeli et commencez votre parcours écologique
          </p>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Informations personnelles</h2>
          <p class="text-gray-600 mb-6">
            Veuillez fournir vos informations personnelles pour continuer l'inscription.
          </p>
        </div>

        <form @submit.prevent="submitRegistrationClient" class="space-y-6">
          <!-- Personal Information Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Identité</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Prénom"
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
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Contact</h3>
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
                label="Numéro de téléphone"
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
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Sécurité</h3>
            <div class="space-y-4">
              <div>
                <InputField
                  type="password"
                  label="Mot de passe"
                  v-model="form.password"
                  name="password"
                  @blur="processPassword()"
                ></InputField>
                
                <!-- Password Strength Indicator -->
                <div v-if="form.password" class="mt-2">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm text-gray-600">Force du mot de passe</span>
                    <span class="text-sm font-medium" :class="passwordStrengthColor">{{ form.passwordStrength }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="h-2 rounded-full transition-all duration-300" :class="passwordStrengthBarColor" :style="{ width: passwordStrengthPercentage }"></div>
                  </div>
                </div>
                
                <!-- Password Errors -->
                <div v-if="error.password.length > 0" class="mt-2 space-y-1">
                  <p
                    v-for="passwordError in error.password"
                    :key="passwordError"
                    class="text-sm text-red-600 flex items-center"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
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
          <!-- Submit Section -->
          <div class="pt-6 border-t border-gray-200">
            <Button 
              type="submit" 
              isGreen 
              :disabled="formClientHasError"
              :loading="loading"
              class="w-full py-3 text-base font-semibold"
            >
              Créer mon compte
            </Button>
            
            <div v-if="!!errorMessage" class="mt-4">
              <Alert isError>{{ errorMessage }}</Alert>
            </div>
            
            <p class="mt-4 text-center text-sm text-gray-600">
              Déjà un compte ? 
              <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
                Se connecter
              </router-link>
            </p>
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

const passwordStrengthColor = computed(() => {
  const strength = form.value.passwordStrength.toLowerCase();
  if (strength.includes('très faible') || strength.includes('faible')) return 'text-red-600';
  if (strength.includes('moyen')) return 'text-yellow-600';
  if (strength.includes('fort') || strength.includes('très fort')) return 'text-green-600';
  return 'text-gray-600';
});

const passwordStrengthBarColor = computed(() => {
  const strength = form.value.passwordStrength.toLowerCase();
  if (strength.includes('très faible')) return 'bg-red-300';
  if (strength.includes('faible')) return 'bg-red-500';
  if (strength.includes('moyen')) return 'bg-yellow-500';
  if (strength.includes('fort')) return 'bg-green-500';
  if (strength.includes('très fort')) return 'bg-green-600';
  return 'bg-gray-300';
});

const passwordStrengthPercentage = computed(() => {
  const strength = form.value.passwordStrength.toLowerCase();
  if (strength.includes('très faible')) return '20%';
  if (strength.includes('faible')) return '40%';
  if (strength.includes('moyen')) return '60%';
  if (strength.includes('fort')) return '80%';
  if (strength.includes('très fort')) return '100%';
  return '0%';
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

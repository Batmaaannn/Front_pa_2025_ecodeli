<template>
  <div v-if="!!successMessage">
    <Alert isSuccess>{{ successMessage }}</Alert>
  </div>
  <div v-else>
    <div class="max-w-2xl">
      <h2 class="text-l font-semibold">Informations personnelles</h2>
      <p class="mb-4">
        Veuillez fournir vos informations personnelles pour continuer
        l'inscription.
      </p>
    </div>
    <div v-if="authStore.register.userType !== 'client'">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <InputField
            label="Nom de l'entreprise"
            v-model="form.companyName"
            name="company-name"
            :error="error.companyName"
            @blur="processCompanyName()"
          ></InputField>
        </div>
        <div class="flex-1">
          <InputField
            label="Siret"
            v-model="form.siret"
            name="siret"
            :error="error.siret"
            @blur="processSiret()"
          ></InputField>
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <InputField
            label="Adresse de l'entreprise"
            v-model="form.companyAddress"
            name="company-address"
            :error="error.companyAddress"
          ></InputField>
        </div>
        <div class="flex-1">
          <InputField
            label="Ville"
            v-model="form.companyCity"
            name="siret"
            :error="error.companyCity"
          ></InputField>
        </div>
        <div class="flex-1">
          <InputField
            label="Code postal"
            v-model="form.compagnyPostalCode"
            name="siret"
            :error="error.compagnyPostalCode"
          ></InputField>
        </div>
      </div>
    </div>

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
      <Button isGreen @click="goToPreviousStep">Précédent</Button>
      <Button
        v-if="authStore.register.userType === 'client'"
        isGreen
        :disabled="formClientHasError"
        @click="submitRegistrationClient"
        >Valider l'inscription</Button
      >
      <Button v-else isGreen :disabled="formHasError" @click="goToNextStep"
        >Suivant</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import InputField from "@/components/formControls/InputField.vue";
import Button from "@/components/formControls/Button.vue";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import { passwordStrengthCheck } from "@/libs/password";
import * as Validators from "@/utils/validate";
import { RegisterSteps } from "@/types/auth";
import Alert from "@/components/formControls/Alert.vue";

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  password: "",
  phone: "",
  passwordStrength: "",
  passwordConfirmation: "",
  siret: "",
  Companyname: "",
  companyCity: "",
  compagnyPostalCode: "",
  companyAddress: "",
});

const error = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: [] as string[],
  passwordConfirmation: "",
  companyName: "",
  siret: "",
  companyCity: "",
  compagnyPostalCode: "",
  companyAddress: "",
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
function processCompanyName() {
  error.value.companyName = Validators.validateCompanyName(
    form.value.companyName
  );
}
function processSiret() {
  error.value.siret = Validators.validateSiret(form.value.siret);
}
// function processCompanyCity() {
//   error.value.companyCity = Validators.validateCompanyCity(
//     form.value.companyCity
//   );
// }
// function processCompagnyPostalCode() {
//   error.value.compagnyPostalCode = Validators.validateCompagnyPostalCode(
//     form.value.compagnyPostalCode
//   );
// }

function goToNextStep() {
  authStore.setUserProfessionnalInformations({
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    email: form.value.email,
    phone: form.value.phone,
    password: form.value.password,
    companyName: form.value.companyName,
    siret: form.value.siret,
    companyAddress: form.value.companyAddress,
    companyCity: form.value.companyCity,
    compagnyPostalCode: form.value.compagnyPostalCode,
  });

  authStore.nextStep();

  router.push({ name: "Documents" });
}

function goToPreviousStep() {
  authStore.previousStep();

  switch (authStore.currentRegisterStep) {
    case RegisterSteps.PRESTATIONS:
      router.push({ name: "Prestations" });
      break;
    case RegisterSteps.PROFIL:
      router.push({ name: "UserInformations" });
      break;
    default:
      router.push({ name: "UserInformations" });
      break;
  }
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
    authStore.resetRegister();
  } catch (error: any) {
    errorMessage.value = error;
  } finally {
    loading.value = false;
  }
}
</script>

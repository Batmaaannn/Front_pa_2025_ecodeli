<template>
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
        autoCompleteName="password"
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
        autoCompleteName="password-confirmation"
        :error="error.passwordConfirmation"
        @blur="processPasswordConfirmation()"
      ></InputField>
    </div>
  </div>

  <div class="flex col-span-full justify-between gap-4 py-4">
    <Button
      v-if="authStore.register.userType === 'client'"
      isBlue
      :disabled="formHasError"
      @click="submitRegistrationClient"
      >Valider l'inscription</Button
    >
    <Button v-else isBlue :disabled="formHasError" @click="goToNextStep"
      >Suivant</Button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import InputField from "@/components/formControls/InputField.vue";
import Button from "@/components/formControls/Button.vue";
import { useAuthStore } from "@/stores/auth.store"; // Assumes your Pinia store is here
import { useRouter } from "vue-router";
import { passwordStrengthCheck } from "@/libs/password";
import * as Validators from "@/utils/validate";

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
const errorMessage = ref(false);

const formHasError = computed(() => {
  return true;
  //   if (!selected.value) return true;
  //   return !prospectOptions.some((option) => option.value === selected.value);
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
  //   authStore.setUserTypeRegister({
  //     userType: selected.value,
  //   });

  authStore.nextStep();

  router.push({ name: "Informations" });
}

async function submitRegistrationClient() {
  try {
    loading.value = true;
    errorMessage.value = false;
    if (formHasError) return;

    await authStore.registerClient({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phoneNumber: form.value.phone,
      password: form.value.password,
    });
    authStore.resetAppointment();
  } catch (error) {
    errorMessage.value = true;
  } finally {
    loading.value = false;
  }
}
</script>

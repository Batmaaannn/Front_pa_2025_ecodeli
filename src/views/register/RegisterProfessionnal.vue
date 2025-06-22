<template>
  <div class="mx-auto max-w-7xl py-40 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div v-if="!!successMessage">
        <Alert isSuccess>{{ successMessage }}</Alert>
      </div>
      <div v-else>
        <!-- User profile -->
        <div class="max-w-2xl">
          <h2 class="text-l font-semibold">Quel est votre type de profil ?</h2>
          <p class="mb-4">
            Sélectionnez le type de profil qui correspond le mieux à votre
            activité.
          </p>
        </div>
        <div class="grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1">
          <RadioButtonWithIcon
            v-for="option in prospectOptions"
            :key="option.value"
            v-model="selected"
            :option="option"
          />
        </div>
        <Alert
          v-if="selected === 'service_agent' || selected === 'delivery_agent'"
          isWarning
          >L'inscription n'est pas automatique, nous étudierons avec le plus
          grand soin votre demande.</Alert
        >
        <!-- Prestations profile -->
        <div v-if="selected === 'service_agent'" class="max-w-3xl mt-8">
          <h2 class="text-l font-semibold">
            Quels services à la personne proposés vous ?
          </h2>
          <p class="my-2">
            Sélectionnez le(s) service(s) que vous proposez. Vous pouvez en
            choisir plusieurs. Ainsi que les prix auxquels vous souhaitez les
            appliquer.
          </p>
          <small
            >Chez Ecodeli les prix sont souvent fixes, mais nous vous
            contacterons pour en discuter.</small
          >

          <PrestationChoose
            v-if="prestations.length > 0"
            v-model="selectedPrestations"
            :prestations="prestations"
            @update:prestationPrice="handlePrice"
          />
        </div>

        <!-- Documents -->
        <h2 class="text-l font-semibold">Transmettez-nous vos documents</h2>
        <p class="mb-4">
          (KBIS, livreurs : permis de conduire, carte grise, assurance)
        </p>

        <DropUploadFile
          subtitle="Cliquez ou déposez le fichier ici"
          @upload="setFile"
          @delete="removeFile"
          :files="files"
        />
        <div>
          <h2 class="text-l font-semibold">Informations personnelles</h2>
          <p class="mb-4">
            Veuillez fournir vos informations personnelles pour continuer
            l'inscription.
          </p>
        </div>

        <form @submit.prevent="submitRegistrationProfessionnal" class="lg:flex-auto">
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
import { ref, computed, onBeforeMount } from "vue";
import InputField from "@/components/formControls/InputField.vue";
import Button from "@/components/formControls/Button.vue";
import { useAuthStore } from "@/stores/auth.store";
import { passwordStrengthCheck } from "@/libs/password";
import * as Validators from "@/utils/validate";
import Alert from "@/components/formControls/Alert.vue";
import RadioButtonWithIcon from "@/components/formControls/RadioButtonWithIcon.vue";
import { UserIcon, TruckIcon } from "@heroicons/vue/24/outline";
import PrestationChoose from "@/components/prestations/PrestationChoose.vue";
import { Prestation, PrestationIdWithPrice } from "@/types/prestation";
import { usePrestationStore } from "@/stores/prestation.store";
import DropUploadFile from "@/components/formControls/DropUploadFile.vue";

const prestations = ref<Prestation[]>([]);

onBeforeMount(async () => {
  prestations.value = (await prestationStore.getPrestations()) ?? [];
});

const authStore = useAuthStore();
const prestationStore = usePrestationStore();

const selectedPrestations = ref<number[]>([]);
const prices = ref<PrestationIdWithPrice[]>([]);

const handlePrice = ({ id, value }: { id: number; value: number }) => {
  const index = prices.value.findIndex((item) => item.prestation === id);
  if (index !== -1) {
    prices.value[index].price = value;
  } else {
    prices.value.push({ prestation: id, price: value });
  }
};

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
const selected = ref("");
const prospectOptions = [
  { value: "service_agent", label: "Prestataire de service", icon: TruckIcon },
  { value: "delivery_agent", label: "Livreur", icon: UserIcon },
  { value: "merchant", label: "Entreprise", icon: TruckIcon },
];

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

const errorUploadPrescription = ref("");
const errorPrescriptionDetail = ref(true);
const files = ref<File[]>([]);
const prescriptionDetails = ref({});

function setFile(file: File) {
  errorUploadPrescription.value = "";

  if (file.size / 1024 / 1024 > 4) {
    errorUploadPrescription.value =
      "Le fichier est trop volumineux. Maximum 4Mo.";
    return;
  }

  files.value.push(file);
}

function removeFile(fileName: string) {
  files.value = files.value.filter((file) => file.name !== fileName);
}

async function submitRegistrationProfessionnal() {
  try {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    if (formClientHasError.value) return;

    await authStore.RegisterProfessionnal({
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

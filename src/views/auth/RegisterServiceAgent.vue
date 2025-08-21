<template>
  <div
    class="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4"
  >
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            🔧
          </div>
          <h1 class="text-3xl font-bold text-gray-900">
            Inscription Prestataire
          </h1>
          <p class="text-gray-600 mt-2">
            Proposez vos services sur la plateforme EcoDeli
          </p>
        </div>

        <!-- Progress Steps -->
        <div class="mb-8">
          <div class="flex items-center">
            <div
              v-for="(step, index) in steps"
              :key="index"
              :class="[
                'flex items-center',
                index < steps.length - 1 ? 'flex-1' : '',
              ]"
            >
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  currentStep >= index + 1
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600',
                ]"
              >
                {{ index + 1 }}
              </div>
              <div class="ml-2 text-sm font-medium text-gray-900">
                {{ step }}
              </div>
              <div
                v-if="index < steps.length - 1"
                :class="[
                  'flex-1 h-0.5 mx-4',
                  currentStep > index + 1 ? 'bg-orange-500' : 'bg-gray-200',
                ]"
              ></div>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Étape 1: Informations personnelles -->
          <div v-if="currentStep === 1" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Informations personnelles
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  v-model="formData.password"
                  type="password"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Mot de passe sécurisé"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Présentez-vous en quelques mots
              </label>
              <textarea
                v-model="formData.bio"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Décrivez votre expérience, vos compétences..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Distance maximale d'intervention (km)
              </label>
              <input
                v-model.number="formData.max_distance_km"
                type="number"
                min="1"
                max="100"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: 25"
              />
            </div>
          </div>

          <!-- Étape 2: Sélection des prestations -->
          <div v-if="currentStep === 2" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Prestations proposées
            </h2>
            <p class="text-gray-600 mb-6">
              Sélectionnez les services que vous souhaitez proposer et indiquez
              vos tarifs souhaités. EcoDeli se réserve le droit d'ajuster ces
              tarifs.
            </p>

            <div v-if="isLoadingPrestations" class="text-center py-12">
              <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"
              ></div>
              <p class="text-gray-600 mt-4">Chargement des prestations...</p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="prestation in availablePrestations"
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
              v-if="formData.selectedPrestations.length === 0"
              class="text-center py-8"
            >
              <p class="text-gray-500">
                Sélectionnez au moins une prestation pour continuer
              </p>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            class="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="currentStep--"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
            >
              Précédent
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < steps.length"
              type="button"
              @click="nextStep"
              :disabled="!canGoNext"
              :class="[
                'px-6 py-2 rounded-lg font-medium transition duration-200',
                canGoNext
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed',
              ]"
            >
              Suivant
            </button>

            <button
              v-else
              type="submit"
              :disabled="isLoading || !canSubmit"
              :class="[
                'px-6 py-2 rounded-lg font-medium transition duration-200',
                canSubmit && !isLoading
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed',
              ]"
            >
              <span v-if="!isLoading">Créer mon compte</span>
              <span v-else>Création en cours...</span>
            </button>
          </div>
        </form>

        <!-- Info Notice -->
        <div class="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p class="text-sm text-amber-800">
            ⚠️ <strong>Important :</strong> Votre compte sera activé après
            validation de votre profil et négociation des tarifs par notre
            équipe (24-48h).
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { usePrestationStore } from "@/stores/prestation";
import type {
  ServiceProviderRegisterData,
  Prestation,
} from "@/types/auth.types";

const router = useRouter();
const authStore = useAuthStore();
const prestationStore = usePrestationStore();

const currentStep = ref(1);
const isLoading = ref(false);
const isLoadingPrestations = ref(false);
const error = ref("");

const steps = ["Informations personnelles", "Prestations"];

const formData = reactive<ServiceProviderRegisterData>({
  email: "",
  password: "",
  confirmPassword: "",
  bio: "",
  max_distance_km: 10,
  certifications: "",
  selectedPrestations: [],
});

const availablePrestations = ref<Prestation[]>([]);

const canGoNext = computed(() => {
  if (currentStep.value === 1) {
    return (
      formData.email &&
      formData.password &&
      formData.bio &&
      formData.max_distance_km > 0
    );
  }
  return true;
});

const canSubmit = computed(() => {
  return (
    formData.selectedPrestations.length > 0 &&
    formData.selectedPrestations.every((p) => p.requestedPrice > 0)
  );
});

const isSelected = (prestationId: number): boolean => {
  return formData.selectedPrestations.some(
    (p) => p.prestationId === prestationId
  );
};

const getSelectedPrestation = (prestationId: number) => {
  return formData.selectedPrestations.find(
    (p) => p.prestationId === prestationId
  );
};

const togglePrestation = (prestationId: number) => {
  const index = formData.selectedPrestations.findIndex(
    (p) => p.prestationId === prestationId
  );

  if (index > -1) {
    formData.selectedPrestations.splice(index, 1);
  } else {
    const prestation = availablePrestations.value.find(
      (p) => p.id === prestationId
    );
    if (prestation) {
      formData.selectedPrestations.push({
        prestationId,
        requestedPrice: prestation.ecodeli_price, // Prix par défaut
      });
    }
  }
};

const nextStep = () => {
  if (canGoNext.value && currentStep.value < steps.length) {
    currentStep.value++;

    // Charger les prestations quand on arrive à l'étape 2
    if (currentStep.value === 2 && availablePrestations.value.length === 0) {
      loadPrestations();
    }
  }
};

const loadPrestations = async () => {
  isLoadingPrestations.value = true;
  try {
    availablePrestations.value =
      await prestationStore.fetchAvailablePrestations();
  } catch (err) {
    error.value = "Erreur lors du chargement des prestations";
  } finally {
    isLoadingPrestations.value = false;
  }
};

const validateForm = (): boolean => {
  if (formData.password !== formData.confirmPassword) {
    error.value = "Les mots de passe ne correspondent pas";
    return false;
  }

  if (formData.selectedPrestations.length === 0) {
    error.value = "Veuillez sélectionner au moins une prestation";
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  error.value = "";

  if (!validateForm()) return;

  isLoading.value = true;

  try {
    await authStore.registerServiceProvider(formData);

    // Redirection vers page d'attente de validation
    router.push("/waiting-validation");
  } catch (err: any) {
    error.value =
      err.message || "Une erreur est survenue lors de l'inscription";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  // Pré-charger les prestations si nécessaire
  if (currentStep.value === 2) {
    loadPrestations();
  }
});
</script>

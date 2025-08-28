<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white">
        <div class="px-4 py-5 sm:px-6">
          <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Modifier mon profil
          </h1>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Gérez vos informations personnelles et professionnelles
          </p>
        </div>

        <form @submit.prevent="updateProfile" class="px-4 py-5 sm:p-6">
          <!-- Basic User Information -->
          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputField
                name="firstName"
                label="Prénom"
                v-model="formData.firstName"
                :error="formErrors.firstName"
              />
              <InputField
                name="lastName"
                label="Nom"
                v-model="formData.lastName"
                :error="formErrors.lastName"
              />
              <InputField
                name="email"
                label="Email"
                v-model="formData.email"
                type="email"
              />
              <InputField
                name="phoneNumber"
                label="Téléphone"
                v-model="formData.phoneNumber"
                type="tel"
                :error="formErrors.phoneNumber"
              />
            </div>

            <div class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900">
                Informations professionnelles
              </h3>
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputField
                  name="siret"
                  label="SIRET"
                  v-model="formData.siret"
                  disabled
                />
                <InputField
                  name="companyName"
                  label="Nom de l'entreprise"
                  v-model="formData.companyName"
                  disabled
                />
                <InputField
                  name="companyAddress"
                  label="Adresse de l'entreprise"
                  v-model="formData.companyAddress"
                  :error="formErrors.companyAddress"
                />
                <InputField
                  name="companyCity"
                  label="Ville de l'entreprise"
                  v-model="formData.companyCity"
                  :error="formErrors.companyCity"
                />
              </div>

              <div class="space-y-6">
                <!-- Vehicle type and license -->
                <h3 class="text-lg font-medium text-gray-900">
                  Informations véhicule
                </h3>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      for="vehicle-type"
                      class="block text-sm font-semibold leading-6 text-gray-700"
                    >
                      Type de véhicule
                    </label>
                    <div class="mt-3 grid grid-cols-1">
                      <select
                        id="vehicleType"
                        v-model="formData.vehiculeType"
                        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-600 sm:text-sm/6"
                      >
                        <option value="">Sélectionner un type</option>
                        <option value="CAR">Voiture</option>
                        <option value="VAN">Camionette</option>
                        <option value="TRUCK">Camion</option>
                      </select>
                      <ChevronDownIcon
                        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <InputField
                    name="licenseNumber"
                    label="Numéro de permis"
                    v-model="formData.licenseNumber"
                    disabled
                  />
                </div>
              </div>

              <!-- Delivery Agent specific fields -->
              <div v-if="userStore.isDeliveryAgent" class="mt-6 space-y-6">
                <h3 class="text-lg font-medium text-gray-900">
                  Zone de livraison
                </h3>

                <!-- Sector and perimeter -->
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <InputField
                    name="sectorCity"
                    label="Ville du secteur d'origine"
                    v-model="formData.favoriteDeliveryCity"
                    placeholder="Ex: Paris, Lyon, Marseille"
                    :error="formErrors.favoriteDeliveryCity"
                  />
                  <div>
                    <label
                      for="perimeter"
                      class="block text-sm font-semibold leading-6 text-gray-700"
                    >
                      Rayon autour de la ville (km)
                    </label>
                    <div class="mt-3 grid grid-cols-1">
                      <select
                        id="perimeter"
                        v-model="formData.maxRadiusKm"
                        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-600 sm:text-sm/6"
                      >
                        <option value="">Sélectionner un rayon</option>
                        <option value="5">5 km</option>
                        <option value="10">10 km</option>
                        <option value="15">15 km</option>
                        <option value="20">20 km</option>
                        <option value="30">30 km</option>
                        <option value="50">50 km</option>
                      </select>
                      <ChevronDownIcon
                        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        aria-hidden="true"
                      />
                      {{ formData.maxRadiusKm }}
                      <p class="mt-1 text-xs">
                        Ce rayon correspond à une zone de prise en charge de
                        colis autour de la ville d'origine.
                      </p>
                    </div>
                    <p
                      v-if="formErrors.maxRadiusKm"
                      class="mt-2 text-sm text-red-600"
                    >
                      {{ formErrors.maxRadiusKm }}
                    </p>
                  </div>
                </div>

                <!-- Working Schedule -->
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-base font-medium text-gray-900">
                      Horaires de travail
                    </h4>
                    <button
                      type="button"
                      @click="duplicateSchedule"
                      class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <DocumentDuplicateIcon class="h-4 w-4 mr-1.5" />
                      Dupliquer horaires
                    </button>
                  </div>

                  <div class="space-y-4">
                    <div
                      v-for="day in weekDays"
                      :key="day.value"
                      class="border rounded-lg p-4"
                    >
                      <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center">
                          <input
                            :id="`work-${day.value}`"
                            v-model="formData.schedule[day.value].isWorking"
                            type="checkbox"
                            class="size-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                          />
                          <label
                            :for="`work-${day.value}`"
                            class="ml-3 font-medium text-gray-900"
                          >
                            {{ day.label }}
                          </label>
                        </div>
                        <button
                          v-if="selectedDayForDuplication === day.value"
                          type="button"
                          @click="applyDuplicatedSchedule(day.value)"
                          class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Appliquer à tous
                        </button>
                      </div>

                      <div
                        v-if="formData.schedule[day.value].isWorking"
                        class="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <!-- Morning slot -->
                        <div class="space-y-2">
                          <div class="flex items-center">
                            <input
                              :id="`morning-${day.value}`"
                              v-model="
                                formData.schedule[day.value].morning.isActive
                              "
                              type="checkbox"
                              class="size-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                            />
                            <label
                              :for="`morning-${day.value}`"
                              class="ml-2 text-sm font-medium text-gray-700"
                            >
                              Matin
                            </label>
                          </div>
                          <div
                            v-if="formData.schedule[day.value].morning.isActive"
                            class="flex items-center space-x-2"
                          >
                            <input
                              type="time"
                              v-model="
                                formData.schedule[day.value].morning.start
                              "
                              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                              placeholder="Début"
                            />
                            <span class="text-gray-500">-</span>
                            <input
                              type="time"
                              v-model="formData.schedule[day.value].morning.end"
                              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                              placeholder="Fin"
                            />
                          </div>
                        </div>

                        <!-- Afternoon slot -->
                        <div class="space-y-2">
                          <div class="flex items-center">
                            <input
                              :id="`afternoon-${day.value}`"
                              v-model="
                                formData.schedule[day.value].afternoon.isActive
                              "
                              type="checkbox"
                              class="size-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                            />
                            <label
                              :for="`afternoon-${day.value}`"
                              class="ml-2 text-sm font-medium text-gray-700"
                            >
                              Après-midi
                            </label>
                          </div>
                          <div
                            v-if="
                              formData.schedule[day.value].afternoon.isActive
                            "
                            class="flex items-center space-x-2"
                          >
                            <input
                              type="time"
                              v-model="
                                formData.schedule[day.value].afternoon.start
                              "
                              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                              placeholder="Début"
                            />
                            <span class="text-gray-500">-</span>
                            <input
                              type="time"
                              v-model="
                                formData.schedule[day.value].afternoon.end
                              "
                              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                              placeholder="Fin"
                            />
                          </div>
                        </div>
                      </div>

                      <p
                        v-if="!formData.schedule[day.value].isWorking"
                        class="text-sm text-gray-500 italic"
                      >
                        Jour non travaillé
                      </p>
                    </div>
                  </div>

                  <p
                    v-if="formErrors.schedule"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ formErrors.schedule }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Action buttons -->
            <div
              class="flex justify-end space-x-3 pt-6 border-t border-gray-200"
            >
              <button
                type="button"
                @click="resetForm"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {{ loading ? "Enregistrement..." : "Enregistrer" }}
              </button>
            </div>
          </div>
        </form>
      </div>
      {{ formData.schedule }}
      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="mt-4">
        <div class="rounded-md bg-green-50 p-4">
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
              <p class="text-sm font-medium text-green-800">
                {{ successMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="mt-4">
        <div class="rounded-md bg-red-50 p-4">
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
              <p class="text-sm font-medium text-red-800">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user.store";
import { isDeliveryAgentUser } from "@/types/typeGuards";
import InputField from "@/components/formControls/InputField.vue";
import {
  ChevronDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/vue/16/solid";

const userStore = useUserStore();

onBeforeMount(() => {
  if (!userStore.user) {
    userStore.fetchUser();
  }
  loadUserData();
});

interface TimeSlot {
  isActive: boolean;
  start: string;
  end: string;
}

interface DaySchedule {
  isWorking: boolean;
  morning: TimeSlot;
  afternoon: TimeSlot;
}

type Schedule = Record<string, DaySchedule>;

const weekDays = [
  { value: "monday", label: "Lundi" },
  { value: "tuesday", label: "Mardi" },
  { value: "wednesday", label: "Mercredi" },
  { value: "thursday", label: "Jeudi" },
  { value: "friday", label: "Vendredi" },
  { value: "saturday", label: "Samedi" },
  { value: "sunday", label: "Dimanche" },
];

const createDefaultTimeSlot = (): TimeSlot => ({
  isActive: false,
  start: "",
  end: "",
});

const createDefaultDaySchedule = (): DaySchedule => ({
  isWorking: false,
  morning: createDefaultTimeSlot(),
  afternoon: createDefaultTimeSlot(),
});

const createDefaultSchedule = (): Schedule => {
  const schedule: Schedule = {};
  weekDays.forEach((day) => {
    schedule[day.value] = createDefaultDaySchedule();
  });
  return schedule;
};

const formData = ref({
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  siret: "",
  licenseNumber: "",
  companyName: "",
  companyAddress: "",
  companyCity: "",
  vehiculeType: "",
  favoriteDeliveryCity: "",
  maxRadiusKm: "",
  schedule: createDefaultSchedule(),
});

const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const selectedDayForDuplication = ref<string | null>(null);

const formErrors = ref({
  firstName: "",
  lastName: "",
  phoneNumber: "",
  companyAddress: "",
  companyCity: "",
  favoriteDeliveryCity: "",
  maxRadiusKm: "",
  schedule: "",
});

const duplicateSchedule = () => {
  // Find the first working day with a schedule
  const workingDay = weekDays.find(
    (day) =>
      formData.value.schedule[day.value].isWorking &&
      (formData.value.schedule[day.value].morning.isActive ||
        formData.value.schedule[day.value].afternoon.isActive)
  );

  if (workingDay) {
    selectedDayForDuplication.value = workingDay.value;
  } else {
    errorMessage.value =
      "Veuillez d'abord configurer au moins un jour de travail";
    setTimeout(() => (errorMessage.value = ""), 3000);
  }
};

const applyDuplicatedSchedule = (sourceDay: string) => {
  const sourceSchedule = formData.value.schedule[sourceDay];

  weekDays.forEach((day) => {
    if (day.value !== sourceDay) {
      formData.value.schedule[day.value] = {
        isWorking: sourceSchedule.isWorking,
        morning: {
          isActive: sourceSchedule.morning.isActive,
          start: sourceSchedule.morning.start,
          end: sourceSchedule.morning.end,
        },
        afternoon: {
          isActive: sourceSchedule.afternoon.isActive,
          start: sourceSchedule.afternoon.start,
          end: sourceSchedule.afternoon.end,
        },
      };
    }
  });

  selectedDayForDuplication.value = null;
  successMessage.value = "Horaires dupliqués avec succès";
  setTimeout(() => (successMessage.value = ""), 3000);
};

const loadUserData = () => {
  const user = userStore.user;

  formData.value.email = user.email;
  if (!isDeliveryAgentUser(user)) return;

  const deliveryAgent = user.delivery_agent;
  formData.value.firstName = deliveryAgent.first_name;
  formData.value.lastName = deliveryAgent.last_name;
  formData.value.phoneNumber = deliveryAgent.phone_number;
  formData.value.companyAddress = deliveryAgent.company_address;
  formData.value.companyCity = deliveryAgent.company_city || "";
  formData.value.vehiculeType = deliveryAgent.vehicle_type;
  formData.value.siret = deliveryAgent.siret || "";
  formData.value.licenseNumber = deliveryAgent.license_number || "";
  formData.value.companyName = deliveryAgent.company_name || "";

  // Load delivery zone data if available (with type safety)
  formData.value.favoriteDeliveryCity =
    (deliveryAgent as any).favorite_delivery_city || "";
  formData.value.maxRadiusKm = (deliveryAgent as any).max_radius_km || "";

  // Load schedule if available
  if ((deliveryAgent as any).schedule) {
    formData.value.schedule = (deliveryAgent as any).schedule;
  } else {
    // Set default schedule (e.g., Monday-Friday 9-12, 14-18)
    ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach((day) => {
      formData.value.schedule[day] = {
        isWorking: true,
        morning: { isActive: true, start: "09:00", end: "12:00" },
        afternoon: { isActive: true, start: "14:00", end: "18:00" },
      };
    });
  }
};

const validateForm = () => {
  const errors = {
    first_name: "",
    last_name: "",
    phone_number: "",
    siret: "",
    company_name: "",
    company_address: "",
    company_city: "",
    license_number: "",
    sector_city: "",
    perimeter_radius: "",
    schedule: "",
  };

  // Validate schedule - at least one working day with time slots
  const hasWorkingDay = Object.values(formData.value.schedule).some(
    (day) => day.isWorking
  );
  if (!hasWorkingDay) {
    errors.schedule = "Veuillez sélectionner au moins un jour de travail";
  }

  // Validate time slots for working days
  Object.entries(formData.value.schedule).forEach(([dayName, day]) => {
    if (day.isWorking) {
      if (!day.morning.isActive && !day.afternoon.isActive) {
        errors.schedule = `Veuillez sélectionner au moins un créneau pour ${dayName}`;
      }
      if (day.morning.isActive && (!day.morning.start || !day.morning.end)) {
        errors.schedule = `Veuillez renseigner les horaires du matin pour ${dayName}`;
      }
      if (
        day.afternoon.isActive &&
        (!day.afternoon.start || !day.afternoon.end)
      ) {
        errors.schedule = `Veuillez renseigner les horaires de l'après-midi pour ${dayName}`;
      }
    }
  });

  return Object.values(errors).every((error) => !error);
};

const updateProfile = async () => {
  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {

    await userStore.updateDeliveryAgentProfile(formData.value);
    await userStore.fetchUser();

    successMessage.value = "Profil mis à jour avec succès";
  } catch (e: any) {
    errorMessage.value =
      e.message || "Une erreur est survenue lors de la mise à jour";
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  loadUserData();
  successMessage.value = "";
  errorMessage.value = "";
  formErrors.value = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    companyAddress: "",
    companyCity: "",
    favoriteDeliveryCity: "",
    maxRadiusKm: "",
    schedule: "",
  };
};
</script>

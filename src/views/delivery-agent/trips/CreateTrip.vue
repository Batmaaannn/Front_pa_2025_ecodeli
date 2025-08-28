<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-6">Gestion des trajets</h1>

    <div class="bg-white rounded-lg shadow">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8 px-6" aria-label="Tabs">
          <button
            @click="activeTab = 'future'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'future'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            ]"
          >
            Mes trajets futurs et passés
          </button>
          <button
            @click="activeTab = 'create'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'create'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            ]"
          >
            Ajouter un trajet
          </button>
        </nav>
      </div>

      <div class="p-6">
        <!-- Future trips tab -->
        <div v-if="activeTab === 'future'" class="space-y-4">
          <div
            v-if="deliveryStore.trips.length === 0"
            class="text-center py-8 text-gray-500"
          >
            Aucun trajet futur enregistré
          </div>
          <div v-else class="grid gap-4">
            <div
              v-for="trip in deliveryStore.trips"
              :key="trip.id"
              class="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex justify-between items-start">
                <div class="space-y-2">
                  <div class="flex items-center space-x-2">
                    <svg
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span class="font-medium"
                      >{{ trip.departure_city }} → {{ trip.arrival_city }}</span
                    >
                    <span
                      :class="[
                        'px-2 py-1 text-xs font-medium rounded-full',
                        trip.is_available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      ]"
                    >
                      {{ trip.is_available ? 'À venir' : 'Passé' }}
                    </span>
                  </div>
                  <div
                    class="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span
                      >{{ formatDate(trip.departure_date) }} -
                      {{ formatDate(trip.arrival_date) }}</span
                    >
                  </div>
                  <div
                    class="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      ></path>
                    </svg>
                    <span>{{ trip.max_packages }} colis maximum</span>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click="deleteTrip(trip.id)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Create trip tab -->
        <div v-if="activeTab === 'create'" class="max-w-2xl mx-auto">
          <form @submit.prevent="submitTrip" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="departure_city"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ville de départ *
                </label>
                <input
                  id="departure_city"
                  v-model="form.departureCity"
                  type="text"
                  required
                  placeholder="Ex: Paris"
                  class="form-input"
                />
              </div>
              <div>
                <label
                  for="arrival_city"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ville d'arrivée *
                </label>
                <input
                  id="arrival_city"
                  v-model="form.arrivalCity"
                  type="text"
                  required
                  placeholder="Ex: Lyon"
                  class="form-input"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="departure_date"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date de départ *
                </label>
                <input
                  id="departure_date"
                  v-model="form.departureDate"
                  type="date"
                  required
                  :min="minDate"
                  class="form-input"
                />
              </div>
              <div>
                <label
                  for="arrival_date"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date d'arrivée *
                </label>
                <input
                  id="arrival_date"
                  v-model="form.arrivalDate"
                  type="date"
                  required
                  :min="minDate"
                  class="form-input"
                />
              </div>
            </div>

            <div>
              <label
                for="max_packages"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre maximum de colis *
              </label>
              <input
                id="max_packages"
                v-model.number="form.maxPackages"
                type="number"
                min="1"
                required
                placeholder="Ex: 10"
                class="form-input"
              />
              <p class="mt-1 text-sm text-gray-500">
                Indiquez le nombre maximum de colis que vous pouvez transporter
              </p>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="resetForm"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{
                  isSubmitting ? "Enregistrement..." : "Enregistrer le trajet"
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeliveryStore } from "@/stores/delivery.store";
import { ref, computed, onMounted } from "vue";

const deliveryStore = useDeliveryStore();

onMounted(async () => {
  await deliveryStore.fetchFutureTrips();
});

const activeTab = ref<"future" | "create">("future");
const isSubmitting = ref(false);

const form = ref({
  departureCity: "",
  arrivalCity: "",
  departureDate: new Date(),
  arrivalDate: new Date(),
  maxPackages: 1,
});

const minDate = computed(() => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().split("T")[0];
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const submitTrip = async () => {
  isSubmitting.value = true;
  try {
    await deliveryStore.createRoute(form.value);
    resetForm();
    await deliveryStore.fetchFutureTrips();
    activeTab.value = "future";
  } catch (error) {
    alert("Erreur lors de l'enregistrement du trajet");
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};

const deleteTrip = async (id: number) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce trajet ?")) {
    try {
      await deliveryStore.deleteRoute(id);

      await deliveryStore.fetchFutureTrips();
    } catch (error) {
      alert("Erreur lors de la suppression du trajet");
      console.error(error);
    }
  }
};

const resetForm = () => {
  form.value = {
    departureCity: "",
    arrivalCity: "",
    departureDate: new Date(),
    arrivalDate: new Date(),
    maxPackages: 1,
  };
};
</script>

<style scoped>
.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition: all 0.15s;
}
.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>

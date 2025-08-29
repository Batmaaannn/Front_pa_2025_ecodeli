<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Livraisons futures</h1>
        <p class="mt-2 text-sm text-gray-700">
          Liste de toutes vos livraisons programmées
        </p>
      </div>
    </div>

    <div class="mt-8 flow-root">
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-primary-600"
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Chargement...
        </div>
      </div>

      <div v-else-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
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
            <h3 class="text-sm font-medium text-red-800">
              Erreur de chargement
            </h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="announcementStore.futureDeliveries.length === 0"
        class="text-center py-12"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          Aucune livraison future
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Vous n'avez aucune livraison programmée pour le moment.
        </p>
      </div>

      <div v-else class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Titre
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Trajet
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date de collecte
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date de livraison
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Prix
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Statut
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Options
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="delivery in announcementStore.futureDeliveries"
                  :key="delivery.id"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ delivery.title }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="flex items-center">
                      <span>{{ delivery.departure_city }}</span>
                      <svg
                        class="mx-2 h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                      <span>{{ delivery.arrival_city }}</span>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ formatDate(delivery.pickup_date) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ formatDate(delivery.delivery_date) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ formatPrice(delivery.price) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      :class="getStatusClass(delivery.status)"
                      class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                    >
                      {{ getStatusLabel(delivery.status) }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="flex space-x-2">
                      <span
                        v-if="delivery.urgent"
                        class="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800"
                      >
                        Urgent
                      </span>
                      <span
                        v-if="delivery.assurance"
                        class="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800"
                      >
                        Assuré
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Announcement } from "@/types/announcement";
import { AnnouncementStatus } from "@/types/announcement";
import { useAnnouncementStore } from "@/stores/announcement.store";
import { formatDate } from "@/utils/date";

const announcementStore = useAnnouncementStore();

const loading = ref(true);
const error = ref<string | null>(null);

onMounted(() => {
  loading.value = true;
  announcementStore.fetchFutureDeliveries();
  loading.value = false;
});

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};

const getStatusClass = (status: AnnouncementStatus): string => {
  const statusClasses = {
    [AnnouncementStatus.POSTED]: "bg-gray-100 text-gray-800",
    [AnnouncementStatus.MATCHED]: "bg-yellow-100 text-yellow-800",
    [AnnouncementStatus.IN_PROGRESS]: "bg-blue-100 text-blue-800",
    [AnnouncementStatus.DELIVERED]: "bg-green-100 text-green-800",
    [AnnouncementStatus.CANCELLED]: "bg-red-100 text-red-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

const getStatusLabel = (status: AnnouncementStatus): string => {
  const statusLabels = {
    [AnnouncementStatus.POSTED]: "Publié",
    [AnnouncementStatus.MATCHED]: "Attribué",
    [AnnouncementStatus.IN_PROGRESS]: "En cours",
    [AnnouncementStatus.DELIVERED]: "Livré",
    [AnnouncementStatus.CANCELLED]: "Annulé",
  };
  return statusLabels[status] || status;
};

const viewDetails = (delivery: Announcement) => {
  console.log("View details for delivery:", delivery);
};
</script>

<template>
  <div class="px-6 max-w-[1400px] mx-auto md:px-4">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p class="text-base text-gray-600">Gérez vos livraisons et annonces</p>
    </div>

    <!-- Stats -->
    <div class="mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div
          class="flex items-center p-6 bg-white border border-gray-200 rounded-xl transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div
            class="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mr-4"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2
                   2 0 110 4M5 8v10a2 2 0 002
                   2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
          <div>
            <span class="text-2xl font-bold text-gray-900 block">{{
              stats.totalDeliveries
            }}</span>
            <span class="text-sm text-gray-600">Livraisons totales</span>
          </div>
        </div>

        <div
          class="flex items-center p-6 bg-white border border-gray-200 rounded-xl transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div
            class="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600 mr-4"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0
                   11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <span class="text-2xl font-bold text-gray-900 block">{{
              stats.pendingDeliveries
            }}</span>
            <span class="text-sm text-gray-600">En attente</span>
          </div>
        </div>

        <div
          class="flex items-center p-6 bg-white border border-gray-200 rounded-xl transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div
            class="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600 mr-4"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0
                   11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <span class="text-2xl font-bold text-gray-900 block">{{
              stats.completedDeliveries
            }}</span>
            <span class="text-sm text-gray-600">Complétées</span>
          </div>
        </div>

        <div
          class="flex items-center p-6 bg-white border border-gray-200 rounded-xl transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div
            class="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 mr-4"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5.882V19.24a1.76 1.76 0
                   01-3.417.592l-2.147-6.15M18 13a3 3
                   0 100-6M5.436 13.683A4.001 4.001 0
                   017 6h1.832c4.1 0 7.625-1.234
                   9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988
                   3.988 0 01-1.564-.317z"
              />
            </svg>
          </div>
          <div>
            <span class="text-2xl font-bold text-gray-900 block">{{
              stats.totalAnnouncements
            }}</span>
            <span class="text-sm text-gray-600">Annonces</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Accès rapides</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          class="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary-500"
          @click="createNewAnnouncement"
        >
          <svg
            class="w-8 h-8 mb-3 text-primary-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414
                 a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span class="text-sm font-medium text-gray-700"
            >Nouvelle annonce</span
          >
        </button>

        <button
          class="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary-500"
          @click="viewHistory"
        >
          <svg
            class="w-8 h-8 mb-3 text-primary-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0
                 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-sm font-medium text-gray-700">Historique</span>
        </button>
      </div>
    </div>

    <!-- Active Deliveries -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">
        Livraisons actives
      </h2>

      <div v-if="activeDeliveries.length > 0" class="flex flex-col gap-4">
        <div
          v-for="delivery in activeDeliveries"
          :key="delivery.id"
          class="flex flex-col md:flex-row md:items-center p-5 bg-white border border-gray-200 rounded-xl transition hover:shadow-md"
        >
          <!-- Status -->
          <div
            class="flex md:flex-col justify-between md:justify-start items-center md:items-center md:mr-6 mb-4 md:mb-0 min-w-[100px]"
          >
            <span
              class="px-3 py-1 rounded-full text-xs font-semibold uppercase mb-2 md:mb-2"
              :class="{
                'bg-orange-100 text-orange-700': delivery.status === 'pending',
                'bg-blue-100 text-blue-800': delivery.status === 'in-transit',
                'bg-primary-100 text-primary-800':
                  delivery.status === 'delivered',
              }"
            >
              {{ getStatusLabel(delivery.status) }}
            </span>
            <span class="text-sm text-gray-600 font-medium">{{
              delivery.estimatedTime
            }}</span>
          </div>

          <!-- Infos -->
          <div class="flex-1">
            <h3 class="text-base font-semibold text-gray-900 mb-1">
              Livraison #{{ delivery.id }}
            </h3>
            <p class="text-sm text-gray-600 mb-3">{{ delivery.address }}</p>

            <div class="flex items-center gap-3">
              <div
                class="flex-1 h-2 bg-gray-200 rounded max-w-[200px] overflow-hidden"
              >
                <div
                  class="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded transition-all duration-300"
                  :style="{ width: delivery.progress + '%' }"
                ></div>
              </div>
              <span class="text-xs font-semibold text-primary-600"
                >{{ delivery.progress }}%</span
              >
            </div>
          </div>

          <!-- Button -->
          <button
            class="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium mt-4 md:mt-0 md:ml-4 hover:bg-primary-600 transition"
            @click="trackDelivery(delivery.id)"
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
                d="M17.657 16.657L13.414 20.9a1.998
                   1.998 0 01-2.827 0l-4.244-4.243a8 8 0
                   1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0
                   11-6 0 3 3 0 016 0z"
              />
            </svg>
            Suivre
          </button>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center p-12 bg-gray-50 rounded-xl text-gray-400"
      >
        <svg
          class="w-12 h-12 mb-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2
               2 0 00-2 2v7m16 0v5a2 2 0
               01-2 2H6a2 2 0 01-2-2v-5m16
               0h-2.586a1 1 0 00-.707.293l-2.414
               2.414a1 1 0 01-.707.293h-3.172a1
               1 0 01-.707-.293l-2.414-2.414A1
               1 0 006.586 13H4"
          />
        </svg>
        <p>Aucune livraison active</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Delivery {
  id: string;
  status: "pending" | "in-transit" | "delivered";
  address: string;
  estimatedTime: string;
  progress: number;
}

interface Stats {
  totalDeliveries: number;
  pendingDeliveries: number;
  completedDeliveries: number;
  totalAnnouncements: number;
}

const activeDeliveries = ref<Delivery[]>([
  {
    id: "12345",
    status: "in-transit",
    address: "123 Rue Example, Paris 75001",
    estimatedTime: "14:30",
    progress: 65,
  },
  {
    id: "12346",
    status: "pending",
    address: "456 Avenue Test, Lyon 69001",
    estimatedTime: "16:00",
    progress: 25,
  },
]);

const stats = ref<Stats>({
  totalDeliveries: 156,
  pendingDeliveries: 8,
  completedDeliveries: 148,
  totalAnnouncements: 24,
});

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: "En attente",
    "in-transit": "En cours",
    delivered: "Livrée",
  };
  return labels[status] || status;
};

const createNewAnnouncement = () => {
  console.log("Creating new announcement...");
};

const scheduleDelivery = () => {
  console.log("Scheduling delivery...");
};

const viewHistory = () => {
  console.log("Viewing history...");
};

const trackDelivery = (deliveryId: string) => {
  console.log("Tracking delivery:", deliveryId);
};
</script>

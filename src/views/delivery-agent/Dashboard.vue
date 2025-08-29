<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard Livreur</h1>
      <p class="text-gray-600 mt-1">
        Gérez vos livraisons et suivez vos performances
      </p>
    </div>

    <!-- Stats Cards -->
    <div
      v-if="!!stats"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Livraisons actives</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats.activeDeliveries }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">
              Livraisons terminées
            </p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats.completedDeliveries }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Note moyenne</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats.averageRating.toFixed(1) }}/5
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Revenus du mois</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats.monthlyEarnings }}€
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          @click="$router.push('/mon-espace-livreur/livraisons')"
          class="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
        >
          <div class="text-center">
            <svg
              class="w-8 h-8 text-gray-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <p class="text-sm font-medium text-gray-900">Nouvelles demandes</p>
          </div>
        </button>
        <button
          @click="$router.push('/mon-espace-livreur/trajet')"
          class="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
        >
          <div class="text-center">
            <svg
              class="w-8 h-8 text-gray-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              ></path>
            </svg>
            <p class="text-sm font-medium text-gray-900">Créer un trajet</p>
          </div>
        </button>
        <button
          @click="
            $router.push('/mon-espace-livreur/mon-historique-de-livraison')
          "
          class="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
        >
          <div class="text-center">
            <svg
              class="w-8 h-8 text-gray-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            <p class="text-sm font-medium text-gray-900">Historique</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Active Deliveries Table -->
    <div class="bg-white rounded-lg shadow mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Livraisons en cours</h2>
      </div>

      <div v-if="isLoading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
        ></div>
      </div>

      <div
        v-else-if="deliveryStore.deliveries.length === 0"
        class="text-center py-12"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          ></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Aucune livraison active
        </h3>
        <p class="text-gray-500">Vos livraisons en cours apparaîtront ici</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Code de suivi
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trajet
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Statut
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date limite
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Colis
              </th>
              <th class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="delivery in deliveryStore.deliveries"
              :key="delivery.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ delivery.tracking_code }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ delivery.announcement?.departure_city }} →
                  {{
                    delivery.delivery_type === "partial" &&
                    delivery.intermediate_city
                      ? delivery.intermediate_city
                      : delivery.announcement?.arrival_city
                  }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    delivery.delivery_type === 'full'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800',
                  ]"
                >
                  {{
                    delivery.delivery_type === "full" ? "Complète" : "Partielle"
                  }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getStatusBadgeClass(delivery.status),
                  ]"
                >
                  {{ getStatusLabel(delivery.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(delivery.announcement?.delivery_date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span class="text-sm text-gray-900 font-medium">
                  {{ delivery.packages?.length || 0 }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex space-x-2">
                  <button
                    @click="viewDeliveryDetails(delivery.id)"
                    class="text-primary-600 hover:text-primary-900 cursor-pointer"
                  >
                    Détails
                  </button>
                  <button
                    v-if="canUpdateStatus(delivery.status)"
                    @click="updateDeliveryStatus(delivery)"
                    class="text-green-600 hover:text-green-900"
                  >
                    {{ getNextStatusAction(delivery.status) }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Performance Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Reviews -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          Évaluations récentes
        </h2>
        <div
          v-if="recentReviews.length === 0"
          class="text-center py-8 text-gray-500"
        >
          <svg
            class="mx-auto h-8 w-8 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <p class="text-sm">Aucune évaluation récente</p>
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="review in recentReviews"
            :key="review.id"
            class="border-l-4 border-yellow-400 pl-4"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    :class="[
                      'h-4 w-4',
                      star <= review.score
                        ? 'text-yellow-400'
                        : 'text-gray-300',
                    ]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                </div>
                <span class="ml-2 text-sm font-medium"
                  >{{ review.score }}/5</span
                >
              </div>
              <span class="text-xs text-gray-500">{{
                formatDate(review.created_at)
              }}</span>
            </div>
            <p v-if="review.comment" class="text-sm text-gray-600 mt-1">
              {{ review.comment }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDeliveryStore } from "@/stores/delivery.store";
import { DeliveryStatus } from "@/types/delivery";

interface ActiveDeliveries {
  activeDeliveries: number;
  completedDeliveries: number;
  averageRating: number;
  monthlyEarnings: number;
}

const router = useRouter();
const deliveryStore = useDeliveryStore();

const isLoading = ref(false);
let stats = ref<ActiveDeliveries | null>(null);
let recentReviews = ref<any[]>([]);

const getStatusLabel = (status: DeliveryStatus): string => {
  const labels = {
    [DeliveryStatus.ASSIGNED]: "Assignée",
    [DeliveryStatus.PICKED_UP]: "Ramassée",
    [DeliveryStatus.IN_TRANSIT]: "En transit",
    [DeliveryStatus.DELIVERED]: "Livrée",
    [DeliveryStatus.PENDING]: "En attente",
  };
  return labels[status] || status;
};

const getStatusBadgeClass = (status: DeliveryStatus): string => {
  const classes = {
    [DeliveryStatus.ASSIGNED]: "bg-yellow-100 text-yellow-800",
    [DeliveryStatus.PICKED_UP]: "bg-blue-100 text-blue-800",
    [DeliveryStatus.IN_TRANSIT]: "bg-indigo-100 text-indigo-800",
    [DeliveryStatus.DELIVERED]: "bg-green-100 text-green-800",
    [DeliveryStatus.PENDING]: "bg-gray-100 text-gray-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getNextStatusAction = (status: DeliveryStatus): string => {
  switch (status) {
    case DeliveryStatus.ASSIGNED:
      return "A récupérer";
    case DeliveryStatus.PICKED_UP:
      return "Récupéré";
    case DeliveryStatus.IN_TRANSIT:
      return "En transit";
    case DeliveryStatus.DELIVERED:
      return "Livré";
    default:
      return "Mettre à jour";
  }
};

const canUpdateStatus = (status: DeliveryStatus): boolean => {
  return (
    status !== DeliveryStatus.DELIVERED && status !== DeliveryStatus.PENDING
  );
};

const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "Non définie";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const viewDeliveryDetails = (deliveryId: number) => {
  router.push(`/mon-espace-livreur/livraison/${deliveryId}`);
};

const updateDeliveryStatus = async (delivery: any) => {
  try {
    // TODO: Implement status update logic
    console.log("Updating delivery status:", delivery);
    await fetchDashboardData();
  } catch (error) {
    console.error("Error updating delivery status:", error);
  }
};

const fetchDashboardData = async () => {
  isLoading.value = true;
  try {
    stats.value = await deliveryStore.fetchStat();
    recentReviews.value = await deliveryStore.fetchRecentReviews();
    await deliveryStore.fetchActiveDeliveries();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>

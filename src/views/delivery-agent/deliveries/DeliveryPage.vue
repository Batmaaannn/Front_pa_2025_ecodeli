<template>
  <div class="container mx-auto px-4 py-6">
    <div v-if="isLoading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
      ></div>
    </div>

    <div v-else-if="!deliveryStore.delivery" class="text-center py-12">
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
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Livraison introuvable
      </h3>
      <p class="text-gray-500 mb-4">
        La livraison demandée n'existe pas ou a été supprimée.
      </p>
      <button
        @click="$router.back()"
        class="text-primary-600 hover:text-primary-800 font-medium"
      >
        ← Retour
      </button>
    </div>

    <div v-else class="space-y-6">
      <!-- Header avec statut -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              Détails de la livraison #{{
                deliveryStore.delivery.tracking_code
              }}
            </h1>
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <span class="flex items-center gap-1">
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
                Créée le
                {{
                  formatDate(deliveryStore.delivery.announcement?.created_at)
                }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span
              :class="[
                'px-3 py-1 text-sm font-medium rounded-full',
                getStatusBadgeClass(deliveryStore.delivery.status),
              ]"
            >
              {{ getStatusLabel(deliveryStore.delivery.status) }}
            </span>
            <span
              :class="[
                'px-3 py-1 text-sm font-medium rounded-full',
                deliveryStore.delivery.delivery_type === 'full'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800',
              ]"
            >
              Livraison
              {{
                deliveryStore.delivery.delivery_type === "full"
                  ? "complète"
                  : "partielle"
              }}
            </span>
          </div>
        </div>

        <!-- Informations du trajet -->
        <div class="border-t pt-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Départ</h3>
              <div class="space-y-1">
                <p class="font-medium text-gray-900">
                  {{ deliveryStore.delivery.announcement?.departure_city }}
                </p>
                <p class="text-sm text-gray-600">
                  {{
                    formatDate(deliveryStore.delivery.announcement?.pickup_date)
                  }}
                </p>
                <p
                  v-if="
                    isAssignedToCurrentUser &&
                    deliveryStore.delivery.announcement?.pickup_instructions
                  "
                  class="text-sm text-gray-600 italic"
                >
                  Instructions:
                  {{ deliveryStore.delivery.announcement.pickup_instructions }}
                </p>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Arrivée</h3>
              <div class="space-y-1">
                <p class="font-medium text-gray-900">
                  {{ deliveryStore.delivery.announcement?.arrival_city }}
                </p>
                <p class="text-sm text-gray-600">
                  {{
                    formatDate(
                      deliveryStore.delivery.announcement?.delivery_date
                    )
                  }}
                </p>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">
                Informations
              </h3>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span
                    v-if="deliveryStore.delivery.announcement?.urgent"
                    class="flex items-center gap-1 text-red-600"
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
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span class="text-sm font-medium">Urgent</span>
                  </span>
                  <span
                    v-if="deliveryStore.delivery.announcement?.assurance"
                    class="flex items-center gap-1 text-green-600"
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span class="text-sm font-medium">Assuré</span>
                  </span>
                </div>
                <p class="text-sm text-gray-600">
                  Prix:
                  <span class="font-semibold text-gray-900"
                    >{{ deliveryStore.delivery.announcement?.price }}€</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des colis -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          Colis ({{ deliveryStore.delivery.packages?.length || 0 }})
        </h2>

        <div
          v-if="
            !deliveryStore.delivery.packages ||
            deliveryStore.delivery.packages.length === 0
          "
          class="text-center py-8 text-gray-500"
        >
          Aucun colis associé à cette livraison
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(pkg, index) in deliveryStore.delivery.packages"
            :key="pkg.id"
            class="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start mb-3">
              <h3 class="font-medium text-gray-900">Colis #{{ index + 1 }}</h3>
              <span
                v-if="pkg.fragile"
                class="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
              >
                Fragile
              </span>
            </div>

            <!-- Photo du colis si disponible -->
            <div v-if="pkg.photos" class="mb-3">
              <img
                :src="pkg.photos"
                :alt="`Photo du colis ${index + 1}`"
                class="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                @click="openImageModal(pkg.photos)"
              />
            </div>

            <div class="space-y-2 text-sm">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <span class="text-gray-500">Poids:</span>
                  <span class="ml-1 font-medium text-gray-900"
                    >{{ pkg.weight }} kg</span
                  >
                </div>
                <div>
                  <span class="text-gray-500">Quantité:</span>
                  <span class="ml-1 font-medium text-gray-900">{{
                    pkg.quantity
                  }}</span>
                </div>
              </div>

              <div
                v-if="pkg.length || pkg.width || pkg.height"
                class="pt-2 border-t"
              >
                <span class="text-gray-500">Dimensions:</span>
                <div class="mt-1 font-medium text-gray-900">
                  <span v-if="pkg.length">L: {{ pkg.length }}cm</span>
                  <span v-if="pkg.width" class="ml-2"
                    >l: {{ pkg.width }}cm</span
                  >
                  <span v-if="pkg.height" class="ml-2"
                    >H: {{ pkg.height }}cm</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Poids total -->
        <div v-if="totalWeight > 0" class="mt-4 pt-4 border-t">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Poids total:</span>
            <span class="text-lg font-semibold text-gray-900"
              >{{ totalWeight }} kg</span
            >
          </div>
        </div>
      </div>

      <!-- Informations de contact (si assigné) -->
      <div
        v-if="isAssignedToCurrentUser"
        class="bg-white rounded-lg shadow p-6"
      >
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          Informations de contact
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-2">Client</h3>
            <div class="space-y-1">
              <p class="font-medium text-gray-900">
                {{ deliveryStore.delivery.announcement?.customer?.first_name }}
                {{ deliveryStore.delivery.announcement?.customer?.last_name }}
              </p>
              <p class="text-sm text-gray-600">
                {{ deliveryStore.delivery.announcement?.customer?.email }}
              </p>
              <p class="text-sm text-gray-600">
                {{
                  deliveryStore.delivery.announcement?.customer?.phone_number
                }}
              </p>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-2">Adresses</h3>
            <div class="space-y-2">
              <div>
                <p class="text-xs text-gray-500">Ramassage:</p>
                <p class="text-sm text-gray-900">
                  {{ deliveryStore.delivery.announcement?.pickup_address }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Livraison:</p>
                <p class="text-sm text-gray-900">
                  {{ deliveryStore.delivery.announcement?.delivery_address }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-center">
          <button
            @click="$router.back()"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Retour
          </button>
          <div class="flex gap-3">
            <button
              v-if="isAssignedToCurrentUser"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {{ getNextStatusAction() }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour les images -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      @click="selectedImage = null"
    >
      <img
        :src="selectedImage"
        alt="Image agrandie"
        class="max-w-full max-h-full rounded-lg"
        @click.stop
      />
      <button
        @click="selectedImage = null"
        class="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { useDeliveryStore } from "@/stores/delivery.store";

const route = useRoute();
const userStore = useUserStore();
const deliveryStore = useDeliveryStore();

onMounted(async () => {
  await deliveryStore.fetchDelivery(Number(route.params.id));
  console.log("Données de livraison récupérées :", deliveryStore.delivery);
});

const isLoading = ref(false);
const selectedImage = ref<string | null>(null);

const deliveryId = computed(() => Number(route.params.id));
const isAssignedToCurrentUser = computed(() => {
  return deliveryStore.delivery.value?.delivery_agent_id === userStore.user?.id;
});
const totalWeight = computed(() => {
  if (!deliveryStore.delivery.value?.packages) return 0;
  return deliveryStore.delivery.value.packages.reduce(
    (sum: number, pkg: any) => sum + pkg.weight * pkg.quantity,
    0
  );
});

const getStatusLabel = (status: DeliveryStatus): string => {
  const labels = {
    [DeliveryStatus.ASSIGNED]: "Assignée",
    [DeliveryStatus.PICKED_UP]: "Ramassée",
    [DeliveryStatus.IN_TRANSIT]: "En transit",
    [DeliveryStatus.DELIVERED]: "Livrée",
    [DeliveryStatus.PENDING]: "Pas encore assignée",
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

const getNextStatusAction = (): string => {
  if (!deliveryStore.delivery.value) return "";
  switch (deliveryStore.delivery.value.status) {
    case DeliveryStatus.ASSIGNED:
      return "Marquer comme ramassée";
    case DeliveryStatus.PICKED_UP:
      return "Marquer en transit";
    case DeliveryStatus.IN_TRANSIT:
      return "Marquer comme livrée";
    default:
      return "Mettre à jour le statut";
  }
};

const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "Non définie";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const openImageModal = (imageUrl: string) => {
  selectedImage.value = imageUrl;
};
</script>

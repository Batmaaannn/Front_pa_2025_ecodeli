<template>
  <div class="max-w-7xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Toutes les demandes de livraison</h2>

    <div class="bg-white p-4 mb-6 rounded-lg shadow-md">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ville
          </label>
          <input
            v-model="filterCity"
            type="text"
            placeholder="Filtrer par ville"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Rayon maximum (km)
          </label>
          <input
            v-model.number="filterMaxRadius"
            type="number"
            placeholder="Rayon maximum"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button
          @click="applyFilters"
          :disabled="isLoading"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg
            v-if="!isLoading"
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <svg
            v-else
            class="animate-spin h-4 w-4"
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
          {{ isLoading ? "Recherche..." : "Rechercher" }}
        </button>
      </div>
    </div>

    <table
      class="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden"
    >
      <thead class="bg-gray-50">
        <tr>
          <th class="px-3 py-3 text-center">
            <input
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelectAll"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Départ
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Arrivée
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Dates
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Urgent
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Assurance
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <template
          v-for="delivery in deliveryStore.deliveries"
          :key="delivery.id"
        >
          <tr>
            <td class="px-3 py-4 text-center">
              <input
                type="checkbox"
                :value="delivery.id"
                v-model="selectedDeliveries"
                @change="onDeliverySelectionChange(delivery.id)"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td class="px-6 py-4">
              {{
                delivery.deliveryType === "full"
                  ? delivery.departureCity
                  : delivery.intermediateCity
              }}
            </td>
            <td class="px-6 py-4">{{ delivery.arrivalCity }}</td>
            <td class="px-6 py-4">
              {{ new Date(delivery.pickupDate).toLocaleString() }} →<br />
              {{ new Date(delivery.deliveryDate).toLocaleString() }}
            </td>
            <td class="px-6 py-4">
              <span v-if="delivery.urgent" class="text-red-600 font-bold"
                >Oui</span
              >
              <span v-else class="text-gray-500">Non</span>
            </td>
            <td class="px-6 py-4">
              <span v-if="delivery.assurance" class="text-red-600 font-bold"
                >Oui</span
              >
              <span v-else class="text-gray-500">Non</span>
            </td>
            <td>
              <button
                @click="
                  $router.push({
                    path: `livraison/${delivery.announcementId}`,
                  })
                "
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Voir
              </button>
            </td>
          </tr>
          <tr v-if="isDeliverySelected(delivery.id || delivery.announcementId)">
            <td colspan="7" class="px-6 py-4 bg-gray-50">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <input
                    type="radio"
                    :id="`full-${delivery.id}`"
                    :name="`delivery-type-${delivery.id}`"
                    value="full"
                    :checked="getDeliveryConfig(delivery.id).type === 'full'"
                    @change="updateDeliveryType(delivery.id, 'full')"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                  />
                  <label
                    :for="`full-${delivery.id}`"
                    class="text-sm font-medium text-gray-700"
                  >
                    Livraison complète ({{ delivery.departureCity }} →
                    {{ delivery.arrivalCity }})
                  </label>
                </div>
                <div class="flex items-center gap-2">
                  <input
                    type="radio"
                    :id="`partial-${delivery.id}`"
                    :name="`delivery-type-${delivery.id}`"
                    value="partial"
                    :checked="getDeliveryConfig(delivery.id).type === 'partial'"
                    @change="updateDeliveryType(delivery.id, 'partial')"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                  />
                  <label
                    :for="`partial-${delivery.id}`"
                    class="text-sm font-medium text-gray-700"
                  >
                    Livraison partielle
                  </label>
                </div>
                <div
                  v-if="getDeliveryConfig(delivery.id).type === 'partial'"
                  class="flex items-center gap-2"
                >
                  <label class="text-sm font-medium text-gray-700"
                    >Déposer à:</label
                  >
                  <input
                    type="text"
                    v-model="deliveryConfigs[delivery.id].intermediateCity"
                    placeholder="Ex: Lyon"
                    class="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span class="text-sm text-gray-600"
                    >(au lieu de {{ delivery.arrivalCity }})</span
                  >
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <div v-if="selectedDeliveries.length > 0" class="mt-4 flex justify-end">
      <button
        @click="assignSelectedDeliveries"
        class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-2"
      >
        <span
          >Assigner {{ selectedDeliveries.length }} livraison{{
            selectedDeliveries.length > 1 ? "s" : ""
          }}</span
        >
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useDeliveryStore } from "@/stores/delivery.store";

const deliveryStore = useDeliveryStore();

interface DeliveryConfig {
  type: "full" | "partial";
  intermediateCity?: string;
}

const usersStore = useUserStore();

const deliveries = ref<any[]>([]);

const filterCity = ref<string>("");
const filterMaxRadius = ref<number | undefined>(undefined);
const selectedDeliveries = ref<(string | number)[]>([]);
const selectAll = ref(false);
const deliveryConfigs = ref<Record<string | number, DeliveryConfig>>({});
const isLoading = ref(false);

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedDeliveries.value = deliveries.value.map(
      (d) => d.id || d.announcementId
    );
    // Initialize all configs as full delivery by default
    deliveries.value.forEach((d) => {
      const id = d.id || d.announcementId;
      if (!deliveryConfigs.value[id]) {
        deliveryConfigs.value[id] = { type: "full" };
      }
    });
  } else {
    selectedDeliveries.value = [];
    deliveryConfigs.value = {};
  }
};

const isDeliverySelected = (deliveryId: string | number) => {
  return selectedDeliveries.value.includes(deliveryId);
};

const getDeliveryConfig = (deliveryId: string | number): DeliveryConfig => {
  if (!deliveryConfigs.value[deliveryId]) {
    deliveryConfigs.value[deliveryId] = { type: "full" };
  }
  return deliveryConfigs.value[deliveryId];
};

const updateDeliveryType = (
  deliveryId: string | number,
  type: "full" | "partial"
) => {
  if (!deliveryConfigs.value[deliveryId]) {
    deliveryConfigs.value[deliveryId] = { type };
  } else {
    deliveryConfigs.value[deliveryId].type = type;
    if (type === "full") {
      delete deliveryConfigs.value[deliveryId].intermediateCity;
    }
  }
};

const onDeliverySelectionChange = (deliveryId: string | number) => {
  if (isDeliverySelected(deliveryId) && !deliveryConfigs.value[deliveryId]) {
    deliveryConfigs.value[deliveryId] = { type: "full" };
  } else if (!isDeliverySelected(deliveryId)) {
    delete deliveryConfigs.value[deliveryId];
  }
};

const applyFilters = async () => {
  isLoading.value = true;
  try {
    const params: any = {};
    if (filterCity.value) params.city = filterCity.value;
    if (filterMaxRadius.value !== undefined)
      params.maxRadius = filterMaxRadius.value;

    await deliveryStore.fetchPostedDeliveries(params);

    // Reset selections when applying new filters
    selectedDeliveries.value = [];
    deliveryConfigs.value = {};
    selectAll.value = false;
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    alert("Erreur lors de la recherche des livraisons");
  } finally {
    isLoading.value = false;
  }
};

const assignSelectedDeliveries = async () => {
  if (selectedDeliveries.value.length === 0) return;

  // Prepare delivery assignments with their configurations
  const assignments = selectedDeliveries.value.map((deliveryId) => {
    const config = deliveryConfigs.value[deliveryId] || { type: "full" };
    return {
      deliveryId,
      type: config.type,
      ...(config.type === "partial" && config.intermediateCity
        ? { intermediateCity: config.intermediateCity }
        : {}),
    };
  });
  try {
    await deliveryStore.assignDeliveriesToAgent(assignments);
    selectedDeliveries.value = [];
    deliveryConfigs.value = {};
    selectAll.value = false;

    // Reload deliveries with current filters
    await applyFilters();
  } catch (error) {
    console.error("Erreur lors de l'assignation des livraisons:", error);
    alert("Erreur lors de l'assignation des livraisons");
  }
};

onMounted(async () => {
  if (usersStore.isDeliveryAgent) {
    filterCity.value =
      usersStore.user.delivery_agent.favorite_delivery_city || "";
    filterMaxRadius.value = usersStore.user.delivery_agent.max_radius_km;
  }

  try {
    const params: any = {};

    if (filterCity.value) {
      params.city = filterCity.value;
    }

    if (filterMaxRadius.value !== undefined) {
      params.maxRadius = filterMaxRadius.value;
    }

    await deliveryStore.fetchPostedDeliveries(params);
  } catch (error) {
    console.error(error);
  }
});
</script>

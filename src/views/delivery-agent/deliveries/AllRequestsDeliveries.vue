<template>
  <div class="max-w-5xl mx-auto mt-10">
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
    </div>

    <table
      class="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden"
    >
      <thead class="bg-gray-50">
        <tr>
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
        <tr v-for="delivery in deliveries" :key="delivery.id">
          <td class="px-6 py-4">{{ delivery.departureCity }}</td>
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
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { axios } from "@/libs/axios";
import { useUserStore } from "@/stores/user.store";
import { isDeliveryAgentUser } from "@/types/typeGuards";

const usersStore = useUserStore();

const deliveries = ref<any[]>([]);

const filterCity = ref<string>("");
const filterMaxRadius = ref<number | undefined>(undefined);

onMounted(async () => {
  if (isDeliveryAgentUser(usersStore.user)) {
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

    const res = await axios.get("/deliveries", { params });
    deliveries.value = res.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

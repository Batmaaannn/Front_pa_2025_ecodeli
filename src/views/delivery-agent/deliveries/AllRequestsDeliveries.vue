<template>
  <div class="max-w-5xl mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-6">Toutes les demandes de livraison</h2>

    <table class="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Départ</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Arrivée</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Urgent</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
      <tr v-for="delivery in deliveries" :key="delivery.id">
        <td class="px-6 py-4">{{ delivery.start_city }}</td>
        <td class="px-6 py-4">{{ delivery.arrival_city }}</td>
        <td class="px-6 py-4">
          {{ new Date(delivery.start_date).toLocaleString() }} →<br />
          {{ new Date(delivery.end_date).toLocaleString() }}
        </td>
        <td class="px-6 py-4">
          <span v-if="delivery.urgent" class="text-red-600 font-bold">Oui</span>
          <span v-else class="text-gray-500">Non</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { axios } from "@/libs/axios";

const deliveries = ref<any[]>([]);

onMounted(async () => {
  try {
    const res = await axios.get("/delivery-requests");
    deliveries.value = res.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-xl mt-10">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Demande de livraison</h2>
    <form @submit.prevent="submitRequest" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
        <input v-model="form.name" type="text" required class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Adresse de départ</label>
        <input v-model="form.pickupAddress" type="text" required class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Adresse d’arrivée</label>
        <input v-model="form.deliveryAddress" type="text" required class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de ramassage</label>
          <input v-model="form.date" type="date" required class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Heure</label>
          <input v-model="form.time" type="time" required class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Type de colis</label>
        <select v-model="form.packageSize" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="small">Petit</option>
          <option value="medium">Moyen</option>
          <option value="large">Grand</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Commentaire (facultatif)</label>
        <textarea v-model="form.comment" rows="3" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Envoyer la demande</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useDeliveryStore } from "@/stores/delivery-request.store";

export default {
  setup() {
    const form = ref({
      name: "",
      pickupAddress: "",
      deliveryAddress: "",
      date: "",
      time: "",
      packageSize: "medium",
      comment: "",
    });

    const store = useDeliveryStore();

    const submitRequest = async () => {
      const payload = {
        ...form.value,
        datetime: `${form.value.date}T${form.value.time}`,
      };

      await store.createDeliveryRequest(payload);

      form.value = {
        name: "",
        pickupAddress: "",
        deliveryAddress: "",
        date: "",
        time: "",
        packageSize: "medium",
        comment: "",
      };
    };

    return { form, submitRequest };
  },
};
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-xl mt-10">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Ajouter un futur trajet</h2>

    <form @submit.prevent="submitTrip" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ville de départ</label>
        <input v-model="form.start_city" type="text" required class="form-input" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ville d’arrivée</label>
        <input v-model="form.arrival_city" type="text" required class="form-input" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
          <input v-model="form.start_date" type="datetime-local" required class="form-input" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date d’arrivée</label>
          <input v-model="form.end_date" type="datetime-local" required class="form-input" />
        </div>
      </div>

      <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Enregistrer le trajet
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTripStore } from "@/stores/delivery.store";

const store = useTripStore();

const form = ref({
  start_city: "",
  arrival_city: "",
  start_date: "",
  end_date: "",
});

const submitTrip = async () => {
  try {
    await store.createTrip(form.value);
    alert("Trajet enregistré !");
    form.value = { start_city: "", arrival_city: "", start_date: "", end_date: "" };
  } catch (error) {
    alert("Erreur lors de l'enregistrement.");
    console.error(error);
  }
};
</script>

<style scoped>
.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
}
.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
}
</style>

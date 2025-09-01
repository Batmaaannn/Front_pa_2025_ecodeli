<template>
  <div class="mx-auto">
    <div class="bg-primary-500 text-white p-6 rounded-t-xl">
      <h2 class="text-3xl font-bold flex items-center">
        <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"></path>
        </svg>
        Créer une nouvelle box
      </h2>
      <p class="mt-2 text-primary-100">
        Remplissez le formulaire pour créer une nouvelle box
      </p>
    </div>
  </div>
  <form @submit.prevent="submitRequest" class="bg-white shadow-xl rounded-b-xl p-8">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span
          class="bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">1</span>
        Choisir un entrepôt
      </h3>
      <div>
        <label class="block text-sm font-semibold leading-6 text-gray-900">Entrepôt :</label>
        <select
          class="col-start-1 row-start-1 block w-full rounded-md border-0 px-3.5 py-2 mt-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
          <option v-for="warehouse in warehouses" :value="warehouse.id" :key="warehouse.id">
            {{ warehouse.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span
          class="bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">2</span>
        Choisir la taille
      </h3>
      <div>
        <label class="block text-sm font-semibold leading-6 text-gray-900">Taille :</label>
        <select
          class="col-start-1 row-start-1 block w-full rounded-md border-0 px-3.5 py-2 mt-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
          <option v-for="box in BoxSize" :value="box" :key="box">
            {{ box }}
          </option>
        </select>
      </div>
    </div>
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span
          class="bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">3</span>
        Dates
      </h3>

      <div class="grid md:grid-cols-2 gap-6">
        <InputField v-model="form.rentalStart" name="rentalStart" label="Date de début" type="datetime-local"
          required />

        <InputField v-model="form.rentalEnd" name="rentalEnd" label="Date de fin" type="datetime-local" required />
      </div>
    </div>
    <!-- Actions -->
    <div class="flex justify-between items-center pt-6 border-t">
      <button type="button" @click="resetForm"
        class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
        Annuler
      </button>

      <button type="submit" :disabled="isSubmitting"
        class="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition font-semibold flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
        <svg v-if="!isSubmitting" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
          </path>
        </svg>
        <svg v-else class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        {{ isSubmitting ? "Envoi en cours..." : "Publier l'annonce" }}
      </button>
    </div>
  </form>

</template>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

form>div {
  animation: fadeIn 0.3s ease-out;
}
</style>

<script lang="ts" setup>
import { BoxRequest, BoxSize } from '@/types/box';
import InputField from "@/components/formControls/InputField.vue";
import { ref } from 'vue';
import { axios } from "@/libs/axios";
import { WarehouseType } from '@/types/warehouse';
import { AxiosResponse } from 'axios';

const warehouses = ref<WarehouseType[]>([]);

const isSubmitting = ref(false);

axios.get("/warehouses").then((res: AxiosResponse<WarehouseType[]>) => {
  warehouses.value = res.data;
});

const form = ref<BoxRequest>({
  rentalStart: new Date(),
  rentalEnd: new Date(),
  warehouseId: 0,
  size: BoxSize.SMALL
})

const resetForm = () => {
  form.value = {
    warehouseId: 0,
    rentalStart: new Date(),
    rentalEnd: new Date(),
    size: BoxSize.SMALL
  };
};

const submitRequest = async () => {
  try {
    axios.post("/storages/create-reservation-box", form.value);

    alert("La box a été créée avec succès.")
  } catch (e) {
    alert("Une erreur s'est produite lors de la création d'un box.");
  }
}
</script>
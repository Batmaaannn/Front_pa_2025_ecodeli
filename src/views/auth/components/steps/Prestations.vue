<template>
  <div class="max-w-2xl mb-6">
    <h2 class="text-l font-semibold">
      Quels services à la personne proposés vous ?
    </h2>
    <p class="my-2">
      Sélectionnez le(s) service(s) que vous proposez. Vous pouvez en choisir
      plusieurs. Ainsi que les prix auxquels vous souhaitez les appliquer.
    </p>
    <small
      >Chez Ecodeli les prix sont souvent fixes, mais nous vous contacterons
      pour en discuter.</small
    >
  </div>
  <div class="">
    <PrestationChoose
      v-model="selectedPrestations"
      :prestations="plans"
      @update:prestationPrice="handlePrice"
    />
  </div>
</template>

<script setup lang="ts">
import PrestationChoose from "@/components/prestations/PrestationChoose.vue";
import { ref } from "vue";

const selectedPrestations = ref<number[]>([]);
const quantities = ref<Record<number, number>>({});

const handlePrice = ({ id, value }: { id: number; value: number }) => {
  quantities.value[id] = value;
};

const plans = [
  {
    id: 1,
    label: "Hobby",
    category: "8GB",
  },
  {
    id: 2,
    label: "Hobby",
    category: "8GB",
  },
  {
    id: 3,
    label: "Hobby",
    category: "8GB",
  },
  {
    id: 4,
    label: "Hobby",
    category: "8GB",
  },
];
</script>

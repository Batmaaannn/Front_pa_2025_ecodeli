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
      v-if="plans.length > 0"
      v-model="selectedPrestations"
      :prestations="plans"
      @update:prestationPrice="handlePrice"
    />
  </div>
  <div class="max-w-sm flex gap-4 py-4 justify-end">
    <Button :disabled="formHasError" isGreen @click="goToNextStep"
      >Suivant</Button
    >
  </div>
</template>

<script setup lang="ts">
import PrestationChoose from "@/components/prestations/PrestationChoose.vue";
import { onBeforeMount, ref, computed } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/formControls/Button.vue";

import { usePrestationStore } from "@/stores/prestation.store";
const prestationStore = usePrestationStore();
import { Prestation } from "@/types/prestation.type";
const plans = ref<Prestation[]>([]);

onBeforeMount(async () => {
  plans.value = await prestationStore.getPrestations();
});

const selectedPrestations = ref<number[]>([]);
const quantities = ref<Record<number, number>>({});

const handlePrice = ({ id, value }: { id: number; value: number }) => {
  quantities.value[id] = value;
};

const formHasError = computed(() => {});

function goToNextStep() {
  // authStore.setUserTypeRegister({
  //   userType: selected.value,
  // });

  // authStore.nextStep();

  // if (selected.value === "client" || selected.value === "merchant") {
  //   router.push({ name: "Informations" });
  //   return;
  // } else {
  //   router.push({ name: "Prestations" });
  //   return;
  // }
}
</script>

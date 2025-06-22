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
  <PrestationChoose
    v-if="plans.length > 0"
    v-model="selectedPrestations"
    :prestations="plans"
    @update:prestationPrice="handlePrice"
  />
  <div class="max-w-sm flex gap-4 py-4 justify-end">
    <Button isGreen @click="goToPreviousStep">Précédent</Button>
    <Button :disabled="formHasError" isGreen @click="goToNextStep"
      >Suivant</Button
    >
  </div>
</template>

<script setup lang="ts">
import PrestationChoose from "@/components/prestations/PrestationChoose.vue";
import { onBeforeMount, ref, computed, onMounted } from "vue";
import Button from "@/components/formControls/Button.vue";
import { Prestation, PrestationIdWithPrice } from "@/types/prestation";

import { usePrestationStore } from "@/stores/prestation.store";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";

const router = useRouter();

const prestationStore = usePrestationStore();
const authStore = useAuthStore();
const plans = ref<Prestation[]>([]);

onBeforeMount(async () => {
  plans.value = (await prestationStore.getPrestations()) ?? [];
});

onMounted(() => {
  if (authStore.register.prestations) {
    prices.value = authStore.register.prestations;
  }
});

const selectedPrestations = ref<number[]>([]);
const prices = ref<PrestationIdWithPrice[]>([]);

const handlePrice = ({ id, value }: { id: number; value: number }) => {
  const index = prices.value.findIndex((item) => item.prestation === id);
  if (index !== -1) {
    prices.value[index].price = value;
  } else {
    prices.value.push({ prestation: id, price: value });
  }
};

const formHasError = computed(() => prices.value.length === 0);

function goToNextStep() {
  authStore.setServiceAgentPrestations({
    prestationsAndPrices: prices.value,
  });
  authStore.nextStep();

  router.push({ name: "Informations" });
  return;
}

function goToPreviousStep() {
  authStore.previousStep();

  router.push({ name: "UserInformations" });
}
</script>

<template>
  <div class="max-w-2xl">
    <h2 class="text-l font-semibold">Quel est votre type de profil ?</h2>
    <p class="mb-4">
      Sélectionnez le type de profil qui correspond le mieux à votre activité.
    </p>
  </div>
  <div class="grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1">
    <RadioButtonWithIcon
      v-for="option in prospectOptions"
      :key="option.value"
      v-model="selected"
      :option="option"
    />
  </div>
  <Alert
    v-if="selected === 'service_agent' || selected === 'delivery_agent'"
    isWarning
    >L'inscription n'est pas automatique, nous étudierons avec le plus grand
    soin votre demande.</Alert
  >
  <div class="max-w-sm flex gap-4 py-4 justify-end">
    <Button :disabled="formHasError" isGreen @click="goToNextStep"
      >Suivant</Button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RadioButtonWithIcon from "@/components/formControls/RadioButtonWithIcon.vue";
import Alert from "@/components/formControls/Alert.vue";
import { UserIcon, TruckIcon } from "@heroicons/vue/24/outline";
import Button from "@/components/formControls/Button.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
const authStore = useAuthStore();
const router = useRouter();
const selected = ref("");

const formHasError = computed(() => {
  if (!selected.value) return true;
  return !prospectOptions.some((option) => option.value === selected.value);
});

function goToNextStep() {
  authStore.setUserTypeRegister({
    userType: selected.value,
  });

  authStore.nextStep();

  if (selected.value === "client" || selected.value === "merchant") {
    router.push({ name: "Informations" });
    return;
  } else {
    router.push({ name: "Prestations" });
    return;
  }
}

const prospectOptions = [
  { value: "client", label: "Particulier", icon: UserIcon },
  { value: "service_agent", label: "Prestataire de service", icon: TruckIcon },
  { value: "delivery_agent", label: "Livreur", icon: UserIcon },
  { value: "merchant", label: "Entreprise", icon: TruckIcon },
];
</script>

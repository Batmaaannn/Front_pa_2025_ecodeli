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
</template>

<script setup lang="ts">
import { ref } from "vue";
import RadioButtonWithIcon from "@/components/formControls/RadioButtonWithIcon.vue";
import { UserIcon, TruckIcon } from "@heroicons/vue/24/outline";

const selected = ref("vehicle");

const prospectOptions = [
  { value: "client", label: "Particulier", icon: UserIcon },
  { value: "service_agent", label: "Prestataire de service", icon: TruckIcon },
  { value: "delivery_agent", label: "Livreur", icon: UserIcon },
  { value: "merchant", label: "Entreprise", icon: TruckIcon },
];
</script>

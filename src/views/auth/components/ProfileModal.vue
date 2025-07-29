<template>
  <div>
    <Modal @close="$emit('close')">
      <div class="max-w-2xl">
        <h2 class="text-l font-semibold">Quel est votre type de profil ?</h2>
        <p class="mb-4">
          Sélectionnez le type de profil qui correspond le mieux à votre
          activité.
        </p>
      </div>
      <div class="grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1">
        <RadioButtonWithIcon
          v-for="option in prospectOptions"
          :key="option.value"
          v-model="selected"
          :option="option"
          @change="$emit('update-profile', selected)"
        />
      </div>
      <Alert
        v-if="selected === 'service_agent' || selected === 'delivery_agent'"
        isWarning
        >L'inscription n'est pas automatique, nous étudierons avec le plus grand
        soin votre demande.</Alert
      >
      <div
        class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
      >
        <Button :disabled="!selected" @click="$emit('close')" isGreen
          >Continuer</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import RadioButtonWithIcon from "@/components/formControls/RadioButtonWithIcon.vue";
import Button from "@/components/formControls/Button.vue";

import Alert from "@/components/formControls/Alert.vue";
import { UserIcon, TruckIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["close", "update-profile"]);

const selected = ref("");
const prospectOptions = [
  { value: "service_agent", label: "Prestataire de service", icon: TruckIcon },
  { value: "delivery_agent", label: "Livreur", icon: UserIcon },
  { value: "merchant", label: "Entreprise", icon: TruckIcon },
];
</script>

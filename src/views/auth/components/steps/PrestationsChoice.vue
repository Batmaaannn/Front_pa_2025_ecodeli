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

<script setup lang="ts"></script>

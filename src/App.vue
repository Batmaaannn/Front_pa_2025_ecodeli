<template>
  <component :is="layout">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </component>
</template>

<script setup lang="ts">
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import { computed } from "vue";

const layout = computed(() => {
  // if (!usersStore.isConnected) return DefaultLayout;
  //ConectedLayout
  return DefaultLayout;
});
</script>

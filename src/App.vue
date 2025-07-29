<template>
  <component :is="layout">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </component>
</template>

<script setup lang="ts">
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import ConnectedLayout from "@/components/layouts/ConnectedLayout.vue";

import { computed } from "vue";
import { useUserStore } from "@/stores/user.store";

const usersStore = useUserStore();

const layout = computed(() => {
  if (!usersStore.isConnected) return DefaultLayout;
  return ConnectedLayout;
});
</script>

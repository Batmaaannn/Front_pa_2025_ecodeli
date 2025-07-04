<template>
  <div class="dashboard-patient">
    <ConnecterSidebar :navigation="navigation" />

    <div class="lg:pl-72">
      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConnecterSidebar from "@/components/layouts/menus/ConnectedSidebar.vue";
import { HomeIcon } from "@heroicons/vue/24/outline";

const navigation = [
  { name: "Accueil", href: "DashboardAdmin", icon: HomeIcon, current: true },
  {
    name: "Demandes d'inscription",
    href: "RegistrationRequests",
    icon: HomeIcon,
    current: false,
  },
];
</script>

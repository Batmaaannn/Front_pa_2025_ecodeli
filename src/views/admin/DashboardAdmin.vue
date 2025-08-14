<template>
  <div class="dashboard-patient">
    <ConnecterSidebar :navigation="navigation" />
    <div class="lg:pl-72">
      Ajouter : Demande nouvelles prestations Ajouter : Tickets Ajouter :
      Pending validation merchant

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
    name: "Livreurs",
    href: "DeliveryAgentList",
    icon: HomeIcon,
    current: false,
  },
  {
    name: "Prestataires de services",
    href: "ServiceAgentList",
    icon: HomeIcon,
    current: false,
  },
];
</script>

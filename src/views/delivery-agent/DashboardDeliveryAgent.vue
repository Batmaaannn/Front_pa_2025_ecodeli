<script setup lang="ts">
import ConnecterSidebar from "@/components/layouts/menus/ConnectedSidebar.vue";
import {
  CalendarIcon,
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const navigationItems = [
  { name: "Accueil", href: "DashboardDeliveryAgent", icon: HomeIcon },
  { name: "Demandes à livrer", href: "FutureDeliveryAgentDeliveries", icon: UsersIcon },
  { name: "Toutes les demandes", href: "AllDeliveryRequests", icon: FolderIcon },
  { name: "Historique", href: "PastDeliveryAgentDeliveries", icon: CalendarIcon },
  { name: "Ajouter un trajet", href: "CreateTrip", icon: ChartPieIcon },
];

const navigation = computed(() =>
    navigationItems.map(item => ({
      ...item,
      current: route.name === item.href,
    }))
);
</script>

<template>
  <div class="dashboard-livreur">
    <ConnecterSidebar :navigation="navigation" />

    <div class="lg:pl-72">
      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

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
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const navigationItems = [
  { name: "Accueil", href: "DashboardCustomer", icon: HomeIcon },
  { name: "Livraisons", href: "FutureDeliveries", icon: UsersIcon },
  { name: "Livraisons passées", href: "PastDeliveries", icon: CalendarIcon },
  { name: "Demander une livraison", href: "DeliveryRequestForm", icon: ChartPieIcon },
  { name: "Mes rendez-vous", href: "FutureCustomerAppointments", icon: FolderIcon },
  { name: "Rendez-vous passés", href: "PastCustomerAppointments", icon: DocumentDuplicateIcon },
  { name: "Boxs", href: "BoxPage", icon: ChartPieIcon },
];

const navigation = computed(() =>
  navigationItems.map(item => ({
    ...item,
    current: route.name === item.href
  }))
);
</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold text-gray-900">Liste des livreurs</h1>
    </div>
    <Filters @filters="setFilterAndFetch" />
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table class="min-w-full divide-y divide-gray-300">
        <caption class="sr-only">
          Liste des livreurs
        </caption>
        <thead>
          <tr>
            <th
              v-for="header in Headers"
              :key="header.attribute"
              scope="col"
              class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
            >
              <a>
                {{ header.title }}
              </a>
            </th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <tr
            v-for="deliveryAgent in adminStore.deliveryAgents"
            :key="deliveryAgent.id"
            @click="
              $router.push({ path: `/tableau-de-bord/livreurs/${deliveryAgent.id}` })
            "
            class="even:bg-gray-50 cursor-pointer"
          >
            <td
              class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-3"
            >
              {{ deliveryAgent.company_name }}
            </td>
            <td
              class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-3"
            >
              {{ deliveryAgent.siret }}
            </td>
            <td
              class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-3"
            >
              {{ deliveryAgent.user.is_validated ? "Validé" : "Non validé" }}
            </td>
            <td
              class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-3"
            >
              {{ deliveryAgent.user.created_at }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td></td>
            Mettre un loader
          </tr>
        </tbody>
      </table>
      <div v-if="adminStore.deliveryAgents.length === 0 && !loading">
        Il n'y a actuellement aucun livreur
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAdminStore } from "@/stores/admin.store";
import Filters from "@/components/filter/Filters.vue";

import { onBeforeMount, ref } from "vue";
import { FiltersData } from "@/types/filter";

const adminStore = useAdminStore();

onBeforeMount(async () => {
  loading.value = true;
  await adminStore.fetchListDeliveryAgents();
  loading.value = false;
});

const loading = ref(false);

const Headers = {
  COMPANY_NAME: {
    title: "Entreprise",
    attribute: "deliveryAgent.company_name",
  },
  SIRET: { title: "Siret", attribute: "deliveryAgent.siret" },
  STATUS: { title: "Status", attribute: "user.is_validated" },
  CREATED_AT: {
    title: "Inscription",
    attribute: "deliveryAgent.user.created_at",
  },
};

async function setFilterAndFetch(filters: FiltersData) {
  loading.value = true;
  await adminStore.fetchListDeliveryAgents(filters);
  loading.value = false;
}
</script>

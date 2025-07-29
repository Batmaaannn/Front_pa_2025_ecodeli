<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold text-gray-900">
        Demandes d'inscription
      </h1>
    </div>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Entreprise
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Siret
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Type d'utilisateur
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr
                v-for="request in registrationStore.registrationRequests"
                :key="request.email"
                class="even:bg-gray-50"
              >
                <td
                  class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-3"
                >
                  {{ request.company_name }}
                </td>
                <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                  {{ request.siret }}
                </td>
                <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                  {{
                    request.agent_type === AgentType.SERVICE_AGENT
                      ? "Prestataire de service"
                      : "Livreur"
                  }}
                </td>
                <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                  {{ statusToDisplay(request.statut) }}
                </td>
                <td
                  class="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-3"
                >
                  <router-link
                    :to="`demande-inscription/${request.id}`"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Voir<span class="sr-only">, {{ request.id }}</span>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRegistrationStore } from "@/stores/registration-request.store";
import { AgentType } from "@/types/user";
import { onBeforeMount, computed } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { Statut } from "@/types/statut";

const registrationStore = useRegistrationStore();

onBeforeMount(async () => {
  await registrationStore.getRegistrations();
});

const statusToDisplay = computed(() => {
  return (statut: Statut) => {
    switch (statut) {
      case Statut.PENDING:
        return "En attente";
      case Statut.ACCEPTED:
        return "Acceptée";
      case Statut.REJECTED:
        return "Rejetée";
      default:
        return "";
    }
  };
});
</script>

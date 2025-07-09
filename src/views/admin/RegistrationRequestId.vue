<template>
  <div>
    <div class="flex justify-between items-start px-4 sm:px-0">
      <div>
        <h3 class="text-base/7 font-semibold text-gray-900">
          Demande d'inscription
        </h3>
        <p class="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Demande d'inscription d'un
          {{
            registration.agent_type === AgentType.SERVICE_AGENT
              ? "prestataire de service"
              : "livreur"
          }}.
        </p>
      </div>
      <div class="ml-4">
        <!-- Remplacez 'registration.status' par la variable souhaitée -->
        <span class="text-sm text-gray-700">{{
          statusToDisplay(registration.statut)
        }}</span>
      </div>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Nom complet</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ registration.first_name }} {{ registration.last_name }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Coordonnées</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div>{{ registration.email }}</div>
            <div>{{ registration.phone_number }}</div>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Entreprise</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div><span>Siret : </span>{{ registration.siret }}</div>
            <div><span>Nom : </span>{{ registration.company_name }}</div>
            <div>
              <span>Adresse : </span> {{ registration.company_address }},
              {{ registration.company_city }}
            </div>
          </dd>
        </div>
        <div
          v-if="registration.vehicle_type !== null"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm/6 font-medium text-gray-900">Type de véhicule</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ vehiculeToDisplay(registration.vehicle_type) }}
          </dd>
        </div>
        <div
          v-if="registration.documents?.length"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm/6 font-medium text-gray-900">Documents</dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              class="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              <li
                v-for="doc in registration.documents"
                :key="doc.id"
                class="grid grid-cols-3 gap-4 items-center py-4 pr-5 pl-4 text-sm/6"
              >
                <div class="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    class="size-5 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <a
                      href="#"
                      class="font-medium text-primary-600 hover:text-primary-500"
                      >Télécharger</a
                    >
                  </div>
                </div>
                <Select
                  :options="statusOptions"
                  v-model="getEditedDoc(doc.id).status"
                  class="ml-</svg>4"
                />
                <Datepicker
                  v-model="getEditedDoc(doc.id).validityDate"
                  :format-locale="fr"
                  :format="dateFormat"
                  placeholder="Choisir une date"
                  :enable-time-picker="false"
                  auto-apply
                />
              </li>
            </ul>
            <div class="mt-1 flex justify-end">
              <Button
                isBlue
                @click="
                  updateRegistrationRequestStatus(registration.id, editedDocs)
                "
              >
                Enregistrer
              </Button>
            </div>
          </dd>
        </div>
        ici
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRegistrationStore } from "@/stores/registration-request.store";
import { RegistrationRequestWithFiles } from "@/types/registration";
import { PaperClipIcon } from "@heroicons/vue/20/solid";
import { AgentType } from "@/types/user";
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { Statut } from "@/types/statut";
import { VehiculeType } from "@/types/vehicule";
import Select from "@/components/Select.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { fr } from "date-fns/locale";
import Button from "@/components/formControls/Button.vue";
import { FormUpdateFileStatutRegistration } from "@/types/file";
const dateFormat = "dd/MM/yyyy";

const registrationStore = useRegistrationStore();

const route = useRoute();

onBeforeMount(async () => {
  const id = route.params.id;
  registration.value = await registrationStore.getRegistrationById(+id);
  initializeEditedDocs();
});

const initializeEditedDocs = () => {
  if (registration.value.documents) {
    editedDocs.value = registration.value.documents.map((doc) => ({
      id: doc.id,
      status: doc.status as Statut,
      validityDate: doc.validity ? new Date(doc.validity) : null,
    }));
  }
};

const getEditedDoc = (docId: number) => {
  let doc = editedDocs.value.find((d) => d.id === docId);
  if (!doc) {
    doc = { id: docId, status: Statut.PENDING, validityDate: null };
    editedDocs.value.push(doc);
  }
  return doc;
};

const registration = ref<RegistrationRequestWithFiles>(
  {} as RegistrationRequestWithFiles
);
const editedDocs = ref<
  { id: number; status: Statut; validityDate: Date | null }[]
>([]);

const statusOptions = [
  { label: "En attente", value: Statut.PENDING },
  { label: "Acceptée", value: Statut.ACCEPTED },
  { label: "Rejetée", value: Statut.REJECTED },
];

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

const vehiculeToDisplay = computed(() => {
  return (vehicule: VehiculeType) => {
    switch (vehicule) {
      case VehiculeType.CAR:
        return "Voiture";
      case VehiculeType.TRUCK:
        return "Camion";
      case VehiculeType.VAN:
        return "Utilitaire";
      default:
        return "";
    }
  };
});

const updateRegistrationRequestStatus = async (
  id: number,
  dataToUpdate: FormUpdateFileStatutRegistration[]
) => {
  try {
    await registrationStore.updateFileRegistrationRequest(id, dataToUpdate);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
  }
};
</script>

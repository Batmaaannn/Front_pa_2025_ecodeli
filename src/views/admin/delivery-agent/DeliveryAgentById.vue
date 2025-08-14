<template>
  <div>
    <div class="flex justify-between items-start px-4 sm:px-0">
      <div>
        <h3 class="text-base/7 font-semibold text-gray-900">
          Profil utilisateur
        </h3>
      </div>
      <div class="ml-4">
        <span class="text-sm text-gray-700"
          >Validation :
          {{
            adminStore.fetchedDeliveryAgent.is_validated
              ? "Validé"
              : "En attente"
          }}</span
        >
      </div>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Nom complet</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ adminStore.fetchedDeliveryAgent.first_name }}
            {{ adminStore.fetchedDeliveryAgent.last_name }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Coordonnées</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div v-if="adminStore.fetchedDeliveryAgent.user?.email">
              {{ adminStore.fetchedDeliveryAgent.user.email }}
            </div>
            <div>{{ adminStore.fetchedDeliveryAgent.phone_number }}</div>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Entreprise</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div>
              <span>Siret : </span>{{ adminStore.fetchedDeliveryAgent.siret }}
            </div>
            <div>
              <span>Nom : </span
              >{{ adminStore.fetchedDeliveryAgent.company_name }}
            </div>
            <div>
              <span>Adresse : </span>
              {{ adminStore.fetchedDeliveryAgent.company_address }},
              {{ adminStore.fetchedDeliveryAgent.company_city }}
            </div>
          </dd>
        </div>
        <div
          v-if="adminStore.fetchedDeliveryAgent.vehicle_type !== null"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm/6 font-medium text-gray-900">Type de véhicule</dt>
          <dd
            class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-col gap-2"
          >
            <div>
              <span>Type :</span>
              <span class="ml-1">{{
                vehiculeToDisplay(adminStore.fetchedDeliveryAgent.vehicle_type)
              }}</span>
            </div>
            <div v-if="adminStore.fetchedDeliveryAgent.license_number">
              <span>Numéro de permis :</span>
              <span class="ml-1">{{
                adminStore.fetchedDeliveryAgent.license_number
              }}</span>
            </div>
          </dd>
        </div>
        <div
          v-if="adminStore.fetchedDeliveryAgent.files?.length"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm/6 font-medium text-gray-900">Documents</dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              class="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              <li
                v-for="doc in adminStore.fetchedDeliveryAgent.files"
                :key="doc.id"
                class="grid grid-cols-4 gap-4 items-center py-4 pr-5 pl-4 text-sm/6"
              >
                <div class="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    class="size-5 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <button
                      @click="downloadFile(doc.file_url)"
                      class="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Télécharger
                    </button>
                  </div>
                </div>
                <label
                  >Status :
                  <Select
                    :options="statusOptions"
                    v-model="getEditedDoc(doc.id).status"
                /></label>
                <label>
                  Type de document :
                  <Select
                    :options="documentTypeOptions"
                    v-model="getEditedDoc(doc.id).type"
                /></label>
                <label
                  >Validité :
                  <Datepicker
                    v-model="getEditedDoc(doc.id).validityDate"
                    :format-locale="fr"
                    :format="dateFormat"
                    placeholder="Choisir une date"
                    :enable-time-picker="false"
                    auto-apply
                /></label>
              </li>
            </ul>
            <div class="mt-1 flex justify-end">
              <Button
                isBlue
                @click="
                  updateUserFiles(
                    adminStore.fetchedDeliveryAgent.id,
                    editedDocs
                  )
                "
              >
                Enregistrer
              </Button>
            </div>
            <div v-if="!!successMessageFile">
              <Alert isSuccess>{{ successMessageFile }}</Alert>
            </div>
            <div v-if="!!errorMessageFile">
              <Alert isError>{{ errorMessageFile }}</Alert>
            </div>
          </dd>
        </div>
      </dl>
    </div>
    <!-- <div class="mt-6 border-t border-gray-100">
      
    </div> -->
    <div class="flex gap-2">
      <!-- <Button
        isGreen
        class="w-full"
        @click="updateadminStore.fetchedDeliveryAgentRequestStatus()"
        :disabled="
          adminStore.fetchedDeliveryAgent.documents?.some(
            (doc) => doc.status === Statut.PENDING
          ) ||
          adminStore.fetchedDeliveryAgent.statut === Statut.ACCEPTED ||
          adminStore.fetchedDeliveryAgent.statut === Statut.REJECTED
        "
        >Valider</Button
      >
      <Button
        isRed
        class="w-full"
        @click="rejectadminStore.fetchedDeliveryAgentRequest()"
        :disabled="
          adminStore.fetchedDeliveryAgent.statut === Statut.ACCEPTED ||
          adminStore.fetchedDeliveryAgent.statut === Statut.REJECTED
        "
        >Refuser</Button
      > -->
    </div>
    <!-- <div v-if="!!successMessage">
      <Alert isSuccess>{{ successMessage }}</Alert>
    </div>
    <div v-if="!!errorMessage">
      <Alert isError>{{ errorMessage }}</Alert>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { PaperClipIcon } from "@heroicons/vue/20/solid";
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { Status } from "@/types/status";
import { VehiculeType } from "@/types/delivery";
import Select from "@/components/Select.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { fr } from "date-fns/locale";
import Button from "@/components/formControls/Button.vue";
const dateFormat = "dd/MM/yyyy";
import Alert from "@/components/formControls/Alert.vue";
import { useAdminStore } from "@/stores/admin.store";
import { useUserStore } from "@/stores/user.store";
import { DocumentType, FormUpdateFileStatus } from "@/types/file";
const adminStore = useAdminStore();
const userStore = useUserStore();

const route = useRoute();

onBeforeMount(async () => {
  const id = route.params.id;
  await adminStore.fetchDeliveryAgentById(+id);
  initializeEditedDocs();
});

const initializeEditedDocs = () => {
  if (adminStore.fetchedDeliveryAgent.files) {
    editedDocs.value = adminStore.fetchedDeliveryAgent.files.map((doc) => ({
      id: doc.id,
      status: doc.status as Status,
      validityDate: doc.validity ? new Date(doc.validity) : null,
      type: doc.document_type as DocumentType,
    }));
  }
};

const getEditedDoc = (docId: number) => {
  let doc = editedDocs.value.find((d) => d.id === docId);
  if (!doc) {
    doc = {
      id: docId,
      status: Status.PENDING,
      validityDate: null,
      type: DocumentType.IDENTITY,
    };
    editedDocs.value.push(doc);
  }
  return doc;
};

const editedDocs = ref<
  {
    id: number;
    status: Status;
    validityDate: Date | null;
    type: DocumentType;
  }[]
>([]);

const statusOptions = [
  { label: "En attente", value: Status.PENDING },
  { label: "Acceptée", value: Status.ACCEPTED },
  { label: "Rejetée", value: Status.REJECTED },
];

const documentTypeOptions = [
  { label: "Carte d'identité", value: DocumentType.IDENTITY },
  { label: "Permis de conduire", value: DocumentType.LICENSE },
  { label: "Attestation d'assurance", value: DocumentType.INSURANCE },
  { label: "Contrat de travail", value: DocumentType.CONTRACT },
  { label: "Attestation de livraison", value: DocumentType.DELIVERY_PROOF },
  { label: "Kbis", value: DocumentType.CERTIFICATE },
  { label: "Facture", value: DocumentType.INVOICE },
];

// // const statusToDisplay = computed(() => {
// //   return (statut: Status) => {
// //     switch (statut) {
// //       case Status.PENDING:
// //         return "En attente";
// //       case Status.ACCEPTED:
// //         return "Acceptée";
// //       case Status.REJECTED:
// //         return "Rejetée";
// //       default:
// //         return "";
// //     }
// //   };
// // });

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

const downloadFile = async (filePath: string) => {
  try {
    const response = await userStore.getFileDownloadUrl(filePath);

    // If response contains a download URL, open it in a new tab
    if (response && response.downloadUrl) {
      window.open(response.downloadUrl, "_blank");
    } else if (typeof response === "string") {
      // If response is directly a URL string
      window.open(response, "_blank");
    } else {
      console.error("Invalid download URL response:", response);
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    // You could add a toast notification here to inform the user of the error
  }
};

const successMessage = ref("");
const errorMessage = ref("");
const successMessageFile = ref("");
const errorMessageFile = ref("");

const updateUserFiles = async (
  id: number,
  dataToUpdate: FormUpdateFileStatus[]
) => {
  errorMessageFile.value = "";
  successMessageFile.value = "";
  try {
    await adminStore.updateFileStatus(id, dataToUpdate);
    successMessageFile.value = "Documents mis à jour avec succès.";
  } catch (e: any) {
    errorMessageFile.value = e;
  }
};

// const updateadminStore.fetchedDeliveryAgentRequestStatus = async () => {
//   errorMessage.value = "";
//   successMessage.value = "";
//   try {
//     await adminStore.fetchedDeliveryAgentStore.validateadminStore.fetchedDeliveryAgentRequest();
//     successMessage.value = "Demande d'inscription validée avec succès.";
//     // Refetch adminStore.fetchedDeliveryAgent data to update the UI
//     adminStore.fetchedDeliveryAgent.value = await adminStore.fetchedDeliveryAgentStore.getadminStore.fetchedDeliveryAgentById(
//       adminStore.fetchedDeliveryAgent.value.id
//     );
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour du statut :", error);
//     errorMessage.value = "Erreur lors de la validation de la demande.";
//   }
// };

// const rejectadminStore.fetchedDeliveryAgentRequest = async () => {
//   errorMessage.value = "";
//   successMessage.value = "";
//   try {
//     await adminStore.fetchedDeliveryAgentStore.rejectadminStore.fetchedDeliveryAgentRequest();
//     successMessage.value = "Demande d'inscription rejetée avec succès.";
//     // Refetch adminStore.fetchedDeliveryAgent data to update the UI
//     adminStore.fetchedDeliveryAgent.value = await adminStore.fetchedDeliveryAgentStore.getadminStore.fetchedDeliveryAgentById(
//       adminStore.fetchedDeliveryAgent.value.id
//     );
//   } catch (error) {
//     errorMessage.value = "Erreur lors du rejet de la demande.";
//     console.error("Erreur lors de la mise à jour du statut :", error);
//   }
// };
</script>

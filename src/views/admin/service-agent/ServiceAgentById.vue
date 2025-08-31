<template>
  <div>
    <div class="flex justify-between items-start px-4 sm:px-0">
      <div>
        <h3 class="text-base/7 font-semibold text-gray-900">
          Profil prestataire
        </h3>
      </div>
      <div v-if="adminStore.fetchedServiceAgent.user" class="ml-4">
        <span class="text-sm text-gray-700">
          Status :
          <template v-if="adminStore.fetchedServiceAgent.user.is_validated">
            Validé
          </template>
          <template
            v-else-if="
              !adminStore.fetchedServiceAgent.user.is_active &&
              !adminStore.fetchedServiceAgent.user.is_validated
            "
          >
            Refusé
          </template>
          <template v-else> En attente</template>
        </span>
      </div>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Nom complet</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ adminStore.fetchedServiceAgent.first_name }}
            {{ adminStore.fetchedServiceAgent.last_name }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Coordonnées</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div v-if="adminStore.fetchedServiceAgent.user?.email">
              {{ adminStore.fetchedServiceAgent.user.email }}
            </div>
            <div>{{ adminStore.fetchedServiceAgent.phone_number }}</div>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Entreprise</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div>
              <span>Siret : </span>{{ adminStore.fetchedServiceAgent.siret }}
            </div>
            <div>
              <span>Nom : </span
              >{{ adminStore.fetchedServiceAgent.company_name }}
            </div>
            <div>
              <span>Adresse : </span>
              {{ adminStore.fetchedServiceAgent.company_address }},
              {{ adminStore.fetchedServiceAgent.company_city }}
            </div>
          </dd>
        </div>
        <div
          v-if="adminStore.fetchedServiceAgent.certifications"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm/6 font-medium text-gray-900">Certifications</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ adminStore.fetchedServiceAgent.certifications }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">
            Informations financières
          </dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div>
              <span>Gains mensuels : </span
              >{{ adminStore.fetchedServiceAgent.monthly_earnings }}€
            </div>
            <div v-if="adminStore.fetchedServiceAgent.last_invoice_date">
              <span>Dernière facture : </span>
              {{
                new Date(
                  adminStore.fetchedServiceAgent.last_invoice_date
                ).toLocaleDateString("fr-FR")
              }}
            </div>
          </dd>
        </div>

        <!-- Section Prestations du service agent -->
        <div
          v-if="adminStore.fetchedServiceAgent.serviceAgentPrestations?.length"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm/6 font-medium text-gray-900">Prestations</dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              class="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              <li
                v-for="sap in adminStore.fetchedServiceAgent
                  .serviceAgentPrestations"
                :key="sap.id"
                class="grid grid-cols-4 gap-4 items-center py-4 pr-5 pl-4 text-sm/6"
              >
                <div class="flex w-0 flex-1 items-center">
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <span class="font-medium">{{
                      sap.prestation?.label || "N/A"
                    }}</span>
                    <span class="text-xs text-gray-500"
                      >({{ sap.prestation?.category }})</span
                    >
                  </div>
                </div>
                <label>
                  Prix demandé :
                  <span class="font-medium">{{ sap.requested_price }}€</span>
                </label>
                <label>
                  Prix appliqué :
                  <input
                    v-model="getEditedPrestation(sap.id).applied_price"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
                    :placeholder="sap.applied_price?.toString() || '0'"
                  />
                </label>
                <label>
                  Statut prix :
                  <Select
                    :options="priceStatusOptions"
                    v-model="getEditedPrestation(sap.id).price_status"
                  />
                </label>
                <label>
                  Disponibilité :
                  <Select
                    :options="availabilityOptions"
                    v-model="getEditedPrestation(sap.id).is_available"
                  />
                </label>
                <div
                  v-if="sap.ecodeli_comment"
                  class="col-span-4 text-xs text-gray-600 mt-1"
                >
                  Commentaire EcoDeli: {{ sap.ecodeli_comment }}
                </div>
              </li>
            </ul>
            <div class="mt-1 flex justify-end">
              <Button
                isBlue
                :disabled="!isPrestationsChanged"
                @click="
                  updateServiceAgentPrestations(
                    adminStore.fetchedServiceAgent.id,
                    editedPrestations
                  )
                "
              >
                Enregistrer prestations
              </Button>
            </div>
            <div v-if="!!successMessagePrestations">
              <Alert isSuccess>{{ successMessagePrestations }}</Alert>
            </div>
            <div v-if="!!errorMessagePrestations">
              <Alert isError>{{ errorMessagePrestations }}</Alert>
            </div>
          </dd>
        </div>

        <!-- Section Gestion globale des prestations -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">
            Gestion des prestations
          </dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <!-- Ajouter une nouvelle prestation -->
            <div class="mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
              <h4 class="text-sm font-medium text-gray-900 mb-2">
                Ajouter une prestation
              </h4>
              <div class="grid grid-cols-3 gap-2">
                <select
                  v-model="newPrestation.prestationId"
                  class="px-2 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Choisir...</option>
                  <option
                    v-for="prestation in availablePrestations"
                    :key="prestation.id"
                    :value="prestation.id"
                  >
                    {{ prestation.label }} ({{ prestation.ecodeli_price }}€)
                  </option>
                </select>
                <input
                  v-model="newPrestation.requested_price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Prix demandé"
                  class="px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
                <Button
                  isGreen
                  @click="addNewPrestation"
                  :disabled="
                    !newPrestation.prestationId ||
                    !newPrestation.requested_price
                  "
                  class="text-xs px-2 py-1"
                >
                  Ajouter
                </Button>
              </div>
            </div>

            <!-- Liste des prestations globales -->
            <div v-if="availablePrestations?.length">
              <h4 class="text-sm font-medium text-gray-900 mb-2">
                Toutes les prestations
              </h4>
              <ul
                role="list"
                class="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li
                  v-for="prestation in availablePrestations"
                  :key="prestation.id"
                  class="grid grid-cols-4 gap-4 items-center py-3 pr-4 pl-4 text-sm/6"
                >
                  <div class="flex w-0 flex-1 items-center">
                    <span>{{ prestation.name }}</span>
                  </div>
                  <span>{{ prestation.base_price }}€</span>
                  <span
                    :class="
                      prestation.is_active ? 'text-green-600' : 'text-red-600'
                    "
                  >
                    {{ prestation.is_active ? "Active" : "Inactive" }}
                  </span>
                  <Button
                    :isGreen="!prestation.is_active"
                    :isRed="prestation.is_active"
                    @click="
                      togglePrestationStatus(
                        prestation.id,
                        !prestation.is_active
                      )
                    "
                    class="text-xs px-2 py-1"
                  >
                    {{ prestation.is_active ? "Désactiver" : "Activer" }}
                  </Button>
                </li>
              </ul>
            </div>

            <div v-if="!!successMessageGlobal">
              <Alert isSuccess>{{ successMessageGlobal }}</Alert>
            </div>
            <div v-if="!!errorMessageGlobal">
              <Alert isError>{{ errorMessageGlobal }}</Alert>
            </div>
          </dd>
        </div>

        <div
          v-if="adminStore.fetchedServiceAgent.files?.length"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm/6 font-medium text-gray-900">Documents</dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              class="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              <li
                v-for="doc in adminStore.fetchedServiceAgent.files"
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
                :disabled="!isDocsChanged"
                @click="
                  updateUserFiles(adminStore.fetchedServiceAgent.id, editedDocs)
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
    <div
      v-if="
        (adminStore.fetchedServiceAgent.user &&
          adminStore.fetchedServiceAgent.user.is_validated &&
          adminStore.fetchedServiceAgent.user.is_active) ||
        (adminStore.fetchedServiceAgent.user &&
          !adminStore.fetchedServiceAgent.user.is_validated &&
          adminStore.fetchedServiceAgent.user.is_active)
      "
      class="flex gap-2"
    >
      <Button
        isGreen
        class="w-full"
        @click="acceptUserRequest(adminStore.fetchedServiceAgent.user.id)"
        :disabled="
          adminStore.fetchedServiceAgent.files?.some(
            (doc) => doc.status === Status.PENDING
          )
        "
        >Valider</Button
      >
      <Button
        isRed
        class="w-full"
        @click="rejectUserRequest(adminStore.fetchedServiceAgent.user.id)"
        :disabled="
          !adminStore.fetchedServiceAgent.user.is_validated &&
          !adminStore.fetchedServiceAgent.user.is_active
        "
        >Refuser</Button
      >
    </div>
    <div v-if="!!successMessage">
      <Alert isSuccess>{{ successMessage }}</Alert>
    </div>
    <div v-if="!!errorMessage">
      <Alert isError>{{ errorMessage }}</Alert>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PaperClipIcon } from "@heroicons/vue/20/solid";
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { Status } from "@/types/status";
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
  console.log('Service Agent ID:', id); // Ajoutez ce log pour debug
  await adminStore.fetchServiceAgentById(+id);
  await adminStore.fetchPrestations();
  initializeEditedDocs();
  initializeEditedPrestations();
});

const initializeEditedDocs = () => {
  if (adminStore.fetchedServiceAgent.files) {
    editedDocs.value = adminStore.fetchedServiceAgent.files.map((doc) => ({
      id: doc.id,
      status: doc.status as Status,
      validityDate: doc.validity ? new Date(doc.validity) : null,
      type: doc.document_type as DocumentType,
    }));
  }
};

const initializeEditedPrestations = () => {
  if (adminStore.fetchedServiceAgent.serviceAgentPrestations) {

    editedPrestations.value = adminStore.fetchedServiceAgent.serviceAgentPrestations.map((sap) => ({
      id: sap.id,
      applied_price: sap.applied_price || 0,
      is_available: sap.is_available !== undefined ? sap.is_available : true,
      price_status: sap.price_status || "PENDING",
      ecodeli_comment: sap.ecodeli_comment || "",
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

const getEditedPrestation = (sapId: number) => {
  let prestation = editedPrestations.value.find((p) => p.id === sapId);
  if (!prestation) {
    prestation = {
      id: sapId,
      applied_price: 0,
      is_available: true,
      price_status: "PENDING",
      ecodeli_comment: "",
    };
    editedPrestations.value.push(prestation);
  }
  return prestation;
};

const editedDocs = ref<
  {
    id: number;
    status: Status;
    validityDate: Date | null;
    type: DocumentType;
  }[]
>([]);

const editedPrestations = ref<
  {
    id: number;
    applied_price: number;
    is_available: boolean;
    price_status: string;
    ecodeli_comment: string;
  }[]
>([]);

const newPrestation = ref({
  prestationId: "",
  requested_price: 0,
});

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

const prestationStatusOptions = [
  { label: "En attente", value: "PENDING" },
  { label: "Accepté", value: "ACCEPTED" },
  { label: "Refusé", value: "REJECTED" },
];

const availabilityOptions = [
  { label: "Disponible", value: true },
  { label: "Non disponible", value: false },
];

const priceStatusOptions = [
  { label: "En attente", value: "PENDING" },
  { label: "Accepté", value: "ACCEPTED" },
  { label: "Refusé", value: "REJECTED" },
];

const availablePrestations = computed(() => {
  return adminStore.prestations || [];
});

const isDocsChanged = computed(() => {
  const files = adminStore.fetchedServiceAgent.files || [];
  if (files.length !== editedDocs.value.length) return true;
  return editedDocs.value.some((editedDoc) => {
    const original = files.find((f) => f.id === editedDoc.id);
    if (!original) return true;
    const originalValidity = original.validity
      ? new Date(original.validity).getTime()
      : null;
    const editedValidity = editedDoc.validityDate
      ? editedDoc.validityDate.getTime()
      : null;
    return (
      editedDoc.status !== original.status ||
      editedDoc.type !== original.document_type ||
      originalValidity !== editedValidity
    );
  });
});

const isPrestationsChanged = computed(() => {
  const prestations =
    adminStore.fetchedServiceAgent.serviceAgentPrestations || [];
  if (prestations.length !== editedPrestations.value.length) return true;
  return editedPrestations.value.some((edited) => {
    const original = prestations.find((p) => p.id === edited.id);
    if (!original) return true;
    return (
      edited.applied_price !== (original.applied_price || 0) ||
      edited.is_available !==
        (original.is_available !== undefined ? original.is_available : true) ||
      edited.price_status !== (original.price_status || "PENDING")
    );
  });
});

const downloadFile = async (filePath: string) => {
  try {
    const response = await userStore.getFileDownloadUrl(filePath);
    if (response && response.downloadUrl) {
      window.open(response.downloadUrl, "_blank");
    } else if (typeof response === "string") {
      window.open(response, "_blank");
    } else {
      console.error("Invalid download URL response:", response);
    }
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const successMessage = ref("");
const errorMessage = ref("");
const successMessageFile = ref("");
const errorMessageFile = ref("");
const successMessagePrestations = ref("");
const errorMessagePrestations = ref("");
const successMessageGlobal = ref("");
const errorMessageGlobal = ref("");

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

const updateServiceAgentPrestations = async (
  id: number,
  prestations: { id: number; applied_price: number; is_active: boolean }[]
) => {
  errorMessagePrestations.value = "";
  successMessagePrestations.value = "";
  try {
    await adminStore.updateServiceAgentPrestations(id, prestations);
    successMessagePrestations.value = "Prestations mises à jour avec succès.";
    await adminStore.fetchServiceAgentById(+route.params.id);
    initializeEditedPrestations();
  } catch (e: any) {
    errorMessagePrestations.value = e;
  }
};

const addNewPrestation = async () => {
  errorMessageGlobal.value = "";
  successMessageGlobal.value = "";
  try {
    await adminStore.addServiceAgentPrestation(
      adminStore.fetchedServiceAgent.id,
      {
        prestationId: +newPrestation.value.prestationId,
        requested_price: newPrestation.value.requested_price,
        applied_price: 0,
      }
    );
    successMessageGlobal.value = "Prestation ajoutée avec succès.";
    newPrestation.value = { prestationId: "", requested_price: 0 };
    await adminStore.fetchServiceAgentById(+route.params.id);
    initializeEditedPrestations();
  } catch (e: any) {
    errorMessageGlobal.value = e;
  }
};

const togglePrestationStatus = async (
  prestationId: number,
  isActive: boolean
) => {
  errorMessageGlobal.value = "";
  successMessageGlobal.value = "";
  try {
    await adminStore.updatePrestationStatus(prestationId, isActive);
    successMessageGlobal.value = `Prestation ${isActive ? "activée" : "désactivée"} avec succès.`;
    await adminStore.fetchPrestations();
  } catch (e: any) {
    errorMessageGlobal.value = e;
  }
};

const acceptUserRequest = async (id: number) => {
  errorMessage.value = "";
  successMessage.value = "";
  try {
    await adminStore.acceptUserRequest(id);
    await adminStore.fetchServiceAgentById(+route.params.id);
    successMessage.value = "Demande d'inscription validée avec succès.";
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
    errorMessage.value = "Erreur lors de la validation de la demande.";
  }
};

const rejectUserRequest = async (id: number) => {
  errorMessage.value = "";
  successMessage.value = "";
  try {
    await adminStore.rejectUserRequest(id);
    await adminStore.fetchServiceAgentById(+route.params.id);
    successMessage.value = "Demande d'inscription rejetée avec succès.";
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
    errorMessage.value = "Erreur lors de la validation de la demande.";
  }
};
</script>

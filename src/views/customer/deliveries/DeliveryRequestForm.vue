<template>
  <div class="mx-auto">
    <div class="bg-primary-500 text-white p-6 rounded-t-xl">
      <h2 class="text-3xl font-bold flex items-center">
        <svg
          class="w-8 h-8 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          ></path>
        </svg>
        Nouvelle demande de livraison
      </h2>
      <p class="mt-2 text-primary-100">
        Remplissez le formulaire pour créer votre annonce de livraison
      </p>
    </div>

    <form
      @submit.prevent="submitRequest"
      class="bg-white shadow-xl rounded-b-xl p-8"
    >
      <!-- Type et informations générales -->
      <div class="bg-white -mx-8 -mt-8 px-8 py-6 mb-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span
            class="bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3"
            >1</span
          >
          Informations générales
        </h3>

        <InputField
          v-model="form.title"
          name="title"
          label="Titre de l'annonce *"
          placeholder="Ex: Livraison colis fragile Paris-Lyon"
          required
        />

        <div class="mt-4">
          <TextareaField
            v-model="form.description"
            label="Description détaillée"
            placeholder="Décrivez votre demande de livraison en détail..."
            required
          />
        </div>
      </div>

      <!-- Trajets et dates -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span
            class="bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3"
            >2</span
          >
          Trajet et planning
        </h3>

        <div class="grid md:grid-cols-2 gap-6">
          <InputField
            v-model="form.departureCity"
            name="departureCity"
            label="Ville de départ *"
            placeholder="Ex: Paris"
            required
          />

          <InputField
            v-model="form.arrivalCity"
            name="arrivalCity"
            label="Ville d'arrivée *"
            placeholder="Ex: Lyon"
            required
          />

          <InputField
            v-model="form.pickupDate"
            name="pickupDate"
            label="Date et heure de récupération *"
            type="datetime-local"
            required
          />

          <InputField
            v-model="form.deliveryDate"
            name="deliveryDate"
            label="Date et heure de livraison souhaitée *"
            type="datetime-local"
            required
          />
        </div>

        <div class="mt-4">
          <TextareaField
            v-model="form.pickupInstructions"
            label="Instructions de récupération"
            placeholder="Ex: Code d'accès, étage, instructions spéciales..."
          />
        </div>
      </div>

      <!-- Prix et options -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span
            class="bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3"
            >3</span
          >
          Tarification et options
        </h3>

        <div class="grid md:grid-cols-3 gap-6">
          <InputField
            v-model.number="form.price"
            name="price"
            label="Prix proposé (€) *"
            type="number"
            min="0"
            step="0.01"
            required
            placeholder="0.00"
          />

          <div class="md:col-span-2 flex items-end">
            <div
              class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex-1"
            >
              <div class="flex items-center space-x-6">
                <label
                  class="flex items-center cursor-pointer hover:bg-yellow-100 rounded p-2 transition"
                >
                  <input
                    type="checkbox"
                    v-model="form.assurance"
                    class="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span class="ml-2 flex items-center">
                    <svg
                      class="w-5 h-5 mr-1 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    Assurance (jusqu'à 3000€)
                  </span>
                </label>

                <label
                  class="flex items-center cursor-pointer hover:bg-yellow-100 rounded p-2 transition"
                >
                  <input
                    type="checkbox"
                    v-model="form.urgent"
                    class="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                  />
                  <span class="ml-2 flex items-center">
                    <svg
                      class="w-5 h-5 mr-1 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    Livraison urgente
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Objets à livrer -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span
            class="bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3"
            >4</span
          >
          Détails des colis
        </h3>

        <div
          v-if="form.objects.length === 0"
          class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
        >
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            ></path>
          </svg>
          <p class="mt-2 text-gray-600">Aucun colis ajouté</p>
          <button
            type="button"
            @click="addObject"
            class="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center mx-auto"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Ajouter un colis
          </button>
        </div>

        <div v-else>
          <div
            v-for="(object, index) in form.objects"
            :key="index"
            class="bg-white border-2 border-gray-200 rounded-lg p-5 mb-4 hover:border-primary-400 transition"
          >
            <div class="flex justify-between items-start mb-4">
              <h4 class="font-semibold text-gray-700">
                Colis #{{ index + 1 }}
              </h4>
              <button
                type="button"
                class="text-red-500 hover:text-red-700 transition"
                @click="removeObject(index)"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <InputField
                v-model="object.label"
                :name="`object-label-${index}`"
                label="Nom de l'objet *"
                placeholder="Ex: Carton de livres"
                required
              />

              <InputField
                v-model.number="object.weight"
                :name="`object-weight-${index}`"
                label="Poids (kg) *"
                type="number"
                step="0.1"
                min="0"
                placeholder="0.0"
                required
              />

              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1"
                  >Dimensions (cm)</label
                >
                <div class="grid grid-cols-3 gap-2">
                  <InputField
                    v-model.number="object.length"
                    :name="`object-length-${index}`"
                    label=""
                    placeholder="L"
                    type="number"
                    min="0"
                  />
                  <InputField
                    v-model.number="object.width"
                    :name="`object-width-${index}`"
                    label=""
                    placeholder="l"
                    type="number"
                    min="0"
                  />
                  <InputField
                    v-model.number="object.height"
                    :name="`object-height-${index}`"
                    label=""
                    placeholder="H"
                    type="number"
                    min="0"
                  />
                </div>
              </div>

              <InputField
                v-model.number="object.value"
                :name="`object-value-${index}`"
                label="Valeur déclarée (€)"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
            <InputField
              v-model.number="object.quantity"
              :name="`object-quantity-${index}`"
              label="Quantité *"
              type="number"
              min="1"
              placeholder="1"
              required
            />

            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1"
                >Photo</label
              >
              <DropUploadFile
                :files="getFilesForDocument(index)"
                :multiple="false"
                @upload="handleFileUpload($event, index)"
                @delete="handleFileDelete($event, index)"
              />
            </div>

            <div class="mt-4">
              <label
                class="flex items-center cursor-pointer hover:bg-gray-50 rounded p-2 transition"
              >
                <input
                  type="checkbox"
                  v-model="object.fragile"
                  class="w-5 h-5 text-red-600 rounded focus:ring-red-500 mr-2"
                />
                <span class="flex items-center">
                  <svg
                    class="w-5 h-5 mr-1 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                  Colis fragile - à manipuler avec précaution
                </span>
              </label>
            </div>
          </div>

          <button
            type="button"
            @click="addObject"
            class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-primary-400 hover:text-primary-600 transition flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Ajouter un autre colis
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-between items-center pt-6 border-t">
        <button
          type="button"
          @click="resetForm"
          class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Annuler
        </button>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition font-semibold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            v-if="!isSubmitting"
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
          <svg
            v-else
            class="animate-spin h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ isSubmitting ? "Envoi en cours..." : "Publier l'annonce" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAnnouncementStore } from "@/stores/announcement.store";
import { AnnouncementPackageRequest } from "@/types/announcement";
import { ref } from "vue";
import InputField from "@/components/formControls/InputField.vue";
import TextareaField from "@/components/formControls/TextareaField.vue";
import DropUploadFile from "@/components/formControls/DropUploadFile.vue";

const store = useAnnouncementStore();

const form = ref<AnnouncementPackageRequest>({
  title: "",
  description: "",
  departureCity: "",
  arrivalCity: "",
  pickupDate: new Date(),
  deliveryDate: new Date(),
  pickupInstructions: "",
  price: 0,
  assurance: false,
  urgent: false,
  objects: [],
});

const isSubmitting = ref(false);

const addObject = () => {
  form.value.objects.push({
    label: "",
    weight: 0,
    quantity: 1,
    length: 0,
    width: 0,
    height: 0,
    value: 0,
    photo: null,
    fragile: false,
  });
};

const removeObject = (index: number) => {
  form.value.objects.splice(index, 1);
};

const getFilesForDocument = (key: number): File[] => {
  return form.value.objects[key].photo ? [form.value.objects[key].photo] : [];
};

const handleFileUpload = (file: File, key: number) => {
  form.value.objects[key].photo = file;
};

const handleFileDelete = (fileName: string, key: number) => {
  if (form.value.objects[key].photo) {
    form.value.objects[key].photo = null;
  }
};

const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    departureCity: "",
    arrivalCity: "",
    pickupDate: new Date(),
    deliveryDate: new Date(),
    pickupInstructions: "",
    price: 0,
    assurance: false,
    urgent: false,
    objects: [],
  };
};

const submitRequest = async () => {
  if (form.value.objects.length === 0) {
    alert("Veuillez ajouter au moins un colis à livrer.");
    return;
  }

  isSubmitting.value = true;
  console.log("Submitting form data:", form.value);

  try {
    await store.createAnnouncementRequest(form.value);
    alert("Votre annonce a été publiée avec succès !");
    //resetForm();
  } catch (error) {
    alert("Erreur lors de la publication de l'annonce. Veuillez réessayer.");
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
input[type="checkbox"] {
  border-radius: 0.25rem;
  border: 2px solid #d1d5db;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

input[type="file"] {
  font-size: 0.875rem;
}

input[type="file"]::file-selector-button {
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 9999px;
  background-color: rgba(34, 197, 94, 0.1);
  color: rgb(21, 128, 61);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

input[type="file"]::file-selector-button:hover {
  background-color: rgba(34, 197, 94, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

form > div {
  animation: fadeIn 0.3s ease-out;
}
</style>

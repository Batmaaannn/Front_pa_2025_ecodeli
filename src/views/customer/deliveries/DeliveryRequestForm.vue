<template>
  <div class="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-xl mt-10">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Nouvelle demande de livraison</h2>

    <form @submit.prevent="submitRequest" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Adresse de départ</label>
        <input v-model="form.start_city" type="text" required class="form-input" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Adresse d’arrivée</label>
        <input v-model="form.arrival_city" type="text" required class="form-input" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
          <input v-model="form.start_date" type="datetime-local" required class="form-input" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date d’arrivée</label>
          <input v-model="form.end_date" type="datetime-local" required class="form-input" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
        <input v-model.number="form.price" type="number" min="0" step="0.01" required class="form-input" />
      </div>

      <div class="flex items-center space-x-6">
        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="form.assurance" />
          <span>Assurance</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="form.urgent" />
          <span>Urgent</span>
        </label>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">Objets à livrer</h3>
        <div
            v-for="(object, index) in form.objects"
            :key="index"
            class="border border-gray-200 p-4 mb-4 rounded-md"
        >
          <div class="grid grid-cols-2 gap-4 mb-2">
            <input
                v-model="object.label"
                type="text"
                placeholder="Nom de l'objet"
                class="form-input"
                required
            />
            <input
                v-model.number="object.poids"
                type="number"
                placeholder="Poids (kg)"
                class="form-input"
                required
            />
          </div>
          <div class="grid grid-cols-2 gap-4 mb-2">
            <input
                v-model.number="object.quantity"
                type="number"
                placeholder="Quantité"
                class="form-input"
                required
                min="1"
            />
            <input
                type="file"
                accept="image/*"
                @change="handleFileUpload($event, index)"
                class="form-input"
            />
          </div>
          <textarea
              v-model="object.additional_info"
              rows="2"
              placeholder="Infos supplémentaires"
              class="form-input w-full"
          ></textarea>

          <button type="button" class="text-red-600 text-sm mt-2" @click="removeObject(index)">
            Supprimer
          </button>
        </div>

        <button type="button" @click="addObject" class="text-blue-600 text-sm">+ Ajouter un objet</button>
      </div>

      <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Envoyer la demande
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useDeliveryStore } from "@/stores/delivery-request.store";

interface DeliveryObject {
  label: string;
  poids: number;
  quantity: number;
  photo?: File | null;
  additional_info?: string;
}

interface DeliveryRequest {
  start_city: string;
  arrival_city: string;
  start_date: string;
  end_date: string;
  price: number;
  assurance: boolean;
  urgent: boolean;
  objects: DeliveryObject[];
}

export default {
  setup() {
    const store = useDeliveryStore();

    const form = ref<DeliveryRequest>({
      start_city: "",
      arrival_city: "",
      start_date: "",
      end_date: "",
      price: 0,
      assurance: false,
      urgent: false,
      objects: [],
    });

    const addObject = () => {
      form.value.objects.push({
        label: "",
        poids: 0,
        quantity: 1,
        photo: null,
        additional_info: "",
      });
    };

    const removeObject = (index: number) => {
      form.value.objects.splice(index, 1);
    };

    const handleFileUpload = (event: Event, index: number) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0] || null;
      form.value.objects[index].photo = file;
    };

    const submitRequest = async () => {
      if (form.value.objects.length === 0) {
        alert("Veuillez ajouter au moins un objet à livrer.");
        return;
      }

      const formData = new FormData();

      formData.append("start_city", form.value.start_city);
      formData.append("arrival_city", form.value.arrival_city);
      formData.append("start_date", new Date(form.value.start_date).toISOString());
      formData.append("end_date", new Date(form.value.end_date).toISOString());
      formData.append("price", form.value.price.toString());
      formData.append("assurance", form.value.assurance.toString());
      formData.append("urgent", form.value.urgent.toString());

      const objectsWithoutPhotos = form.value.objects.map((obj) => ({
        label: obj.label,
        poids: obj.poids,
        quantity: obj.quantity,
        additional_info: obj.additional_info || "",
      }));

      formData.append("objects", JSON.stringify(objectsWithoutPhotos));

      form.value.objects.forEach((obj) => {
        if (obj.photo) {
          formData.append("photos", obj.photo, obj.photo.name);
        }
      });

      try {
        await store.createDeliveryRequest(formData);
        alert("Demande envoyée !");
        form.value = {
          start_city: "",
          arrival_city: "",
          start_date: "",
          end_date: "",
          price: 0,
          assurance: false,
          urgent: false,
          objects: [],
        };
      } catch (error) {
        alert("Erreur lors de l'envoi de la demande.");
        console.error(error);
      }
    };

    return {
      form,
      addObject,
      removeObject,
      submitRequest,
      handleFileUpload,
    };
  },
};
</script>

<style scoped>
.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
}
.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
}
</style>

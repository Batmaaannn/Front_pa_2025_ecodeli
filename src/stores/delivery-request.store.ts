import { axios } from "@/libs/axios";
import { defineStore } from "pinia";

export const useDeliveryStore = defineStore("deliveryRequest", {
  state: () => ({}),
  actions: {
    async createDeliveryRequest(formData: FormData) {
      console.log("Creating delivery request with data:", formData);
      try {
        const response = await axios.post(
          "/delivery-requests/with-upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la création de la demande :", error);
        throw error;
      }
    },
  },
});

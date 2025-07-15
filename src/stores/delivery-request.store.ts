import { defineStore } from "pinia";
import axios from "axios";

export const useDeliveryStore = defineStore("deliveryRequest", {
    state: () => ({}),
    actions: {
        async createDeliveryRequest(formData: FormData) {
            try {
                const response = await axios.post("/api/delivery-requests/with-upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                return response.data;
            } catch (error) {
                console.error("Erreur lors de la création de la demande :", error);
                throw error;
            }
        },
    },
});

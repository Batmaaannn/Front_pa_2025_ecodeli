import { defineStore } from "pinia";
import { axios } from "@/libs/axios";

interface DeliveryState {
  postedDeliveries: any[];
}

export const useDeliveryStore = defineStore("deliveryStore", {
  state: (): DeliveryState => ({
    postedDeliveries: [],
  }),
  getters: {},
  actions: {
    async fetchPostedDeliveries() {
      try {
        const data = (await axios.get("/deliveries/posted")).data;
        this.postedDeliveries = data;
        return data;
      } catch (error) {
        console.error("Erreur lors de la récupération des livraisons :", error);
        throw error;
      }
    },
  },
});

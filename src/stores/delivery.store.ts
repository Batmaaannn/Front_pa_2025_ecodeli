import { defineStore } from "pinia";
import { axios } from "@/libs/axios";

interface DeliveryState {
  postedDeliveries: any[];
  trips: any[];
  delivery: any;
}

export const useDeliveryStore = defineStore("deliveryStore", {
  state: (): DeliveryState => ({
    postedDeliveries: [],
    trips: [],
    delivery: {},
  }),
  getters: {},
  actions: {
    async fetchDelivery(id: number) {
      try {
        return (this.delivery = (
          await axios.get(`/deliveries/details/${id}`)
        ).data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la livraison :",
          error
        );
        throw error;
      }
    },
    async fetchPostedDeliveries(params: any) {
      try {
        this.postedDeliveries = (
          await axios.get("/deliveries", {
            params,
          })
        ).data;
      } catch (error) {
        console.error("Erreur lors de la récupération des livraisons :", error);
        throw error;
      }
    },
    async fetchFutureTrips() {
      try {
        return (this.trips = (await axios.get("/deliveries/trips")).data);
      } catch (error) {
        console.error("Erreur lors de la récupération des livraisons :", error);
        throw error;
      }
    },
    async createRoute(data: any) {
      try {
        return (await axios.post("/deliveries/route", data)).data;
      } catch (error) {
        throw error;
      }
    },
    async deleteRoute(id: number) {
      try {
        return (await axios.delete(`/deliveries/route/${id}`)).data;
      } catch (error) {
        throw error;
      }
    },
  },
});

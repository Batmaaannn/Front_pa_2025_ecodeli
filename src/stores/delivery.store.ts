import { defineStore } from "pinia";
import { axios } from "@/libs/axios";
import { DeliveryStatus } from "@/types/delivery";

interface DeliveryState {
  deliveries: any[];
  trips: any[];
  delivery: any;
}

export const useDeliveryStore = defineStore("deliveryStore", {
  state: (): DeliveryState => ({
    deliveries: [],
    trips: [],
    delivery: {},
  }),
  getters: {
    getCountDeliveries: (state) => state.deliveries.length,
    getCountTrips: (state) => state.trips.length,
  },
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
        this.deliveries = (
          await axios.get("/deliveries", {
            params,
          })
        ).data;
      } catch (error) {
        console.error("Erreur lors de la récupération des livraisons :", error);
        throw error;
      }
    },
    async fetchPastDeliveries() {
      try {
        this.deliveries = (await axios.get("/deliveries/past")).data;
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
    async assignDeliveriesToAgent(data: any) {
      try {
        return (await axios.post("/deliveries/assign", data)).data;
      } catch (error) {
        console.error("Erreur lors de l'attribution des livraisons :", error);
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
    async updateDeliveryStatus(deliveryId: number): Promise<void> {
      try {
        return (await axios.patch(`/deliveries/status/${deliveryId}`)).data;
      } catch (error) {
        throw error;
      }
    },
    async fetchStat() {
      try {
        return (await axios.get("/deliveries/dashboard/stats")).data;
      } catch (error) {
        throw error;
      }
    },
    async fetchRecentReviews() {
      try {
        return (await axios.get("/deliveries/dashboard/reviews")).data;
      } catch (error) {
        throw error;
      }
    },
    async fetchActiveDeliveries() {
      try {
        return (this.deliveries = (await axios.get("/deliveries/active")).data);
      } catch (error) {
        throw error;
      }
    },
  },
});

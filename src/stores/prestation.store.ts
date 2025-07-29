import { axios } from "@/libs/axios";
import type { Prestation } from "@/types/prestation";
import { defineStore } from "pinia";

interface PrestationState {
  prestations: Prestation[];
}

export const usePrestationStore = defineStore("prestationStore", {
  state: (): PrestationState => ({
    prestations: [],
  }),
  getters: {},
  actions: {
    async getPrestations() {
      try {
        return this.prestations = (await axios.get<Prestation[]>("/prestations")).data;
      } catch (error) {
        console.log("Error fetching prestations:", error);
      }
    },
  },
});

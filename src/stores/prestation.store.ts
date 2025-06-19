import { axios } from "@/libs/axios";
import { defineStore } from "pinia";

interface PrestationState {}

export const usePrestationStore = defineStore("prestationStore", {
  state: (): PrestationState => ({}),
  getters: {},
  actions: {},
});

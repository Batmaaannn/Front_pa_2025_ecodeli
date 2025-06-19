import { axios } from "@/libs/axios";
import { defineStore } from "pinia";

interface ReviewState {}

export const useReviewStore = defineStore("reviewStore", {
  state: (): ReviewState => ({}),
  getters: {},
  actions: {},
});

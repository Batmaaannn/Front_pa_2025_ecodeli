import { axios } from "@/libs/axios";
import { defineStore } from "pinia";

interface UserState {}

export const useUserStore = defineStore("userStore", {
  state: (): UserState => ({}),
  getters: {},
  actions: {},
});

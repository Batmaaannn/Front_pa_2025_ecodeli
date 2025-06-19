import { axios } from "@/libs/axios";
import { defineStore } from "pinia";

interface AppointmentState {}

export const useAppointmentStore = defineStore("appointmentStore", {
  state: (): AppointmentState => ({}),
  getters: {},
  actions: {},
});

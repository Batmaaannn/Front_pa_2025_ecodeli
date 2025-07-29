import { axios } from "@/libs/axios";
import {
  FormUpdateFileStatutRegistration,
  RegistrationRequestWithFiles,
} from "@/types/file";
import { RegistrationRequest } from "@/types/registration";
import { defineStore } from "pinia";

interface RegistrationState {
  registrationRequests: RegistrationRequest[];
  registrationRequest: RegistrationRequestWithFiles;
}

export const useRegistrationStore = defineStore("registrationStore", {
  state: (): RegistrationState => ({
    registrationRequests: [],
    registrationRequest: {} as RegistrationRequestWithFiles,
  }),
  getters: {},
  actions: {
    async getRegistrations() {
      try {
        return (this.registrationRequests = (
          await axios.get<RegistrationRequest[]>("/registration-requests")
        ).data);
      } catch (error) {
        return error;
      }
    },
    async getRegistrationById(id: number) {
      try {
        return (this.registrationRequest = (
          await axios.get<RegistrationRequestWithFiles>(
            `/registration-requests/${id}`
          )
        ).data);
      } catch (error) {
        return error;
      }
    },
    async updateFileRegistrationRequest(
      id: number,
      data: FormUpdateFileStatutRegistration[]
    ) {
      try {
        return (await axios.patch(`/files/${id}/update-registration`, data))
          .data;
      } catch (error) {
        return error;
      }
    },
    async validateRegistrationRequest() {
      try {
        return (
          await axios.post(
            `/registration-requests/validate/${this.registrationRequest.id}/`
          )
        ).data;
      } catch (error) {
        return error;
      }
    },
    async rejectRegistrationRequest() {
      try {
        return (
          await axios.patch(
            `/registration-requests/reject/${this.registrationRequest.id}/`
          )
        ).data;
        
      } catch (error) {
        return error;
      }
    },
  },
});

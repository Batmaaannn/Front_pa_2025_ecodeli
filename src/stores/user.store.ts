import { axios, getAxiosError } from "@/libs/axios";
import { COOKIES } from "@/types/cookies";
import {
  isAdminUser,
  isCustomerUser,
  isDeliveryAgentUser,
  isMerchantUser,
  isServiceAgentUser,
} from "@/types/typeGuards";
import { User } from "@/types/user";
import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";

interface UserState {
  user: User | Record<string, never>;
}

export const useUserStore = defineStore("userStore", {
  state: (): UserState => ({
    user: {},
  }),
  getters: {
    isConnected: (state: UserState) => Object.keys(state.user).length > 0,
    isCustomer: (state: UserState) => isCustomerUser(state.user),
    isMerchant: (state: UserState) => isMerchantUser(state.user),
    isDeliveryAgent: (state: UserState) => isDeliveryAgentUser(state.user),
    isServiceAgent: (state: UserState) => isServiceAgentUser(state.user),
    isAdmin: (state: UserState) => isAdminUser(state.user),
    getDashboardUrl: (state: UserState) => {
      if (isCustomerUser(state.user)) return "/mon-espace";
      if (isMerchantUser(state.user)) return "/mon-espace-commercant";
      if (isServiceAgentUser(state.user)) return "/mon-espace-prestataire";
      if (isDeliveryAgentUser(state.user)) return "/mon-espace-livreur";
      if (isAdminUser(state.user)) return "/tableau-de-bord";
      return "/";
    },
  },
  actions: {
    async fetchUser() {
      const { cookies } = useCookies();

      if (!cookies.get(COOKIES.CONNECTION_TOKEN)) return;

      try {
        const user = (await axios.get(`/users/me`)).data;
        this.user = user;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getFileDownloadUrl(filePath: string) {
      try {
        const url = (
          await axios.get(`/files/download-file`, { params: { filePath } })
        ).data;
        return url;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async updateUser(data: Partial<User>) {
      try {
        const response = await axios.put(`/users/me`, data);
        this.user = response.data;
      } catch (error: any) {
        const { message } = getAxiosError(error);
        return Promise.reject(message);
      }
    },

    async updateDeliveryAgentProfile(data: any) {
      try {
        console.log(data);
        const url = (await axios.post(`/delivery-agents`, data)).data;
        return url;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    disconnect() {
      const { cookies } = useCookies();
      cookies.remove(COOKIES.CONNECTION_TOKEN);
      this.user = {};
    },
  },
});

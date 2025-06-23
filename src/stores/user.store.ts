import { axios } from "@/libs/axios";
import { COOKIES } from "@/types/cookies";
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
    isConnected: (state) => Object.keys(state.user).length > 0,
    // getDashboardUrl: (state) => {
    //   if (isProprietaireUser(state.user)) return "/extranet";
    //   else return "/";
    // },
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
  },
});

import { axios, getAxiosError } from "@/libs/axios";
import { type RegisterForm } from "@/types/auth";
import { InformationsForm, PrestationIdWithPrice } from "@/types/prestation";
import RegisterProfessionnal from "@/views/register/RegisterProfessionnal.vue";
import { defineStore } from "pinia";

interface AuthState {
  register: RegisterForm | Record<string, never>;
}

export const useAuthStore = defineStore("authStore", {
  state: (): AuthState => ({
    register: {},
  }),
  getters: {},
  actions: {
    setUserProfessionnalInformations(payload: InformationsForm) {
      this.register.firstName = payload.firstName;
      this.register.lastName = payload.lastName;
      this.register.email = payload.email;
      this.register.password = payload.password;
      this.register.phoneNumber = payload.phone;
      this.register.companyName = payload.companyName;
      this.register.companySiret = payload.siret;
      this.register.companyCity =
        payload.compagnyPostalCode + " " + payload.companyCity;
      this.register.companyAddress = payload.companyAddress;
    },
    setServiceAgentPrestations(payload: {
      prestationsAndPrices: PrestationIdWithPrice[];
    }) {
      this.register.prestations = payload.prestationsAndPrices;
    },
    async registerClient(client: any) {
      try {
        await axios.post("customers/create-customer", client);
      } catch (e: any) {
        const { message } = getAxiosError(e);
        if (message.match(/existing/gi))
          throw "Cet utilisateur existe déjà. Vous pouvez essayer de vous connecter sur la page connexion";
        if (message.match(/blacklisted/gi))
          throw "Impossible d'utiliser des emails jetables";

        throw "Il semble y avoir une erreur. Merci de vous rapprocher de notre service client";
      }
    },
    async RegisterProfessionnal(client: any) {
      try {
        await axios.post("customers/create-customer", client);
      } catch (e: any) {
        const { message } = getAxiosError(e);
        if (message.match(/existing/gi))
          throw "Cet utilisateur existe déjà. Vous pouvez essayer de vous connecter sur la page connexion";
        if (message.match(/blacklisted/gi))
          throw "Impossible d'utiliser des emails jetables";

        throw "Il semble y avoir une erreur. Merci de vous rapprocher de notre service client";
      }
    },

    // async login(loginForm: LoginForm) {
    //   try {
    //     const data: string = (await axios.post("/auth/sign-in", loginForm))
    //       .data;
    //     if (data) {
    //       await this.setCookie(data);
    //       const userStore = useUsersStore();
    //       await userStore.fetchUser();
    //       router.push("/");
    //     }
    //   } catch (e: any) {
    //     let message: string;
    //     message = e.response?.data.message || e.response.statusText;
    //     if (message.match(/missing/gi))
    //       this.error =
    //         "Aucun rôle n'a été trouvé pour cet utilisateur. Veuillez contacter le support.";
    //     else
    //       this.error =
    //         "Une erreur est survenue lors de la connexion. Veuillez réessayer.";
    //     router.push("/connexion");
    //     return e;
    //   }
    // },
  },
});

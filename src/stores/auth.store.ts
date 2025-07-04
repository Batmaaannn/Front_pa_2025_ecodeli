import { axios, getAxiosError } from "@/libs/axios";
import { type RegisterForm } from "@/types/auth";
import { COOKIES } from "@/types/cookies";
import { InformationsForm, PrestationIdWithPrice } from "@/types/prestation";
import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";
import { useUserStore } from "./user.store";
import { useRouter } from "vue-router";
import router from "@/router";

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
    //TODO: typer
    async registerClient(client: any) {
      console.log("Registering client:", client);
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
    //TODO: typer
    async registerProfessionnal(userType: string, client: any) {
      console.log("Registering professional:", userType);
      try {
        if (userType === "merchant") {
          console.log("Registering as merchant:");
          await axios.post("merchants/create-merchant", client);
        } else if (userType === "service_agent") {
          await axios.post("registration-requests/service-agent", client);
        } else if (userType === "delivery_agent") {
          await axios.post("registration-requests/delivery-agent", client);
        }
      } catch (e: any) {
        const { message } = getAxiosError(e);
        if (message.match(/existing/gi))
          throw "Cet utilisateur existe déjà. Vous pouvez essayer de vous connecter sur la page connexion";
        if (message.match(/blacklisted/gi))
          throw "Impossible d'utiliser des emails jetables";

        throw "Il semble y avoir une erreur. Merci de vous rapprocher de notre service client";
      }
    },
    async login(loginForm: any) {
      try {
        const data: string = (await axios.post("/auth/login", loginForm)).data;
        if (data) {
          const { cookies } = useCookies();

          cookies.set(COOKIES.CONNECTION_TOKEN, data, "30d");

          const userStore = useUserStore();
          await userStore.fetchUser();
        }
      } catch (e: any) {
        const { message } = getAxiosError(e);
        console.error("Error during login:", message);

        if (message.match(/Wrong Credentials/gi)) {
          throw "Email ou mot de passe incorrect.";
        }

        if (message.match(/E-mail not validated/gi)) {
          throw `Votre e-mail n'est pas validé. Merci de vérifier votre boîte mail.`;
        }

        throw "Il semble y avoir une erreur. Merci de vous rapprocher de notre service client.";
      }
    },
  },
});

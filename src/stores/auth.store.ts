import { axios, getAxiosError } from "@/libs/axios";
import { type RegisterForm } from "@/types/auth";
import { COOKIES } from "@/types/cookies";
import { InformationsForm, PrestationIdWithPrice } from "@/types/prestation";
import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";
import { useUserStore } from "./user.store";
import { useRouter } from "vue-router";

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
    async registerProfessionnal(client: any) {
      try {
        if (client.userType === "merchant") {
          await axios.post("customers/create-customer", client);
        } else if (client.userType === "service_agent") {
          await axios.post("service-agents/create-service-agent", client);
        } else if (client.userType === "delivery_agent") {
          await axios.post(
            "service-agents/create-service-agent-prestations",
            client
          );
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
      const router = useRouter();
      try {
        const data: string = (await axios.post("/auth/login", loginForm)).data;
        if (data) {
          const { cookies } = useCookies();

          cookies.set(COOKIES.CONNECTION_TOKEN, data, "30d");

          const userStore = useUserStore();
          await userStore.fetchUser();

          await router.push("/dashboard");
        }
      } catch (e: any) {
        const { message } = getAxiosError(e);

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

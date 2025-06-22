import { axios } from "@/libs/axios";
import { RegisterSteps, type RegisterForm } from "@/types/auth";
import { InformationsForm, PrestationIdWithPrice } from "@/types/prestation";
import type { UserType } from "@/types/user";
import { defineStore } from "pinia";

interface AuthState {
  currentRegisterStep: RegisterSteps;
  register: RegisterForm | Record<string, never>;
}

export const stepsOrder = [
  RegisterSteps.PROFIL,
  RegisterSteps.PRESTATIONS,
  RegisterSteps.INFORMATIONS,
  RegisterSteps.DOCUMENTS,
];

export const useAuthStore = defineStore("authStore", {
  state: (): AuthState => ({
    currentRegisterStep: RegisterSteps.PROFIL,
    register: {},
  }),
  getters: {
    isCompleted: (state: AuthState) => (step: RegisterSteps) => {
      return (
        stepsOrder.indexOf(step) < stepsOrder.indexOf(state.currentRegisterStep)
      );
    },
    getCurrentRegisterStep: (state: AuthState) => {
      return state.currentRegisterStep;
    },
  },
  actions: {
    initStepByUserType() {
      if (
        this.register.userType === "client" ||
        this.register.userType === "merchant"
      ) {
        this.currentRegisterStep = RegisterSteps.INFORMATIONS;
      } else if (this.register.userType === "service_agent") {
        this.currentRegisterStep = RegisterSteps.PRESTATIONS;
      } else {
        this.currentRegisterStep = RegisterSteps.PROFIL;
      }
    },
    nextStep() {
      if (
        this.register.userType === "client" ||
        this.register.userType === "merchant"
      ) {
        this.currentRegisterStep = RegisterSteps.INFORMATIONS;
      } else if (this.register.userType === "service_agent") {
        if (this.currentRegisterStep === RegisterSteps.PROFIL) {
          this.currentRegisterStep = RegisterSteps.PRESTATIONS;
        } else {
          const nextIndex = stepsOrder.indexOf(this.currentRegisterStep) + 1;
          if (nextIndex < stepsOrder.length) {
            this.currentRegisterStep = stepsOrder[nextIndex];
          }
        }
      } else {
        const nextIndex = stepsOrder.indexOf(this.currentRegisterStep) + 1;
        if (nextIndex < stepsOrder.length) {
          this.currentRegisterStep = stepsOrder[nextIndex];
        }
      }
    },
    previousStep() {
      if (
        this.register.userType === "client" ||
        this.register.userType === "merchant"
      ) {
        // Si on est sur INFORMATIONS, on revient à PROFIL
        if (this.currentRegisterStep === RegisterSteps.INFORMATIONS) {
          this.currentRegisterStep = RegisterSteps.PROFIL;
        } else {
          // sinon recul normal
          const prevIndex = stepsOrder.indexOf(this.currentRegisterStep) - 1;
          if (prevIndex >= 0) {
            this.currentRegisterStep = stepsOrder[prevIndex];
          }
        }
      } else if (this.register.userType === "service_agent") {
        // Si on est sur PRESTATIONS, on revient à PROFIL
        if (this.currentRegisterStep === RegisterSteps.PRESTATIONS) {
          this.currentRegisterStep = RegisterSteps.PROFIL;
        } else {
          // sinon recul normal
          const prevIndex = stepsOrder.indexOf(this.currentRegisterStep) - 1;
          if (prevIndex >= 0) {
            this.currentRegisterStep = stepsOrder[prevIndex];
          }
        }
      } else {
        // Cas par défaut : recul normal
        const prevIndex = stepsOrder.indexOf(this.currentRegisterStep) - 1;
        if (prevIndex >= 0) {
          this.currentRegisterStep = stepsOrder[prevIndex];
        }
      }
    },
    setUserTypeRegister(payload: { userType: string }) {
      this.register.userType = payload.userType;
    },
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
        return e;
      }
    },
    resetRegister() {
      this.currentRegisterStep = RegisterSteps.PROFIL;
      this.register = {};
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

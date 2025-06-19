import { axios } from "@/libs/axios";
import { RegisterSteps, type RegisterForm } from "@/types/auth";
import type { UserType } from "@/types/user";
import { defineStore } from "pinia";

interface AuthState {
  currentRegisterStep: RegisterSteps;
  register: RegisterForm | Record<string, never>;
}

export const stepsOrder = [RegisterSteps.PROFIL, RegisterSteps.INFORMATIONS];

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
    nextStep() {
      this.currentRegisterStep =
        stepsOrder[stepsOrder.indexOf(this.currentRegisterStep) + 1];
    },
    previousStep() {
      this.currentRegisterStep =
        stepsOrder[stepsOrder.indexOf(this.currentRegisterStep) - 1];
    },
    setUserTypeRegister(payload: { userType: string }) {
      this.register.userType = payload.userType;
    },
    setUserInformations(payload: {
      email: string;
      password: string;
      confirmPassword: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
    }) {
      this.register = { ...this.register, ...payload };
    },
    //TODO: change any
    async registerClient(client: any) {
      try {
        await axios.post("new-appointment", client);
      } catch (e: any) {
        return e;
      }
    },
    resetAppointment() {
      this.currentRegisterStep = RegisterSteps.PROFIL;
      this.register = {};
    },

    // setUserPersonnalInformations(payload: {
    //   firstName: string;
    //   lastName: string;
    //   phone: string;
    //   email: string;
    // }) {
    //   this.register = { ...payload };
    // },
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

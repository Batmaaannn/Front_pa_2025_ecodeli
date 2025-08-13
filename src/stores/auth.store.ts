import { axios, getAxiosError } from "@/libs/axios";
import {
  AddProfessionnal,
  PrescriptionUpload,
  type RegisterForm,
} from "@/types/auth";
import { COOKIES } from "@/types/cookies";
import {
  InformationsForm,
  FormPrestationIdWithPrice,
} from "@/types/prestation";
import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";
import { useUserStore } from "./user.store";
import type { Router } from "vue-router";
import { RegistrationCustomer } from "@/types/registration";

interface StepperStep {
  name: string;
  status: "complete" | "current" | "upcoming";
  pathName: string;
}

interface AuthState {
  register: RegisterForm | Record<string, never>;
  stepperSteps: StepperStep[];
  currentStepIndex: number;
  stepData: Record<string, any>;
}

export const useAuthStore = defineStore("authStore", {
  state: (): AuthState => ({
    register: {},
    stepperSteps: [],
    currentStepIndex: 0,
    stepData: {},
  }),
  getters: {
    currentStep: (state) => state.stepperSteps[state.currentStepIndex],
    canGoNext: (state) =>
      state.currentStepIndex < state.stepperSteps.length - 1,
    canGoPrevious: (state) => state.currentStepIndex > 0,
  },
  actions: {
    initializeStepper(steps: Omit<StepperStep, "status">[]) {
      this.stepperSteps = steps.map((step, index) => ({
        ...step,
        status: index === 0 ? "current" : ("upcoming" as const),
      }));
      this.currentStepIndex = 0;
    },

    updateCurrentStepByRoute(pathName: string) {
      const index = this.stepperSteps.findIndex(
        (step) => step.pathName === pathName
      );
      if (index !== -1) {
        this.currentStepIndex = index;
        this.updateStepStatuses();
      }
    },

    updateStepStatuses() {
      this.stepperSteps = this.stepperSteps.map((step, index) => ({
        ...step,
        status:
          index < this.currentStepIndex
            ? "complete"
            : index === this.currentStepIndex
              ? "current"
              : "upcoming",
      }));
    },

    goToNextStep(router: Router) {
      if (this.canGoNext) {
        this.currentStepIndex++;
        this.updateStepStatuses();
        const nextStep = this.stepperSteps[this.currentStepIndex];
        if (nextStep.pathName) {
          router.push(nextStep.pathName);
        }
      }
    },

    goToPreviousStep(router: Router) {
      if (this.canGoPrevious) {
        this.currentStepIndex--;
        this.updateStepStatuses();
        const prevStep = this.stepperSteps[this.currentStepIndex];
        if (prevStep.pathName) {
          router.push(prevStep.pathName);
        }
      }
    },

    setStepData(stepName: string, data: any) {
      this.stepData[stepName] = data;
    },

    getStepData(stepName: string) {
      return this.stepData[stepName] || {};
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
      prestationsAndPrices: FormPrestationIdWithPrice[];
    }) {
      this.register.prestations = payload.prestationsAndPrices;
    },
    async registerClient(customer: RegistrationCustomer) {
      try {
        await axios.post("customers/create-customer", customer);
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
    async registerProfessionnal(
      userType: string,
      { files, ...userToAdd }: AddProfessionnal & PrescriptionUpload
    ) {
      const filesData = new FormData();
      files.map((file) => {
        filesData.append("files", file);
      });
      Object.keys(userToAdd).map((item) => {
        const value = userToAdd[item as keyof typeof userToAdd];
        if (value !== undefined) {
          if (Array.isArray(value)) {
            filesData.append(item, JSON.stringify(value));
          } else {
            filesData.append(item, String(value));
          }
        }
      });
      try {
        if (userType === "merchant") {
          await axios.post("merchants/create-merchant", filesData);
        } else if (userType === "service_agent") {
          await axios.post("registration-requests/service-agent", filesData);
        } else if (userType === "delivery_agent") {
          await axios.post("registration-requests/delivery-agent", filesData);
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

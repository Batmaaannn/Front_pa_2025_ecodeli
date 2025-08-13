import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/connexion",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
  {
    path: "/inscription",
    name: "RegisterType",
    component: () => import("@/views/auth/RegisterTypePage.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
  {
    path: "/inscription/livreur",
    name: "RegisterDeliver",
    component: () => import("@/views/auth/RegisterDeliver.vue"),
    meta: {
      layout: "HomeLayout",
    },
    children: [
      {
        path: "",
        name: "InformationsDeliver",
        component: () =>
          import("@/views/auth/components/steps/global/Informations.vue"),
        meta: {
          layout: "HomeLayout",
        },
      },
      {
        path: "entreprise",
        name: "CompanyInformationsDeliver",
        component: () =>
          import(
            "@/views/auth/components/steps/global/CompanyInformations.vue"
          ),
        meta: {
          layout: "HomeLayout",
        },
      },
      {
        path: "vehicule",
        name: "VehiculeInformations",
        component: () =>
          import(
            "@/views/auth/components/steps/delivery-agent/VehiculeInformations.vue"
          ),
        meta: {
          layout: "HomeLayout",
        },
      },
      {
        path: "documents",
        name: "CompanyDocumentsDeliver",
        component: () =>
          import(
            "@/views/auth/components/steps/global/DocumentsProfessionnal.vue"
          ),
        meta: {
          layout: "HomeLayout",
        },
      },
    ],
  },
  {
    path: "/inscription/client",
    name: "RegisterClient",
    component: () => import("@/views/auth/RegisterClient.vue"),
    meta: {
      layout: "HomeLayout",
    },
    children: [
      {
        path: "",
        name: "InformationsCustomer",
        component: () =>
          import("@/views/auth/components/steps/global/Informations.vue"),
        meta: {
          layout: "HomeLayout",
        },
      },
      {
        path: "formule",
        name: "FormuleChoice",
        component: () =>
          import("@/views/auth/components/steps/client/FormuleChoice.vue"),
        meta: {
          layout: "HomeLayout",
        },
      },
    ],
  },
  {
    path: "/inscription/commercant",
    name: "RegisterMerchant",
    component: () => import("@/views/auth/RegisterMerchant.vue"),
    meta: {
      layout: "HomeLayout",
    },
    children: [
      {
        path: "",
        name: "InformationsMerchant",
        component: () =>
          import("@/views/auth/components/steps/global/Informations.vue"),
        meta: {
          layout: "HomeLayout",
        },
      },
      {
        path: "entreprise",
        name: "CompanyInformationsMerchant",
        component: () =>
          import(
            "@/views/auth/components/steps/global/CompanyInformations.vue"
          ),
        meta: {
          layout: "HomeLayout",
        },
      },
      {
        path: "documents",
        name: "CompanyDocumentsMerchant",
        component: () =>
          import(
            "@/views/auth/components/steps/global/DocumentsProfessionnal.vue"
          ),
        meta: {
          layout: "HomeLayout",
        },
      },
    ],
  },
  {
    path: "/inscription/prestataire",
    name: "RegisterServiceAgent",
    component: () => import("@/views/auth/RegisterServiceAgent.vue"),
    meta: {
      layout: "HomeLayout",
    },
    children: [
      {
        path: "",
        name: "InformationsServiceAgent",
        component: () =>
          import("@/views/auth/components/steps/global/Informations.vue"),
        meta: {
          layout: "HomeLayout",
        },
      },
      {
        path: "entreprise",
        name: "CompanyInformationsServiceAgent",
        component: () =>
          import(
            "@/views/auth/components/steps/global/CompanyInformations.vue"
          ),
        meta: {
          layout: "HomeLayout",
        },
      },
      {
        path: "prestations",
        name: "PrestationsChoiceServiceAgent",
        component: () =>
          import(
            "@/views/auth/components/steps/service-agent/PrestationsChoice.vue"
          ),
        meta: {
          layout: "HomeLayout",
        },
      },
      {
        path: "documents",
        name: "CompanyDocumentsServiceAgent",
        component: () =>
          import(
            "@/views/auth/components/steps/global/DocumentsProfessionnal.vue"
          ),
        meta: {
          layout: "HomeLayout",
        },
      },
    ],
  },
];

export default routes;

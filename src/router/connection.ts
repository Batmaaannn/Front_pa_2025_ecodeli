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
  },
  {
    path: "/inscription/client",
    name: "RegisterClient",
    component: () => import("@/views/auth/RegisterClient.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
  {
    path: "/inscription/commercant",
    name: "RegisterMerchant",
    component: () => import("@/views/auth/RegisterMerchant.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
  {
    path: "/inscription/prestataire",
    name: "RegisterServiceAgent",
    component: () => import("@/views/auth/RegisterServiceAgent.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
];

export default routes;

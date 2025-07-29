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
    path: "/inscription/professionnel",
    name: "SigninProfessional",
    component: () => import("@/views/auth/RegisterProfessionnal.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
  {
    path: "/inscription/client",
    name: "SigninClient",
    component: () => import("@/views/auth/RegisterClient.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
];

export default routes;

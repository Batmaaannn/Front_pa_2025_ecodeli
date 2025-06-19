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
    name: "Signin",
    component: () => import("@/views/auth/Register.vue"),
    meta: {
      layout: "HomeLayout",
    },
    redirect: { name: "UserInformations" },
    children: [
      {
        path: "",
        name: "UserInformations",
        component: () =>
          import("@/views/auth/components/steps/ProfileType.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "/inscription/prestations",
        name: "Prestations",
        component: () =>
          import("@/views/auth/components/steps/Prestations.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "/inscription/informations",
        name: "Informations",
        component: () =>
          import("@/views/auth/components/steps/Informations.vue"),
        meta: { requiresAuth: false },
      },
    ],
  },
];

export default routes;

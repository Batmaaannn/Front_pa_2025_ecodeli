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
];

export default routes;

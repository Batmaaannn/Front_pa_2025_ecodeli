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
    component: () => import("@/views/auth/Signin.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
  {
    path: "/demande-inscription",
    name: "SigninRequest",
    component: () => import("@/views/auth/SignInRequest.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
];

export default routes;

import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/inscription/professionnel",
    name: "SigninProfessional",
    component: () => import("@/views/register/RegisterProfessionnal.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
  {
    path: "/inscription/client",
    name: "SigninClient",
    component: () => import("@/views/register/RegisterClient.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
];

export default routes;

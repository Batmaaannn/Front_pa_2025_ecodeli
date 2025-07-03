import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  //TODO: scinder les differents dashboard
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/users/Dashboard.vue"),
    meta: {
      layout: "ConnectedLayout",
      requiresAuth: true,
    },
  },
];

export default routes;

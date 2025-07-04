import { UserType } from "@/types/user";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  //TODO: scinder les differents dashboard
  {
    path: "/tableau-de-bord",
    name: "DashboardAdmins",
    component: () => import("@/views/admin/DashboardAdmin.vue"),
    meta: {
      layout: "ConnectedLayout",
      requiresAuth: true,
      userTypeAuthorized: [UserType.ADMIN],
    },
    children: [
      {
        name: "DashboardAdmin",
        path: "",
        component: () => import("@/views/admin/Dashboard.vue"),
      },
      {
        name: "RegistrationRequests",
        path: "/demande-inscription",
        component: () => import("@/views/admin/RegistrationRequests.vue"),
      },
    ],
  },
];

export default routes;

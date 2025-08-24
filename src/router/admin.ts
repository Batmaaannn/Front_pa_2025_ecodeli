import { UserType } from "@/types/user";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
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
        name: "DeliveryAgentList",
        path: "livreurs",
        component: () =>
          import("@/views/admin/delivery-agent/DeliveryAgentList.vue"),
      },
      {
        name: "DeliveryAgentById",
        path: "livreurs/:id",
        component: () =>
          import("@/views/admin/delivery-agent/DeliveryAgentById.vue"),
      },
      {
        name: "ServiceAgentList",
        path: "prestataires-de-services",
        component: () =>
          import("@/views/admin/service-agent/ServiceAgentList.vue"),
      },
      {
        name: "ServiceAgentById",
        path: "prestataires-de-services/:id",
        component: () =>
          import("@/views/admin/service-agent/ServiceAgentById.vue"),
      },
    ],
  },
];

export default routes;

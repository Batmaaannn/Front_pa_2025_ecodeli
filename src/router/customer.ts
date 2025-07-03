import { UserType } from "@/types/user";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/mon-espace",
    name: "Dashboard",
    component: () => import("@/views/customer/DashboardCustomer.vue"),
    meta: {
      layout: "ConnectedLayout",
      requiresAuth: true,
      userTypeAuthorized: [UserType.CUSTOMER],
    },
    children: [
      {
        name: "Dashboard",
        path: "",
        component: () => import("@/views/customer/Dashboard.vue"),
      },
      {
        name: "Dashboard",
        path: "mes-demandes-de-livraison",
        component: () =>
          import("@/views/customer/deliveries/FutureDeliveries.vue"),
      },
      {
        name: "Dashboard",
        path: "mes-demandes-de-livraison/:id",
        component: () => import("@/views/customer/deliveries/DeliveryPage.vue"),
      },
      {
        name: "Dashboard",
        path: "mon-historique-de-livraison",
        component: () =>
          import("@/views/customer/deliveries/PastDeliveries.vue"),
      },
      {
        name: "Dashboard",
        path: "mes-boxs",
        component: () => import("@/views/customer/boxs/BoxPage.vue"),
      },
      {
        name: "Dashboard",
        path: "mes-rendez-vous",
        component: () =>
          import("@/views/customer/appointments/FutureAppointments.vue"),
      },
      {
        name: "Dashboard",
        path: "mes-rendez-vous/:id",
        component: () =>
          import("@/views/customer/appointments/AppointmentPage.vue"),
      },
      {
        name: "Dashboard",
        path: "mon-historique",
        component: () =>
          import("@/views/customer/appointments/PastAppointments.vue"),
      },
    ],
  },
];

export default routes;

import { UserType } from "@/types/user";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/mon-espace",
    name: "Dashboard",
    component: () => import("@/views/service-agent/DashboardServiceAgent.vue"),
    meta: {
      layout: "ConnectedLayout",
      requiresAuth: true,
      userTypeAuthorized: [UserType.SERVICE_AGENT],
    },
    children: [
      {
        name: "Dashboard",
        path: "",
        component: () => import("@/views/service-agent/Dashboard.vue"),
      },
      {
        name: "Dashboard",
        path: "mes-rendez-vous",
        component: () =>
          import("@/views/service-agent/appointments/FutureAppointments.vue"),
      },
      {
        name: "Dashboard",
        path: "mes-rendez-vous/:id",
        component: () =>
          import("@/views/service-agent/appointments/AppointmentPage.vue"),
      },
      {
        name: "Dashboard",
        path: "mon-historique",
        component: () =>
          import("@/views/service-agent/appointments/PastAppointments.vue"),
      },
    ],
  },
];

export default routes;

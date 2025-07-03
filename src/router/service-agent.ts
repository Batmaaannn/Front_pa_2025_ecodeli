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
        name: "FutureServiceAgentAppointments",
        path: "mes-rendez-vous",
        component: () =>
          import("@/views/service-agent/appointments/FutureAppointments.vue"),
      },
      {
        name: "ServiceAgentAppointment",
        path: "mes-rendez-vous/:id",
        component: () =>
          import("@/views/service-agent/appointments/AppointmentPage.vue"),
      },
      {
        name: "PastServiceAgentAppointments",
        path: "mon-historique",
        component: () =>
          import("@/views/service-agent/appointments/PastAppointments.vue"),
      },
      {
        name: "ServiceAgentReviews",
        path: "mes-avis",
        component: () => import("@/views/service-agent/Reviews.vue"),
      },
      {
        name: "Prestations",
        path: "mes-prestations",
        component: () => import("@/views/service-agent/Prestations.vue"),
      },
    ],
  },
];

export default routes;

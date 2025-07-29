import { UserType } from "@/types/user";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/mon-espace-livreur",
    name: "DashboardDeliveriesAgents",
    component: () =>
      import("@/views/delivery-agent/DashboardDeliveryAgent.vue"),
    /*meta: {
      layout: "ConnectedLayout",
      requiresAuth: true,
      userTypeAuthorized: [UserType.DELIVERY_AGENT],
    },*/
    children: [
      {
        name: "DashboardDeliveryAgent",
        path: "",
        component: () => import("@/views/delivery-agent/Dashboard.vue"),
      },
      {
        name: "FutureDeliveryAgentDeliveries",
        path: "mes-demandes-de-livraison",
        component: () =>
          import("@/views/delivery-agent/deliveries/FutureDeliveries.vue"),
      },
      {
        name: "DeliveryAgentDelivery",
        path: "mes-demandes-de-livraison/:id",
        component: () =>
          import("@/views/delivery-agent/deliveries/DeliveryPage.vue"),
      },
      {
        name: "PastDeliveryAgentDeliveries",
        path: "mon-historique-de-livraison",
        component: () =>
          import("@/views/delivery-agent/deliveries/PastDeliveries.vue"),
      },
      {
        name: "CreateTrip",
        path: "ajouter-un-trajet",
        component: () =>
            import("@/views/delivery-agent/trips/CreateTrip.vue"),
      },
      {
        name: "AllDeliveryRequests",
        path: "demandes-de-livraisons",
        component: () =>
            import("@/views/delivery-agent/deliveries/AllRequestsDeliveries.vue"),
      },
    ],
  },
];

export default routes;

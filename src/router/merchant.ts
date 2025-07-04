import { UserType } from "@/types/user";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/mon-espace-commercant",
    name: "DashboardTest",
    component: () => import("@/views/merchant/DashboardMerchant.vue"),
    meta: {
      layout: "ConnectedLayout",
      requiresAuth: true,
      userTypeAuthorized: [UserType.MERCHANT],
    },
    children: [
      {
        name: "DashboardMerchant",
        path: "",
        component: () => import("@/views/merchant/Dashboard.vue"),
      },
      {
        name: "FutureCustomerDeliveries",
        path: "mes-livraisons",
        component: () =>
          import("@/views/merchant/deliveries/FutureDeliveries.vue"),
      },
      {
        name: "CustomerDelivery",
        path: "mes-livraisons/:id",
        component: () => import("@/views/merchant/deliveries/DeliveryPage.vue"),
      },
      {
        name: "PastCustomerDeliveries",
        path: "mon-historique-de-livraison",
        component: () =>
          import("@/views/merchant/deliveries/PastDeliveries.vue"),
      },
    ],
  },
];

export default routes;

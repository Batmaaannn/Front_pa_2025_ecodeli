import { UserType } from "@/types/user";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/mon-profil",
    name: "UserProfile",
    component: () => import("@/views/user/EditProfile.vue"),
    meta: {
      layout: "ConnectedLayout",
      requiresAuth: true,
    },
  },
];

export default routes;

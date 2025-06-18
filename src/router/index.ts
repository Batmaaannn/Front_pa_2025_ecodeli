import type { RouteRecordRaw } from "vue-router";
//import { UserType } from "@/types";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/Contact.vue"),
    // meta: {
    //   requiresAuth: false,
    //   userTypeAuthorized: [
    //     UserType.PATIENT,
    //     UserType.SERVICE_AGENT,
    //     UserType.PHARMACIST,
    //   ],
    // },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/PageNotFound.vue"),
  },
];

export default routes;

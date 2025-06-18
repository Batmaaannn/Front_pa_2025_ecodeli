import type { RouteRecordRaw } from "vue-router";

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
    component: () => import("@/views/landingPage/Contact.vue"),
    meta: {
      layout: "HomeLayout",
      requiresAuth: false,
    },
  },
  {
    path: "/nos-prix",
    name: "Price",
    component: () => import("@/views/landingPage/Price.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
  {
    path: "/formules",
    name: "Formules",
    component: () => import("@/views/landingPage/Formules.vue"),
    meta: {
      layout: "HomeLayout",
      requiresAuth: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/PageNotFound.vue"),
  },
];

export default routes;

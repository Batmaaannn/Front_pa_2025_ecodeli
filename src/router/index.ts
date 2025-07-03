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
    component: () => import("@/views/landing-page/Contact.vue"),
    meta: {
      layout: "HomeLayout",
      requiresAuth: false,
    },
  },
  {
    path: "/nos-prix",
    name: "Price",
    component: () => import("@/views/landing-page/Price.vue"),
    meta: {
      layout: "HomeLayout",
    },
  },
  {
    path: "/formules",
    name: "Formules",
    component: () => import("@/views/landing-page/Formules.vue"),
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

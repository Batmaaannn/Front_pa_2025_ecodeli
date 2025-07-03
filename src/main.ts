import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import defaultRoutes from "@/router";
import connectionRoutes from "@/router/connection";
import customersRoutes from "@/router/customer";
import deliveryAgentRoutes from "@/router/customer";
import serviceAgentRoutes from "@/router/customer";

import { createRouter, createWebHistory } from "vue-router";
import { createNewInstance as createNewAxiosInstance } from "@/libs/axios";
import { authGuard } from "./router/guards/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...defaultRoutes,
    ...connectionRoutes,
    ...customersRoutes,
    ...deliveryAgentRoutes,
    ...serviceAgentRoutes,
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  await authGuard(to, next);
  next();
});

const app = createApp(App);

const store = createPinia();

createNewAxiosInstance({ router, store });
//const head = createHead();

app.use(router).use(createPinia()).mount("#app");

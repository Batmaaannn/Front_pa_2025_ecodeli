import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import defaultRoutes from "@/router";
import connectionRoutes from "@/router/connection";
import customersRoutes from "@/router/customer";
import deliveryAgentRoutes from "@/router/delivery-agent";
import serviceAgentRoutes from "@/router/service-agent";
import merchantsRoutes from "@/router/merchant";
import adminRoutes from "@/router/admin";

import { createRouter, createWebHistory } from "vue-router";
import { createNewInstance as createNewAxiosInstance } from "@/libs/axios";
import { authGuard } from "./router/guards/auth.guard";
import { roleRestrictedGuard } from "./router/guards/role-restricted.guard";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...defaultRoutes,
    ...connectionRoutes,
    ...customersRoutes,
    ...deliveryAgentRoutes,
    ...serviceAgentRoutes,
    ...merchantsRoutes,
    ...adminRoutes,
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  await authGuard(to, next);
  await roleRestrictedGuard(to, next);
});

const app = createApp(App);

const store = createPinia();

createNewAxiosInstance({ router, store });
//const head = createHead();

app
  .use(router)
  .use(createPinia())
  .component("VueDatePicker", VueDatePicker)
  .mount("#app");

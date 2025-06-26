import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import defaultRoutes from "@/router";
import authRoutes from "@/router/auth";
import registerRoutes from "@/router/register";
import usersRoutes from "@/router/user";

import { createRouter, createWebHistory } from "vue-router";
import { createNewInstance as createNewAxiosInstance } from "@/libs/axios";
import { authGuard } from "./router/guards/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [...defaultRoutes, ...authRoutes, ...registerRoutes, ...usersRoutes],
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

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import defaultRoutes from "@/router";
import authRoutes from "@/router/auth";

import { createRouter, createWebHistory } from "vue-router";
import { createNewInstance as createNewAxiosInstance } from "@/libs/axios";

const router = createRouter({
  history: createWebHistory(),
  routes: [...defaultRoutes, ...authRoutes],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

const app = createApp(App);

const store = createPinia();

createNewAxiosInstance({ router, store });
//const head = createHead();

app.use(router).use(createPinia()).mount("#app");

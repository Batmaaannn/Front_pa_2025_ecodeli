import { useUserStore } from "@/stores/user.store";
import { COOKIES } from "@/types/cookies";
import type {
  NavigationGuardNext,
  NavigationGuardReturn,
  RouteLocationNormalized,
} from "vue-router";
import { useCookies } from "vue3-cookies";

export async function authGuard(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<NavigationGuardReturn> {
  const usersStore = useUserStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const { cookies } = useCookies();
  if (cookies.get(COOKIES.CONNECTION_TOKEN)) {
    await usersStore.fetchUser();
  }

  const isConnected = usersStore.isConnected;

  if (requiresAuth && !isConnected) {
    return next({ name: "Login" });
  }
}

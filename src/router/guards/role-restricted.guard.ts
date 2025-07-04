import { useUserStore } from "@/stores/user.store";
import { UserType } from "@/types/user";
import type {
  NavigationGuardNext,
  NavigationGuardReturn,
  RouteLocationNormalized,
} from "vue-router";

export async function roleRestrictedGuard(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<NavigationGuardReturn> {
  const usersStore = useUserStore();
  const user = usersStore.user;

  const authorizedTypes: UserType[] | undefined = to.matched
    .map((record) => record.meta.userTypeAuthorized)
    .find((types) => Array.isArray(types));

  if (authorizedTypes && user && !authorizedTypes.includes(user.user_type)) {
    return next(usersStore.getDashboardUrl);
  }

  return next();
}

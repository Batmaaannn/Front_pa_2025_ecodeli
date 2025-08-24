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

  const routeTypeAdmin = to.matched.some((record) =>
    record.meta.userTypeAuthorized?.find(
      (element) => element === UserType.ADMIN
    )
  );
  const routeTypeDeliveryAgent = to.matched.some((record) =>
    record.meta.userTypeAuthorized?.find(
      (element) => element === UserType.DELIVERY_AGENT
    )
  );
  const routeTypeServiceAgent = to.matched.some((record) =>
    record.meta.userTypeAuthorized?.find(
      (element) => element === UserType.SERVICE_AGENT
    )
  );
  const routeTypeCustomer = to.matched.some((record) =>
    record.meta.userTypeAuthorized?.find(
      (element) => element === UserType.CUSTOMER
    )
  );
  const routeTypeMerchant = to.matched.some((record) =>
    record.meta.userTypeAuthorized?.find(
      (element) => element === UserType.MERCHANT
    )
  );

  const isCustomer = usersStore.isCustomer;
  const isMerchant = usersStore.isMerchant;
  const isDeliveryAgent = usersStore.isDeliveryAgent;
  const isServiceAgent = usersStore.isServiceAgent;
  const isAdmin = usersStore.isAdmin;

  const authorizedTypes: UserType[] | undefined = to.matched
    .map((record) => record.meta.userTypeAuthorized)
    .find((types) => Array.isArray(types));

  if (
    (routeTypeAdmin && !isAdmin) ||
    (routeTypeDeliveryAgent && !isDeliveryAgent) ||
    (routeTypeServiceAgent && !isServiceAgent) ||
    (routeTypeCustomer && !isCustomer) ||
    (routeTypeMerchant && !isMerchant)
  ) {
    return next(usersStore.getDashboardUrl);
  }

  return next();
}

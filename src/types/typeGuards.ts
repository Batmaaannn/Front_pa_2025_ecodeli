import {
  CustomerUser,
  DeliveryAgentUser,
  MerchantUser,
  User,
  UserType,
} from "./user";
import { ServiceAgentUser } from "./user";

export function isMerchantUser(
  user: User | Record<string, never>
): user is MerchantUser {
  if (!user || Object.keys(user).length === 0) return false;

  return user.user_type === UserType.MERCHANT;
}

export function isDeliveryAgentUser(
  user: User | Record<string, never>
): user is DeliveryAgentUser {
  if (!user || Object.keys(user).length === 0) return false;

  return user.user_type === UserType.DELIVERY_AGENT;
}

export function isServiceAgentUser(
  user: User | Record<string, never>
): user is ServiceAgentUser {
  if (!user || Object.keys(user).length === 0) return false;
  return user.user_type === UserType.SERVICE_AGENT;
}

export function isCustomerUser(
  user: User | Record<string, never>
): user is CustomerUser {
  if (!user || Object.keys(user).length === 0) return false;

  return user.user_type === UserType.CUSTOMER;
}

export function isAdminUser(
  user: User | Record<string, never>
): user is CustomerUser {
  if (!user || Object.keys(user).length === 0) return false;

  return user.user_type === UserType.ADMIN;
}

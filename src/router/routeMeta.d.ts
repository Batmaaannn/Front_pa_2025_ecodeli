import "vue-router";
import { UserType } from "@/types/user";

declare module "vue-router" {
  interface RouteMeta {
    userTypeAuthorized?: UserType[];
    requiresAuth?: boolean;
  }
}

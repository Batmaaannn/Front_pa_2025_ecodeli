import "vue-router";
import { UserType } from "@/types";

declare module "vue-router" {
  interface RouteMeta {
    userTypeAuthorized?: UserType[];
    requiresAuth?: boolean;
  }
}

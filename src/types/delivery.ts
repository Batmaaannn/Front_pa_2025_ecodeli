import { Announcement } from "./announcement";
import { DeliveryAgent } from "./delivery-agent";
import { Package } from "./package";
import { Rating } from "./rating";

export enum DeliveryType {
  FULL = "full",
  PARTIAL = "partial",
}

export enum DeliveryStatus {
  PENDING = "pending",
  ASSIGNED = "assigned",
  PICKED_UP = "picked_up",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
}

export enum VehiculeType {
  CAR = "CAR",
  TRUCK = "TRUCK",
  VAN = "VAN",
}

export interface Delivery {
  id: number;
  delivery_type: DeliveryType;
  tracking_code: string;
  status: DeliveryStatus;
  pickup_time?: Date;
  delivery_time?: Date;
  delivery_code?: string;
  packages: Package[];
  ratings: Rating[];
  delivery_agent?: DeliveryAgent;
  delivery_agent_id: number;
  announcement: Announcement;
  announcement_id: number;
}

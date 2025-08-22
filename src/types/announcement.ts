import { Customer } from "./customer";
import { Delivery } from "./delivery";
import { DeliveryPackageRequest } from "./package";

export enum AnnouncementStatus {
  POSTED = "posted",
  MATCHED = "matched",
  IN_PROGRESS = "in_progress",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum AnnouncementType {
  PACKAGE = "package",
  SERVICE = "service",
  TRANSPORT = "transport",
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  departure_city: string;
  arrival_city: string;
  price: number;
  pickup_date: Date;
  delivery_date: Date;
  assurance: boolean;
  urgent: boolean;
  pickup_instructions?: string;
  status: AnnouncementStatus;
  announcement_type: AnnouncementType;
  created_at: Date;
  updated_at: Date;
  customer: Customer;
  customer_id: number;
  deliveries: Delivery[];
}

export interface AnnouncementPackageRequest {
  title: string;
  description: string;
  departureCity: string;
  arrivalCity: string;
  price: number;
  pickupDate: Date;
  deliveryDate: Date;
  assurance: boolean;
  urgent: boolean;
  pickupInstructions?: string;
  objects: DeliveryPackageRequest[];
}

import { Customer } from "./customer";
import { ServiceAgentPrestation } from "./prestation";
import { Rating } from "./rating";
import { ServiceAgent } from "./service-agent";

export enum AppointmentStatus {
  TO_BE_PROCESSED = "TO_BE_PROCESSED",
  WAITING = "WAITING",
  CONFIRMED = "CONFIRMED",
  DELIVERED = "DELIVERED",
  DELETED = "DELETED",
}

export interface Appointment {
  id: number;
  status: AppointmentStatus;
  date: Date;
  final_price: number;
  special_requests?: string;
  estimated_duration_minutes?: number;
  actual_duration_minutes?: number;
  ratings: Rating[];
  customer: Customer;
  customer_id?: number;
  service_agent: ServiceAgent;
  service_agent_id: number;
  serviceAgentPrestation: ServiceAgentPrestation;
  service_agent_prestation_id: number;
}

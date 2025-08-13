import { Appointment } from "./appointment";
import { ServiceAgent } from "./service-agent";

export interface Prestation {
  id: number;
  label: string;
  category: string;
  ecodeli_price: number;
  pricing_unit: string;
  description: string;
  is_active: boolean;
  serviceAgentPrestations: ServiceAgentPrestation[];
}

export interface InformationsForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  companyName: string;
  siret: string;
  companyCity: string;
  compagnyPostalCode: string;
  companyAddress: string;
}

export enum PrestationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  MODIFIED = "MODIFIED",
}

export interface ServiceAgentPrestation {
  id: number;
  requested_price: number;
  applied_price?: number;
  price_status: PrestationStatus;
  ecodeli_comment?: string;
  is_available: boolean;
  validated_at?: Date;
  validated_by?: number;
  service_agent: ServiceAgent;
  service_agent_id: number;
  prestation: Prestation;
  prestation_id: number;
  appointments: Appointment[];
}

import { PrestationWithPrice } from "./prestation";
import { Statut } from "./status";
import { SubscriptionPlan } from "./subscription-plan";
import { AgentType } from "./user";
import { VehiculeType } from "./vehicule";

export interface RegistrationRequest {
  id: number;
  siret: string;
  token_request: string;
  email: string;
  company_name: string;
  company_address: string;
  company_city: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  agent_type: AgentType;
  prestationLinks: PrestationWithPrice[] | null;
  vehicle_type: any | null;
  statut: Statut;
  created_at: Date;
  updated_at: Date;
}

export interface RegistrationRequestWithFiles extends RegistrationRequest {
  documents: RegistrationDocument[];
}

export interface RegistrationDocument {
  id: number;
  target_type: string;
  target_id: number;
  approval_date: string | null;
  status: string;
  file_url: string;
  file_name: string;
  validity: string | null;
  info: string | null;
  created_at: string;
  updated_at: string;
}

interface BaseRegistration {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

interface CompanyInfo {
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyPostalCode: string;
  companySiret: string;
  files: File[];
}

export interface RegistrationCustomer extends BaseRegistration {
  subscriptionPlan: SubscriptionPlan;
}

export interface RegistrationMerchant extends BaseRegistration, CompanyInfo {}

export interface RegistrationDeliveryAgent
  extends BaseRegistration,
    CompanyInfo {
  licenseNumber: string;
  vehicleType: VehiculeType;
}

export interface RegistrationServiceAgent
  extends BaseRegistration,
    CompanyInfo {
  selectedPrestations: { prestationId: number; requestedPrice: number }[];
}

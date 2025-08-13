import { Delivery, VehiculeType } from "./delivery";
import { Route } from "./route";
import { User } from "./user";

export interface DeliveryAgent {
  id: number;
  siret: string;
  company_name: string;
  company_address: string;
  company_city?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  vehicle_type: VehiculeType;
  license_number?: string;
  rating: number;
  is_validated: boolean;
  nfc_card_id?: string;
  deliveries: Delivery[];
  user: User;
  user_id: number;
  routes: Route[];
}

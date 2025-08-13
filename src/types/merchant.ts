import { User } from "./user";

export interface Merchant {
  id: number;
  siret: string;
  company_name: string;
  company_address: string;
  company_city: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  commission_rate: number;
  is_partner: boolean;
  user: User;
  user_id: number;
}

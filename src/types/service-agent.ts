import { Appointment } from "./appointment";
import { ServiceAgentPrestation } from "./prestation";
import { User } from "./user";

export interface ServiceAgent {
    id: number;
    siret: string;
    company_name: string;
    company_address: string;
    company_city: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    certifications?: string;
    monthly_earnings: number;
    last_invoice_date?: Date;
    user: User;
    user_id: number;
    appointments: Appointment[];
    serviceAgentPrestations: ServiceAgentPrestation[];
}

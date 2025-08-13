import { DeliveryAgent } from "./delivery-agent";

export interface Route {
    id: number;
    deliverer_id: number;
    departure_city: string;
    arrival_city: string;
    departure_date: Date;
    arrival_date: Date;
    is_available: boolean;
    max_packages: number;
    delivery_agent: DeliveryAgent;
    delivery_agent_id: number;
}
import { User } from "./user";
import { Appointment } from "./appointment";
import { Delivery } from "./delivery";

export enum RatingType {
  DELIVERY = "DELIVERY",
  SERVICE = "SERVICE",
}

export interface Rating {
  id: number;
  rating: number;
  comment: string;
  date: Date;
  rating_type: RatingType;
  rater: User;
  rater_id: number;
  rated: User;
  rated_id: number;
  delivery: Delivery;
  delivery_id: number;
  appointment: Appointment;
  appointment_id: number;
}

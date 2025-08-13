import { User } from "./user";
import { Appointment } from "./appointment";
import { Rating } from "./rating";
import { SubscriptionPlan } from "./subscription-plan";
import { Announcement } from "./annoucement";
import { StorageBox } from "./storage-box";

export interface Customer {
  id: number;
  last_name: string;
  first_name: string;
  phone_number: string;
  address_1?: string;
  address_2?: string;
  postal_code?: string;
  city?: string;
  subscription_plan: SubscriptionPlan;
  wallet_balance: number;
  subscription_start?: Date;
  tutorial_completed: boolean;
  user: User;
  user_id: number;
  appointments?: Appointment[];
  ratingsGiven?: Rating[];
  ratingsReceived?: Rating[];
  announcements?: Announcement[];
  storageBoxes?: StorageBox[];
}

import { Customer } from "./customer";
import { Package } from "./package";

export enum BoxSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  XL = "XL",
}

export interface StorageBox {
  id: number;
  box_location:
    | "paris"
    | "marseille"
    | "lyon"
    | "lille"
    | "montpellier"
    | "rennes";
  box_size: BoxSize;
  is_occupied: boolean;
  rental_start?: Date;
  rental_end?: Date;
  customer?: Customer;
  customer_id: number;
  packages: Package[];
}

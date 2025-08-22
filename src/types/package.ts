import { Delivery } from "./delivery";
import { StorageBox } from "./storage-box";

export interface Package {
  id: number;
  weight: number; // kg
  length?: number; // cm
  width?: number; // cm
  height?: number; // cm
  quantity: number;
  photos?: string;
  fragile?: boolean;
  delivery?: Delivery;
  delivery_id: number;
  storageBox?: StorageBox;
  storage_box_id: number;
}

export interface DeliveryPackageRequest {
  label: string;
  weight: number;
  length?: number; // cm
  width?: number; // cm
  height?: number; // cm
  quantity: number;
  value?: number;
  photo?: File | null;
  fragile?: boolean;
}

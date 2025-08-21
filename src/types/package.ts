import { Delivery } from "./delivery";
import { StorageBox } from "./storage-box";

export interface Package {
    id: number;
    package_type: string;
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
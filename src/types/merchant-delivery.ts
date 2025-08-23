export enum MerchantDeliveryStatus {
  PENDING = "pending",
  ASSIGNED = "assigned",
  PICKED_UP = "picked_up",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface MerchantDelivery {
  id: number;
  order_reference: string;
  description?: string;
  order_amount: number;
  pickup_address: string;
  delivery_address: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  status: MerchantDeliveryStatus;
  delivery_fee: number;
  preferred_delivery_date?: string;
  preferred_delivery_time_slot?: string;
  merchant_id: number;
  customer_id?: number;
  delivery_id?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateMerchantDeliveryDto {
  order_reference: string;
  description?: string;
  order_amount: number;
  delivery_address: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_fee: number;
  preferred_delivery_date?: string;
  preferred_delivery_time_slot?: string;
}

export interface MerchantDeliveryStatistics {
  total: number;
  delivered: number;
  pending: number;
  inTransit: number;
  deliveryRate: number;
}
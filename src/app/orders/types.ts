import type { Order } from "@/data/types";

// Shipping & Fulfillment Types
export type ShippingCarrier = "usps" | "ups" | "fedex" | "dhl";

export type ShippingService =
  | "usps_priority"
  | "usps_first_class"
  | "ups_ground"
  | "ups_2day"
  | "ups_next_day"
  | "fedex_ground"
  | "fedex_2day"
  | "fedex_express";

export type LabelStatus = "pending" | "purchased" | "printed" | "error";

export type FulfillmentFilter =
  | "ready_to_ship"
  | "awaiting_shipment"
  | "label_purchased"
  | "shipped"
  | "all";

export interface ShippingRate {
  id: string;
  carrier: ShippingCarrier;
  service: ShippingService;
  serviceName: string; // "USPS Priority Mail"
  rate: number;
  currency: "USD";
  estimatedDays: string; // "2-3 business days"
  badge?: "best_value" | "fastest";
}

export interface ShippingLabel {
  id: string;
  orderId: string;
  carrier: ShippingCarrier;
  service: ShippingService;
  trackingNumber: string;
  rate: number;
  labelUrl?: string; // Mock PDF URL
  purchasedAt: Date;
  status: LabelStatus;
}

export interface ShippingOrder extends Order {
  weight?: number; // In ounces
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: "in" | "cm";
  };
  label?: ShippingLabel;
  canPurchaseLabel: boolean; // Business logic flag
}

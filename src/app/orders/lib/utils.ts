import type { ShippingCarrier, ShippingOrder, FulfillmentFilter } from "../types";

/**
 * Get carrier icon name (from lucide-react)
 */
export function getCarrierIcon(carrier: ShippingCarrier): string {
  const icons: Record<ShippingCarrier, string> = {
    usps: "Mail",
    ups: "Package",
    fedex: "Zap",
    dhl: "Plane",
  };
  return icons[carrier];
}

/**
 * Generate realistic tracking number
 */
export function generateTrackingNumber(carrier: ShippingCarrier): string {
  const prefixes: Record<ShippingCarrier, string> = {
    usps: "9400",
    ups: "1Z",
    fedex: "7701",
    dhl: "JD",
  };

  const prefix = prefixes[carrier];
  const randomDigits = Math.random().toString().slice(2, 14);

  return `${prefix}${randomDigits}`;
}

/**
 * Calculate package weight based on items
 */
export function calculatePackageWeight(itemCount: number): number {
  // Estimate 4-16 oz per item, randomized
  const baseWeight = 4;
  const weightPerItem = baseWeight + Math.random() * 12;
  return Math.round(itemCount * weightPerItem);
}

/**
 * Calculate package dimensions based on items
 */
export function calculatePackageDimensions(itemCount: number): {
  length: number;
  width: number;
  height: number;
  unit: "in";
} {
  // Small, Medium, Large box based on item count
  if (itemCount === 1) {
    return { length: 6, width: 4, height: 2, unit: "in" }; // Small
  } else if (itemCount <= 3) {
    return { length: 12, width: 9, height: 4, unit: "in" }; // Medium
  } else {
    return { length: 16, width: 12, height: 6, unit: "in" }; // Large
  }
}

/**
 * Check if order can purchase label
 */
export function canPurchaseLabel(order: {
  trackingNumber?: string;
  paymentStatus: string;
  fulfillmentStatus: string;
}): boolean {
  return (
    !order.trackingNumber &&
    order.paymentStatus === "paid" &&
    order.fulfillmentStatus === "unfulfilled"
  );
}

/**
 * Filter helper for fulfillment status
 */
export function matchesFulfillmentFilter(
  order: ShippingOrder,
  filter: FulfillmentFilter
): boolean {
  if (filter === "all") return true;

  if (filter === "ready_to_ship") {
    return order.canPurchaseLabel;
  }

  if (filter === "awaiting_shipment") {
    return (
      order.status === "awaiting_shipment" ||
      order.status === "processing"
    );
  }

  if (filter === "label_purchased") {
    return !!order.label && order.label.status === "purchased";
  }

  if (filter === "shipped") {
    return order.status === "shipped" || order.status === "delivered";
  }

  return false;
}

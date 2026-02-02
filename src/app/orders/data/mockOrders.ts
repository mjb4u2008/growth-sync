import { orders } from "@/data/orders";
import type { ShippingOrder } from "../types";
import {
  calculatePackageWeight,
  calculatePackageDimensions,
  canPurchaseLabel,
  generateTrackingNumber,
} from "../lib/utils";

/**
 * Transform existing orders into shipping-ready format
 * Filter to orders that need shipping labels (15-25 orders)
 */
export const shippingOrders: ShippingOrder[] = orders
  .filter(
    (order) =>
      order.fulfillmentStatus === "unfulfilled" ||
      order.status === "awaiting_shipment" ||
      order.status === "processing"
  )
  .slice(0, 20)
  .map((order): ShippingOrder => {
    const weight = calculatePackageWeight(order.items.length);
    const dimensions = calculatePackageDimensions(order.items.length);
    const hasPurchasedLabel = order.trackingNumber !== undefined;

    return {
      ...order,
      weight,
      dimensions,
      label: hasPurchasedLabel
        ? {
            id: `label_${order.id}`,
            orderId: order.id,
            carrier: "usps", // Mock carrier
            service: "usps_priority",
            trackingNumber: order.trackingNumber!,
            rate: 7.85,
            purchasedAt: order.shippedAt || new Date(),
            status: "purchased",
          }
        : undefined,
      canPurchaseLabel: canPurchaseLabel(order),
    };
  });

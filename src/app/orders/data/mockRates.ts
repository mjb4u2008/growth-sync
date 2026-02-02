import type { ShippingRate, ShippingOrder } from "../types";

/**
 * Generate realistic shipping rates for mock label purchasing
 */
export function generateMockRates(orders: ShippingOrder[]): ShippingRate[] {
  const orderCount = orders.length;

  // Calculate total weight to vary pricing slightly
  const totalWeight = orders.reduce((sum, order) => sum + (order.weight || 8), 0);
  const avgWeight = totalWeight / orderCount;

  // Base rate multiplier (slightly higher for heavier packages)
  const weightMultiplier = avgWeight > 16 ? 1.2 : 1.0;

  return [
    {
      id: "rate_usps_priority",
      carrier: "usps",
      service: "usps_priority",
      serviceName: "USPS Priority Mail",
      rate: Math.round((7.85 * orderCount * weightMultiplier) * 100) / 100,
      currency: "USD",
      estimatedDays: "2-3 business days",
      badge: "best_value",
    },
    {
      id: "rate_usps_first",
      carrier: "usps",
      service: "usps_first_class",
      serviceName: "USPS First Class",
      rate: Math.round((5.50 * orderCount * weightMultiplier) * 100) / 100,
      currency: "USD",
      estimatedDays: "3-5 business days",
    },
    {
      id: "rate_ups_ground",
      carrier: "ups",
      service: "ups_ground",
      serviceName: "UPS Ground",
      rate: Math.round((9.20 * orderCount * weightMultiplier) * 100) / 100,
      currency: "USD",
      estimatedDays: "3-5 business days",
    },
    {
      id: "rate_ups_2day",
      carrier: "ups",
      service: "ups_2day",
      serviceName: "UPS 2nd Day Air",
      rate: Math.round((18.50 * orderCount * weightMultiplier) * 100) / 100,
      currency: "USD",
      estimatedDays: "2 business days",
    },
    {
      id: "rate_fedex_express",
      carrier: "fedex",
      service: "fedex_express",
      serviceName: "FedEx Express Saver",
      rate: Math.round((24.50 * orderCount * weightMultiplier) * 100) / 100,
      currency: "USD",
      estimatedDays: "1-2 business days",
      badge: "fastest",
    },
  ];
}

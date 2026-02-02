"use client";

import Link from "next/link";
import { Package, Truck, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const fulfillmentSnapshot = {
  readyToShip: 12,
  shippedToday: 34,
  inTransit: 89,
  needsAttention: [
    {
      type: "delayed_ship",
      message: "3 orders ready for 2+ days",
      action: "ship ASAP",
    },
    { type: "delayed_transit", message: "2 shipments delayed in transit" },
  ],
};

/**
 * Fulfillment Snapshot - What needs attention in fulfillment
 *
 * Action-oriented: Shows shipping status and urgent items
 */
export function FulfillmentSnapshot() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-[var(--shadow-card)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Fulfillment Snapshot
        </h3>
        <Link
          href="/orders"
          className="text-xs font-medium text-[var(--accent)] hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Ready to Ship */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Package className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">
            {fulfillmentSnapshot.readyToShip}
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            Ready to
            <br />
            Ship
          </div>
        </div>

        {/* Shipped Today */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Truck className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">
            {fulfillmentSnapshot.shippedToday}
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            Shipped
            <br />
            Today
          </div>
        </div>

        {/* In Transit */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Plane className="h-5 w-5 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">
            {fulfillmentSnapshot.inTransit}
          </div>
          <div className="text-xs text-[var(--text-muted)]">In Transit</div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] mb-4" />

      {/* Needs Attention */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-3">
          Needs Attention
        </h4>
        <div className="space-y-2">
          {fulfillmentSnapshot.needsAttention.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm text-[var(--text-primary)]"
            >
              <span className="text-[var(--text-muted)] mt-0.5">•</span>
              <span className="flex-1">
                {item.message}
                {item.action && (
                  <span className="text-orange-600 font-medium">
                    {" "}
                    ({item.action})
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action button */}
      <Link href="/orders">
        <Button variant="secondary" size="sm" className="w-full">
          View Orders →
        </Button>
      </Link>
    </div>
  );
}

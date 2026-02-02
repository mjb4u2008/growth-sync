"use client";

import Link from "next/link";
import { AlertCircle, AlertTriangle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const inventorySnapshot = {
  outOfStock: 2,
  lowStock: 5,
  reorderSoon: 8,
  criticalItems: [
    { name: "Black Hoodie XL", stock: 0, pending: 12 },
    { name: "Cloudlift Sneakers White", stock: 3, velocity: 6 },
  ],
};

/**
 * Inventory Snapshot - What needs attention in inventory
 *
 * Action-oriented: Shows critical stock levels and urgent items
 */
export function InventorySnapshot() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-[var(--shadow-card)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Inventory Snapshot
        </h3>
        <Link
          href="/inventory"
          className="text-xs font-medium text-[var(--accent)] hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Out of Stock */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">
            {inventorySnapshot.outOfStock}
          </div>
          <div className="text-xs text-[var(--text-muted)]">Out of Stock</div>
        </div>

        {/* Low Stock */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">
            {inventorySnapshot.lowStock}
          </div>
          <div className="text-xs text-[var(--text-muted)]">Low Stock</div>
        </div>

        {/* Reorder Soon */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Package className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">
            {inventorySnapshot.reorderSoon}
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            Reorder
            <br />
            Soon
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] mb-4" />

      {/* Critical Items */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-3">
          Critical Items
        </h4>
        <div className="space-y-2">
          {inventorySnapshot.criticalItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm text-[var(--text-primary)]"
            >
              <span className="text-[var(--text-muted)] mt-0.5">•</span>
              <span className="flex-1">
                <span className="font-medium">{item.name}</span> —{" "}
                {item.stock === 0 ? (
                  <>
                    <span className="text-red-600">0 left</span> ({item.pending}{" "}
                    orders pending)
                  </>
                ) : (
                  <>
                    <span className="text-orange-600">{item.stock} left</span>{" "}
                    (selling {item.velocity}/day)
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action button */}
      <Link href="/inventory">
        <Button variant="secondary" size="sm" className="w-full">
          View Inventory →
        </Button>
      </Link>
    </div>
  );
}

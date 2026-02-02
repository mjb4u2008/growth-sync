"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * InventoryHealthCard - Compact summary of inventory status
 * Links to inventory page for details
 */
export function InventoryHealthCard() {
  // TODO: Pull real data from inventory store or API
  const stats = {
    totalSKUs: 847,
    lowStock: 12,
    outOfStock: 3,
  };

  return (
    <Card hoverable padding="lg">
      <CardHeader>
        <CardTitle>Inventory Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Total SKUs</span>
            <span className="font-mono font-semibold text-[var(--text-primary)]">
              {stats.totalSKUs}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Low Stock</span>
            <span className="font-mono font-semibold text-yellow-600">
              {stats.lowStock}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Out of Stock</span>
            <span className="font-mono font-semibold text-red-600">
              {stats.outOfStock}
            </span>
          </div>
        </div>

        <Link href="/inventory">
          <Button variant="ghost" size="sm" className="w-full mt-4">
            View inventory →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

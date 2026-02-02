"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { analyticsData } from "@/data/analytics";
import { PlatformBadge } from "./shared/PlatformBadge";
import type { ProductPerformance } from "../types";

/**
 * TopProductsCard - Ranked list of top 5 products
 * Shows product name, SKU, revenue, units sold, and platform indicators
 */
export function TopProductsCard() {
  const topProducts: ProductPerformance[] = useMemo(() => {
    // Transform analytics data to match our type
    // TODO: Replace with real data from API
    return analyticsData.topProducts.map((product, index) => {
      // Assign platforms based on performance
      // Top sellers are on all platforms, others vary
      const platforms: Array<"shopify" | "tiktok" | "amazon"> =
        index === 0 || index === 1
          ? ["shopify", "tiktok", "amazon"]
          : index === 2
          ? ["shopify", "tiktok"]
          : index === 3
          ? ["shopify", "amazon"]
          : ["shopify"];

      return {
        id: `prod_${index + 1}`,
        name: product.product,
        sku: `SKU-${1000 + index}`,
        revenue: product.revenue,
        units: product.units,
        platforms,
        growth: product.growth,
      };
    });
  }, []);

  return (
    <Card hoverable padding="lg" className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top Products</CardTitle>
          <Link href="/inventory">
            <Button variant="ghost" size="sm">
              View all →
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 bg-white border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors"
            >
              {/* Rank */}
              <div className="text-lg font-bold text-[var(--text-muted)] w-8">
                #{index + 1}
              </div>

              {/* Product info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[var(--text-primary)] truncate">
                  {product.name}
                </div>
                <div className="text-xs text-[var(--text-secondary)] font-mono">
                  {product.sku}
                </div>
              </div>

              {/* Revenue & units */}
              <div className="text-right">
                <div className="font-mono font-semibold text-[var(--text-primary)]">
                  {formatCurrency(product.revenue)}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">
                  {product.units} units
                </div>
              </div>

              {/* Platform indicators */}
              <div className="flex items-center gap-1">
                {product.platforms.map((platform) => (
                  <PlatformBadge key={platform} platform={platform} variant="dot" size="md" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

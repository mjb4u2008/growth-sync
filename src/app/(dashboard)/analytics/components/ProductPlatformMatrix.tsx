"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { formatCurrencyCompact } from "@/lib/utils";
import { analyticsData } from "@/data/analytics";
import { TrendIndicator } from "./shared/TrendIndicator";
import { PlatformBadge } from "./shared/PlatformBadge";
import type { ProductPlatformData } from "../types";

/**
 * ProductPlatformMatrix - Crown jewel component!
 * Shows which platforms work best for each product
 * This is unique insight sellers can't get anywhere else
 */
export function ProductPlatformMatrix() {
  const productPlatformMatrix: ProductPlatformData[] = useMemo(() => {
    // Transform top products data to show cross-platform performance
    // TODO: Replace with real cross-platform data from API
    return analyticsData.topProducts.slice(0, 5).map((product) => {
      // Generate realistic cross-platform revenue distribution
      const totalRevenue = product.revenue;

      // Different products perform better on different platforms
      const distributions = [
        // Product 1: Best on TikTok
        { shopify: 0.3, tiktok: 0.5, amazon: 0.2, best: "tiktok" as const, growth: 38 },
        // Product 2: Best on Shopify
        { shopify: 0.55, tiktok: 0.25, amazon: 0.2, best: "shopify" as const, growth: 28 },
        // Product 3: Best on Amazon
        { shopify: 0.25, tiktok: 0.3, amazon: 0.45, best: "amazon" as const, growth: 42 },
        // Product 4: Best on Shopify
        { shopify: 0.6, tiktok: 0.25, amazon: 0.15, best: "shopify" as const, growth: 15 },
        // Product 5: Best on TikTok
        { shopify: 0.2, tiktok: 0.6, amazon: 0.2, best: "tiktok" as const, growth: 52 },
      ];

      const dist = distributions[analyticsData.topProducts.indexOf(product)] || distributions[0];

      return {
        product: product.product,
        shopify: totalRevenue * dist.shopify,
        tiktok: totalRevenue * dist.tiktok,
        amazon: totalRevenue * dist.amazon,
        bestChannel: dist.best,
        bestChannelGrowth: dist.growth,
      };
    });
  }, []);

  return (
    <Card hoverable padding="lg" className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Product × Platform Matrix</CardTitle>
        <CardDescription>
          See which channels work best for each product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2 px-3 text-sm font-medium text-[var(--text-secondary)]">
                  Product
                </th>
                <th className="text-right py-2 px-3 text-sm font-medium">
                  <div className="flex items-center justify-end gap-2 text-[var(--text-secondary)]">
                    <PlatformBadge platform="shopify" variant="dot" size="sm" />
                    Shopify
                  </div>
                </th>
                <th className="text-right py-2 px-3 text-sm font-medium">
                  <div className="flex items-center justify-end gap-2 text-[var(--text-secondary)]">
                    <PlatformBadge platform="tiktok" variant="dot" size="sm" />
                    TikTok
                  </div>
                </th>
                <th className="text-right py-2 px-3 text-sm font-medium">
                  <div className="flex items-center justify-end gap-2 text-[var(--text-secondary)]">
                    <PlatformBadge platform="amazon" variant="dot" size="sm" />
                    Amazon
                  </div>
                </th>
                <th className="text-right py-2 px-3 text-sm font-medium text-[var(--text-secondary)]">
                  Best
                </th>
              </tr>
            </thead>
            <tbody>
              {productPlatformMatrix.map((item) => (
                <tr key={item.product} className="border-b border-[var(--border)]">
                  <td className="py-3 px-3 font-medium text-[var(--text-primary)]">
                    {item.product}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-sm text-[var(--text-secondary)]">
                    {formatCurrencyCompact(item.shopify)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-sm text-[var(--text-secondary)]">
                    {formatCurrencyCompact(item.tiktok)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-sm text-[var(--text-secondary)]">
                    {formatCurrencyCompact(item.amazon)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-md">
                      <PlatformBadge platform={item.bestChannel} variant="dot" size="sm" />
                      <span className="text-xs font-medium capitalize text-green-800">
                        {item.bestChannel}
                      </span>
                      <TrendIndicator value={item.bestChannelGrowth} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

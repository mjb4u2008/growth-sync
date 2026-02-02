"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { analyticsData } from "@/data/analytics";
import { TrendIndicator } from "./shared/TrendIndicator";
import { PlatformBadge } from "./shared/PlatformBadge";
import type { PlatformHealth } from "../types";

/**
 * PlatformHealthCard - Platform comparison showing revenue, growth, AOV
 */
export function PlatformHealthCard() {
  const platformHealthData: PlatformHealth[] = useMemo(() => {
    // TODO: Replace with real data from API
    return [
      {
        platform: "shopify" as const,
        revenue: 63741.25,
        growth: 8.2,
        aov: 102.5,
        orders: 622,
      },
      {
        platform: "tiktok" as const,
        revenue: 38244.75,
        growth: 24.1, // Fastest growing
        aov: 87.3,
        orders: 438,
      },
      {
        platform: "amazon" as const,
        revenue: 19122.38,
        growth: 12.7,
        aov: 95.8,
        orders: 200,
      },
    ];
  }, []);

  return (
    <Card hoverable padding="lg">
      <CardHeader>
        <CardTitle>Platform Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {platformHealthData.map((platform) => (
            <div
              key={platform.platform}
              className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg"
            >
              <div className="flex items-center gap-3">
                <PlatformBadge platform={platform.platform} variant="pill" size="sm" />
                <div>
                  <div className="text-sm font-medium font-mono text-[var(--text-primary)]">
                    {formatCurrency(platform.revenue)}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {platform.orders} orders
                  </div>
                </div>
              </div>
              <div className="text-right">
                <TrendIndicator value={platform.growth} />
                <div className="text-xs text-[var(--text-secondary)] mt-1">
                  {formatCurrency(platform.aov)} AOV
                </div>
              </div>
              {platform.growth > 20 && (
                <span className="ml-2 text-lg" title="Hot channel!">
                  🔥
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Insight */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-green-800 font-medium">
            💡 TikTok is your fastest growing channel (+24%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendIndicator } from "./shared/TrendIndicator";
import { PlatformBadge } from "./shared/PlatformBadge";
import type { PlatformHealth } from "../types";

/**
 * PlatformComparisonCard - Platform-by-platform revenue comparison
 * Shows revenue, growth, and AOV for each platform with insights
 */
export function PlatformComparisonCard() {
  const platformHealthData: PlatformHealth[] = useMemo(() => {
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

  // Find fastest growing platform for insight
  const fastestGrowing = useMemo(() => {
    return platformHealthData.reduce((max, platform) =>
      platform.growth > max.growth ? platform : max
    );
  }, [platformHealthData]);

  return (
    <Card hoverable padding="lg">
      <CardHeader>
        <CardTitle>Platform Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {platformHealthData.map((platform) => (
            <div
              key={platform.platform}
              className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1">
                <PlatformBadge platform={platform.platform} variant="pill" size="sm" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium font-mono text-[var(--text-primary)]">
                      {formatCurrency(platform.revenue)}
                    </span>
                    <TrendIndicator value={platform.growth} />
                    {platform.growth > 20 && (
                      <span className="text-base" title="Hot channel!">
                        🔥
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {formatCurrency(platform.aov)} AOV
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic insight - shows fastest growing platform */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-900 font-medium">
            💡 {fastestGrowing.platform.charAt(0).toUpperCase() + fastestGrowing.platform.slice(1)} is your fastest growing channel (+{fastestGrowing.growth.toFixed(1)}%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

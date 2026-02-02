"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency, formatCurrencyCompact } from "@/lib/utils";
import { platformRevenueSeries, analyticsData } from "@/data/analytics";
import { TrendIndicator } from "./shared/TrendIndicator";
import { PlatformBadge } from "./shared/PlatformBadge";

/**
 * RevenueByPlatformCard - Stacked area chart showing revenue by platform
 * Smaller, side-by-side friendly version for Analytics page
 */
export function RevenueByPlatformCard() {
  // Calculate total revenue and percentages
  const { totalRevenue, change, platformPercentages } = useMemo(() => {
    const total = analyticsData.revenue.total;
    const changePercent = analyticsData.revenue.change;

    // Calculate percentages for each platform
    const shopifyTotal = platformRevenueSeries.reduce((sum, day) => sum + day.shopify, 0);
    const tiktokTotal = platformRevenueSeries.reduce((sum, day) => sum + day.tiktok, 0);
    const amazonTotal = platformRevenueSeries.reduce((sum, day) => sum + day.amazon, 0);
    const grandTotal = shopifyTotal + tiktokTotal + amazonTotal;

    return {
      totalRevenue: total,
      change: changePercent,
      platformPercentages: {
        shopify: Math.round((shopifyTotal / grandTotal) * 100),
        tiktok: Math.round((tiktokTotal / grandTotal) * 100),
        amazon: Math.round((amazonTotal / grandTotal) * 100),
      },
    };
  }, []);

  return (
    <Card hoverable padding="lg">
      <CardHeader>
        <CardTitle>Revenue by Platform</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Large metric */}
        <div className="mb-4">
          <div className="text-3xl font-bold font-mono text-[var(--text-primary)]">
            {formatCurrency(totalRevenue)}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <TrendIndicator value={change} />
            <span className="text-sm text-[var(--text-secondary)]">
              vs last period
            </span>
          </div>
        </div>

        {/* Stacked area chart - reduced height for side-by-side layout */}
        <div className="h-[200px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={platformRevenueSeries}>
              <defs>
                <linearGradient id="shopifyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#96BF48" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#96BF48" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tiktokGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F2EA" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00F2EA" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="amazonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9900" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF9900" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatCurrencyCompact}
                tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                dataKey="shopify"
                stackId="1"
                fill="url(#shopifyGradient)"
                stroke="#96BF48"
                strokeWidth={2}
                name="Shopify"
              />
              <Area
                dataKey="tiktok"
                stackId="1"
                fill="url(#tiktokGradient)"
                stroke="#00F2EA"
                strokeWidth={2}
                name="TikTok"
              />
              <Area
                dataKey="amazon"
                stackId="1"
                fill="url(#amazonGradient)"
                stroke="#FF9900"
                strokeWidth={2}
                name="Amazon"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Platform breakdown */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <PlatformBadge platform="shopify" variant="dot" />
            <span className="text-[var(--text-secondary)]">
              {platformPercentages.shopify}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PlatformBadge platform="tiktok" variant="dot" />
            <span className="text-[var(--text-secondary)]">
              {platformPercentages.tiktok}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PlatformBadge platform="amazon" variant="dot" />
            <span className="text-[var(--text-secondary)]">
              {platformPercentages.amazon}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

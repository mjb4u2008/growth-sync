"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { platformRevenueSeries } from "@/data/analytics";

const platforms = [
  { id: "shopify", label: "Shopify", color: "#96BF48", value: 63700 },
  { id: "tiktok", label: "TikTok", color: "#00F2EA", value: 38200 },
  { id: "amazon", label: "Amazon", color: "#FF9900", value: 19100 },
  { id: "instagram", label: "Instagram", color: "#E1306C", value: 6400 },
];

/**
 * Revenue Chart - Platform revenue visualization
 *
 * Swap Commerce-inspired: Clean stacked area chart with platform breakdown
 * Shows unified multi-channel revenue over time
 */
export function RevenueChart() {
  const [period, setPeriod] = useState<"30d" | "7d" | "90d">("30d");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  // Filter data based on selected platform
  const filteredData = selectedPlatform
    ? platformRevenueSeries.map((d) => ({
        ...d,
        [selectedPlatform]: d[selectedPlatform as keyof typeof d],
      }))
    : platformRevenueSeries;

  const visiblePlatforms = selectedPlatform
    ? platforms.filter((p) => p.id === selectedPlatform)
    : platforms;

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-[var(--shadow-card)] p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Revenue by Platform{" "}
          <span className="text-[var(--text-muted)] font-normal">(Last 30 Days)</span>
        </h3>

        {/* Platform filter pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedPlatform(null)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              selectedPlatform === null
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--accent-muted)]"
            }`}
          >
            All Platforms
          </button>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedPlatform === platform.id
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--accent-muted)]"
              }`}
            >
              {platform.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[320px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              {visiblePlatforms.map((platform) => (
                <linearGradient
                  key={platform.id}
                  id={`gradient-${platform.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={platform.color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={platform.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="date"
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              stroke="var(--border)"
            />
            <YAxis
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              stroke="var(--border)"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ""}
            />
            {visiblePlatforms.map((platform) => (
              <Area
                key={platform.id}
                type="monotone"
                dataKey={platform.id}
                stackId="1"
                stroke={platform.color}
                strokeWidth={2}
                fill={`url(#gradient-${platform.id})`}
                isAnimationActive={true}
                animationDuration={800}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8">
        {visiblePlatforms.map((platform) => (
          <div key={platform.id} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: platform.color }}
            />
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {platform.label}
            </span>
            <span className="text-sm text-[var(--text-muted)]">
              ${(platform.value / 1000).toFixed(1)}K
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

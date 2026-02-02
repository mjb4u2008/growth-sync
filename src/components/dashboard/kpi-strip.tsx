"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import type { KPI } from "@/data/types";

interface KPIStripProps {
  kpis: KPI[];
}

/**
 * KPI Strip - Horizontal status bar with key metrics
 *
 * Clean, compact, professional
 * Each KPI shows: label, value, change, tiny sparkline
 */
export function KPIStrip({ kpis }: KPIStripProps) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-[var(--shadow-card)] mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
        {kpis.map((kpi, index) => (
          <KPICell key={index} kpi={kpi} />
        ))}
      </div>
    </div>
  );
}

function KPICell({ kpi }: { kpi: KPI }) {
  const isPositive = kpi.trend === "up";
  const changeColor = isPositive ? "text-green-600" : "text-red-600";
  const arrow = isPositive ? "↗" : "↘";

  // Format value based on unit - NO CENTS
  const formattedValue =
    kpi.unit === "currency"
      ? `$${formatNumber(Math.round(kpi.value))}`
      : kpi.unit === "percentage"
      ? `${kpi.value.toFixed(1)}%`
      : formatNumber(kpi.value);

  // Transform sparkline data for Recharts
  const sparklineData = kpi.sparklineData?.map((value, index) => ({
    index,
    value,
  })) || [];

  return (
    <div className="px-6 py-4">
      {/* Label */}
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
        {kpi.label}
      </div>

      {/* Value and change */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">
          {formattedValue}
        </span>
        <span className={`text-sm font-medium ${changeColor}`}>
          {arrow} {Math.abs(kpi.change)}%
        </span>
      </div>

      {/* Tiny sparkline */}
      <div className="h-4 w-20 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#9CA3AF"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

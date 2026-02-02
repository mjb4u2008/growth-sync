"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, MessageSquare } from "lucide-react";
import { Counter } from "@/components/animations/counter";
import { formatNumber, formatCurrency, cn } from "@/lib/utils";
import { kpiData } from "@/data/analytics";

interface KPIVelocityProps {
  delay?: number;
}

/**
 * KPI Velocity - Compact, dense, alive metrics
 *
 * Not boring cards. Dense information, beautiful presentation.
 * Shows today's business velocity at a glance.
 */
export function KPIVelocity({ delay = 0 }: KPIVelocityProps) {
  const kpis = [
    { ...kpiData[0], icon: "📦" }, // Orders
    { ...kpiData[1], icon: "💰" }, // AOV
    { ...kpiData[2], icon: "📈" }, // Conversion
    { ...kpiData[3], icon: "👥" }, // Customers
  ];

  return (
    <div className="rounded-xl border border-border bg-bg-card p-6">
      <h3 className="text-sm font-semibold font-display text-text-primary uppercase tracking-wider mb-4">
        Today's Velocity
      </h3>

      {/* Compact KPI row */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: delay + index * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 24,
            }}
            className="text-center"
          >
            {/* Icon */}
            <div className="text-2xl mb-2">{kpi.icon}</div>

            {/* Value */}
            <div className="mb-1">
              {kpi.unit === "currency" ? (
                <span className="text-3xl font-bold font-mono text-text-primary">
                  {formatCurrency(kpi.value).replace(".00", "")}
                </span>
              ) : kpi.unit === "percentage" ? (
                <div className="flex items-center justify-center gap-0.5">
                  <span className="text-3xl font-bold font-mono text-text-primary">
                    {kpi.value.toFixed(1)}
                  </span>
                  <span className="text-2xl font-bold font-mono text-text-primary">%</span>
                </div>
              ) : (
                <span className="text-3xl font-bold font-mono text-text-primary">
                  {formatNumber(kpi.value)}
                </span>
              )}
            </div>

            {/* Label */}
            <p className="text-xs text-text-muted mb-1">{kpi.label}</p>

            {/* Change */}
            <div className="flex items-center justify-center gap-1">
              <span
                className={cn(
                  "text-xs font-semibold",
                  kpi.trend === "up"
                    ? "text-success"
                    : kpi.trend === "down"
                    ? "text-error"
                    : "text-text-muted"
                )}
              >
                {kpi.trend === "up" ? "↗" : kpi.trend === "down" ? "↘" : "→"} {Math.abs(kpi.change).toFixed(1)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Platform breakdown */}
      <div className="border-t border-border pt-4 flex items-center justify-center gap-6 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#96BF48]" />
          <span className="text-text-primary font-semibold">Shopify 234</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#00F2EA]" />
          <span className="text-text-primary font-semibold">TikTok 412</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF9900]" />
          <span className="text-text-primary font-semibold">Amazon 156</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#E1306C]" />
          <span className="text-text-primary font-semibold">IG 45</span>
        </div>
      </div>
    </div>
  );
}

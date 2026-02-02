"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Counter, AnimatedNumber } from "@/components/animations/counter";
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import type { KPI } from "@/data/types";

interface KPICardProps {
  kpi: KPI;
  icon: LucideIcon;
  delay?: number;
}

/**
 * KPI metric card with icon, value, and trend indicator
 * Cascades in after revenue card
 */
export function KPICard({ kpi, icon: Icon, delay = 0 }: KPICardProps) {
  const isPositive = kpi.trend === "up";
  const isNeutral = kpi.trend === "neutral";

  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay,
      }}
    >
      <Card hoverable padding="lg" className="h-full">
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className="p-2 rounded-lg bg-accent-light">
            <Icon className="h-5 w-5 text-accent" />
          </div>

          {/* Trend indicator */}
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive
                ? "text-success"
                : isNeutral
                ? "text-text-muted"
                : "text-error"
            }`}
          >
            <TrendIcon className="h-4 w-4" />
            <span>{Math.abs(kpi.change).toFixed(1)}%</span>
          </div>
        </div>

        {/* Label */}
        <p className="text-sm text-text-secondary mb-1">{kpi.label}</p>

        {/* Value with monospace font */}
        <div className="flex items-baseline gap-2">
          {kpi.unit === "currency" ? (
            <Counter
              value={kpi.value}
              format="currency"
              decimals={0}
              className="text-3xl font-bold font-mono text-text-primary"
              duration={0.8}
              delay={delay + 0.1}
            />
          ) : kpi.unit === "percentage" ? (
            <>
              <Counter
                value={kpi.value}
                format="none"
                decimals={1}
                className="text-3xl font-bold font-mono text-text-primary"
                duration={0.8}
                delay={delay + 0.1}
              />
              <span className="text-3xl font-bold font-mono text-text-primary">
                %
              </span>
            </>
          ) : (
            <Counter
              value={kpi.value}
              format="number"
              className="text-3xl font-bold font-mono text-text-primary"
              duration={0.8}
              delay={delay + 0.1}
            />
          )}
        </div>

        {/* Change label */}
        <p className="text-xs text-text-muted mt-1">{kpi.changeLabel}</p>
      </Card>
    </motion.div>
  );
}

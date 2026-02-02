"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Counter } from "@/components/animations/counter";
import { Badge } from "@/components/ui/badge";
import { cn, formatPercentage } from "@/lib/utils";

interface RevenueHeroCardProps {
  revenue: number;
  change: number;
  delay?: number;
}

/**
 * Large revenue card with animated counter and sparkline
 * The hero element that grabs attention on dashboard load
 */
export function RevenueHeroCard({
  revenue,
  change,
  delay = 0,
}: RevenueHeroCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      <Card
        className="relative overflow-hidden"
        accentHover
        hoverable
        padding="lg"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-light/20 to-transparent pointer-events-none" />

        <div className="relative">
          {/* Label */}
          <p className="text-sm font-medium text-text-secondary mb-2">
            Total Revenue (Last 30 Days)
          </p>

          {/* Revenue amount with animated counter */}
          <div className="flex items-end gap-4 mb-4">
            <Counter
              value={revenue}
              format="currency"
              className="text-5xl font-bold font-display text-text-primary"
              duration={1.2}
              delay={delay + 0.2}
            />

            {/* Change badge */}
            <Badge
              variant={isPositive ? "success" : "error"}
              size="lg"
              icon={
                isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )
              }
              className="mb-2"
            >
              {formatPercentage(change)}
            </Badge>
          </div>

          {/* Period selector pills */}
          <div className="flex gap-2">
            {["7 days", "30 days", "90 days"].map((period, index) => (
              <button
                key={period}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                  index === 1
                    ? "bg-accent text-white"
                    : "bg-bg-secondary text-text-secondary hover:bg-border"
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

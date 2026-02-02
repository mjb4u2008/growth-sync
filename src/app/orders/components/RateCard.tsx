"use client";

import { motion } from "framer-motion";
import { Package, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { springConfigs } from "@/lib/spring-configs";
import { cn } from "@/lib/utils";
import type { ShippingRate } from "../types";

interface RateCardProps {
  rate: ShippingRate;
  isSelected: boolean;
  onClick: () => void;
}

export function RateCard({ rate, isSelected, onClick }: RateCardProps) {
  return (
    <motion.button
      className={cn(
        "relative w-full p-4 border-2 rounded-xl text-left transition-all",
        isSelected
          ? "border-[var(--accent)] bg-[var(--accent-light)]"
          : "border-[var(--border)] hover:border-[var(--accent-muted)]"
      )}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={springConfigs.quick}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* Carrier Icon */}
          <div className="h-8 w-8 rounded-lg bg-white border border-[var(--border)] flex items-center justify-center">
            <Package className="h-4 w-4 text-[var(--text-secondary)]" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {rate.serviceName}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              {rate.estimatedDays}
            </p>
          </div>
        </div>

        {/* Badge */}
        {rate.badge && (
          <Badge
            variant={rate.badge === "best_value" ? "success" : "info"}
            size="sm"
          >
            {rate.badge === "best_value" ? "Best value" : "Fastest"}
          </Badge>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-mono text-[var(--text-primary)]">
          {formatCurrency(rate.rate)}
        </span>
        <span className="text-xs text-[var(--text-muted)]">total</span>
      </div>

      {/* Checkmark for selected */}
      {isSelected && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
        </div>
      )}
    </motion.button>
  );
}

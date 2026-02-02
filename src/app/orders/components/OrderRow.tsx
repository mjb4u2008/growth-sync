"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { PlatformBadge } from "./PlatformBadge";
import { formatCurrency } from "@/lib/utils";
import { springConfigs } from "@/lib/spring-configs";
import { useOrdersState } from "../hooks/useOrdersState";
import type { ShippingOrder } from "../types";
import { cn } from "@/lib/utils";

interface OrderRowProps {
  order: ShippingOrder;
}

export const OrderRow = memo(function OrderRow({ order }: OrderRowProps) {
  const isSelected = useOrdersState((state) =>
    state.selectedOrderIds.has(order.id)
  );
  const toggleOrderSelection = useOrdersState(
    (state) => state.toggleOrderSelection
  );

  return (
    <motion.div
      className={cn(
        "grid grid-cols-[40px_120px_1fr_120px_80px_100px_40px] gap-4 p-4 border-b border-[var(--border)] cursor-pointer transition-colors",
        isSelected && "bg-[var(--accent-muted)]",
        "hover:bg-[var(--bg-secondary)]"
      )}
      whileHover={{ x: 2 }}
      transition={springConfigs.quick}
      onClick={() => toggleOrderSelection(order.id)}
    >
      {/* Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleOrderSelection(order.id)}
          onClick={(e) => e.stopPropagation()}
          className="cursor-pointer"
        />
      </div>

      {/* Order Number */}
      <span className="text-sm font-mono text-[var(--text-primary)] flex items-center">
        {order.orderNumber}
      </span>

      {/* Customer */}
      <div className="flex items-center gap-2">
        <Avatar name={order.customer.name} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--text-primary)] truncate">
            {order.customer.name}
          </p>
          <p className="text-xs text-[var(--text-secondary)] truncate">
            {order.customer.email}
          </p>
        </div>
      </div>

      {/* Platform */}
      <div className="flex items-center">
        <PlatformBadge platform={order.platform} />
      </div>

      {/* Items */}
      <span className="text-sm text-[var(--text-secondary)] flex items-center">
        {order.items.length} {order.items.length === 1 ? "item" : "items"}
      </span>

      {/* Total */}
      <span className="text-sm font-mono font-semibold text-[var(--text-primary)] flex items-center">
        {formatCurrency(order.total)}
      </span>

      {/* Actions */}
      <button
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          // Future: Open actions menu
        }}
      >
        ⋯
      </button>
    </motion.div>
  );
});

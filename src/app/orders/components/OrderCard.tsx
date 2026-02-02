"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { PlatformBadge } from "./PlatformBadge";
import { formatCurrency } from "@/lib/utils";
import { springConfigs } from "@/lib/spring-configs";
import { useOrdersState } from "../hooks/useOrdersState";
import type { ShippingOrder } from "../types";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: ShippingOrder;
}

export const OrderCard = memo(function OrderCard({ order }: OrderCardProps) {
  const isSelected = useOrdersState((state) =>
    state.selectedOrderIds.has(order.id)
  );
  const toggleOrderSelection = useOrdersState(
    (state) => state.toggleOrderSelection
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfigs.gentle}
    >
      <Card
        clickable
        className={cn(
          "cursor-pointer transition-all",
          isSelected && "ring-2 ring-accent bg-accent-muted"
        )}
        onClick={() => toggleOrderSelection(order.id)}
        padding="sm"
      >
        {/* Top section - Checkbox + Customer Info + Total */}
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <div className="pt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleOrderSelection(order.id)}
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer"
            />
          </div>

          {/* Customer Avatar */}
          <Avatar name={order.customer.name} size="sm" />

          {/* Customer Info + Order Number */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {order.customer.name}
                </p>
                <p className="text-xs text-text-muted font-mono truncate">
                  {order.orderNumber}
                </p>
              </div>

              {/* Total */}
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-mono font-semibold text-text-primary">
                  {formatCurrency(order.total)}
                </p>
                <p className="text-xs text-text-secondary">
                  {order.items.length} {order.items.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - Platform + Email */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <PlatformBadge platform={order.platform} />
          <p className="text-xs text-text-muted truncate flex-1 text-right">
            {order.customer.email}
          </p>
        </div>
      </Card>
    </motion.div>
  );
});

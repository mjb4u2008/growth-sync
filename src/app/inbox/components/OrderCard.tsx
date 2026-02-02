"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { springConfigs } from "@/lib/spring-configs";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { Order } from "../types";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfigs.quick}
      className="p-2.5 border border-[var(--border)] rounded-lg hover:border-[var(--accent-muted)] transition-colors bg-white"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-mono text-[var(--text-secondary)]">{order.orderNumber}</span>
        <span className="text-xs font-semibold font-mono text-[var(--text-primary)]">
          {formatCurrency(order.total)}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <Badge variant={order.status === 'delivered' ? 'success' : 'neutral'} size="sm">
          {order.status}
        </Badge>
        <span className="text-[10px] text-[var(--text-muted)]">
          {formatRelativeTime(order.createdAt)}
        </span>
      </div>
    </motion.div>
  );
}

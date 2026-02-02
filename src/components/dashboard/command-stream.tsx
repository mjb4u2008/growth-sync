"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Package,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Truck,
  RefreshCw,
  DollarSign,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PulseDot } from "@/components/animations/pulse-dot";
import { formatRelativeTime } from "@/lib/utils";
import { needsAttention, activityFeed } from "@/data/analytics";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "urgent" | "platforms";

const platformColors = {
  shopify: "#22A861",
  tiktok: "#00F2EA",
  amazon: "#FF9900",
  email: "#EA4335",
  custom: "#6B7280",
};

const activityIcons = {
  order_placed: Package,
  order_shipped: Truck,
  order_delivered: CheckCircle2,
  ticket_created: MessageSquare,
  ticket_resolved: CheckCircle2,
  inventory_synced: RefreshCw,
  low_stock_alert: AlertTriangle,
  refund_issued: DollarSign,
  customer_signup: UserPlus,
};

interface CommandStreamProps {
  delay?: number;
}

/**
 * Unified command stream - replaces separate "Needs Attention" and "Activity Feed"
 * Feels ALIVE - items flow in, urgent items pulse, everything is actionable
 */
export function CommandStream({ delay = 0 }: CommandStreamProps) {
  const [filter, setFilter] = useState<FilterTab>("all");

  // Combine needs attention (urgent) + activity feed into one stream
  const urgentItems = needsAttention.map((item) => ({
    id: item.id,
    type: "urgent" as const,
    title: item.title,
    description: item.description,
    timestamp: item.timestamp,
    urgency: item.urgency,
    actionLabel: item.actionLabel,
    actionUrl: item.actionUrl,
    platform: "system" as const,
  }));

  const activityItems = activityFeed.map((item) => ({
    id: item.id,
    type: "activity" as const,
    title: item.title,
    description: item.description,
    timestamp: item.timestamp,
    activityType: item.type,
    platform: "system" as const,
  }));

  const allItems = [...urgentItems, ...activityItems].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  const filteredItems =
    filter === "urgent"
      ? allItems.filter((item) => item.type === "urgent")
      : allItems;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative"
    >
      {/* Header with filters */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-display text-text-primary mb-4">
          Command Stream
        </h2>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {[
            { value: "all" as const, label: "All Activity" },
            { value: "urgent" as const, label: "Urgent Only" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                filter === tab.value
                  ? "bg-accent text-white shadow-sm"
                  : "bg-bg-secondary text-text-secondary hover:bg-border hover:text-text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stream container */}
      <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const isUrgent = item.type === "urgent";
            const urgencyColor =
              isUrgent && "urgency" in item
                ? item.urgency === "critical"
                  ? "error"
                  : item.urgency === "high"
                  ? "warning"
                  : "info"
                : undefined;

            const Icon =
              "activityType" in item
                ? activityIcons[item.activityType]
                : AlertTriangle;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  delay: delay + 0.1 + index * 0.03,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                whileHover={{
                  x: 4,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                className={cn(
                  "relative rounded-lg border bg-bg-card p-4 cursor-pointer transition-shadow",
                  isUrgent
                    ? "border-l-4"
                    : "border-l-4 border-l-transparent hover:border-l-accent"
                )}
                style={{
                  borderLeftColor: isUrgent
                    ? urgencyColor === "error"
                      ? "#EF4444"
                      : urgencyColor === "warning"
                      ? "#F59E0B"
                      : "#3B82F6"
                    : undefined,
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="relative">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        isUrgent ? "bg-red-50" : "bg-accent-light"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          isUrgent ? "text-error" : "text-accent"
                        )}
                      />
                    </div>
                    {isUrgent && urgencyColor && (
                      <div className="absolute -top-1 -right-1">
                        <PulseDot variant={urgencyColor} size="sm" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted mb-2 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted">
                        {formatRelativeTime(item.timestamp)}
                      </span>

                      {isUrgent && "actionLabel" in item && item.actionLabel && (
                        <Link href={item.actionUrl || "#"}>
                          <Button variant="ghost" size="sm">
                            {item.actionLabel}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
            <p className="text-text-secondary">All caught up! No urgent items.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

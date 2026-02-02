"use client";

import { motion } from "framer-motion";
import {
  Package,
  CheckCircle2,
  Truck,
  RefreshCw,
  AlertTriangle,
  DollarSign,
  UserPlus,
  Activity as ActivityIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils";
import { activityFeed } from "@/data/analytics";

interface ActivityFeedProps {
  delay?: number;
}

const activityIcons = {
  order_placed: Package,
  order_shipped: Truck,
  order_delivered: CheckCircle2,
  ticket_created: ActivityIcon,
  ticket_resolved: CheckCircle2,
  inventory_synced: RefreshCw,
  low_stock_alert: AlertTriangle,
  refund_issued: DollarSign,
  customer_signup: UserPlus,
};

const activityColors = {
  order_placed: "text-info",
  order_shipped: "text-warning",
  order_delivered: "text-success",
  ticket_created: "text-info",
  ticket_resolved: "text-success",
  inventory_synced: "text-accent",
  low_stock_alert: "text-error",
  refund_issued: "text-warning",
  customer_signup: "text-accent",
};

/**
 * Real-time activity feed showing recent events
 * Slides in from the right after KPI cards
 */
export function ActivityFeed({ delay = 0 }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      <Card padding="none" className="h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold font-display text-text-primary">
              Recent Activity
            </h2>
          </div>
          <p className="text-sm text-text-muted mt-1">Live business events</p>
        </div>

        {/* Timeline */}
        <div className="px-6 py-4 space-y-4 max-h-[600px] overflow-y-auto">
          {activityFeed.map((activity, index) => {
            const Icon = activityIcons[activity.type];
            const colorClass = activityColors[activity.type];

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: delay + 0.1 + index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                className="flex gap-3 relative"
              >
                {/* Timeline line */}
                {index < activityFeed.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-border" />
                )}

                {/* Icon */}
                <div className={`relative z-10 p-2 rounded-full bg-bg-secondary ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-1">
                  <p className="text-sm font-medium text-text-primary">
                    {activity.title}
                  </p>
                  <p className="text-sm text-text-muted mt-0.5">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-text-muted">
                      {formatRelativeTime(activity.timestamp)}
                    </span>
                    {activity.actor && (
                      <>
                        <span className="text-xs text-text-muted">•</span>
                        <span className="text-xs text-text-muted">
                          {activity.actor}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}

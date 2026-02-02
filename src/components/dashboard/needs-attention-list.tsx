"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle, Package, MessageSquare, DollarSign, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PulseDot } from "@/components/animations/pulse-dot";
import { formatRelativeTime } from "@/lib/utils";
import { needsAttention } from "@/data/analytics";

interface NeedsAttentionListProps {
  delay?: number;
}

const typeIcons = {
  low_stock: Package,
  ticket: MessageSquare,
  refund: DollarSign,
  sync_error: AlertTriangle,
};

const urgencyColors = {
  critical: "error" as const,
  high: "warning" as const,
  medium: "info" as const,
};

/**
 * List of items requiring immediate attention
 * Slides in from the left after KPI cards
 */
export function NeedsAttentionList({ delay = 0 }: NeedsAttentionListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
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
            <AlertCircle className="h-5 w-5 text-error" />
            <h2 className="text-lg font-semibold font-display text-text-primary">
              Needs Attention
            </h2>
          </div>
          <p className="text-sm text-text-muted mt-1">
            {needsAttention.length} items require action
          </p>
        </div>

        {/* List */}
        <div className="divide-y divide-border">
          {needsAttention.map((item, index) => {
            const Icon = typeIcons[item.type];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: delay + 0.1 + index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                whileHover={{ backgroundColor: "rgba(250, 250, 248, 0.5)" }}
                className="px-6 py-4 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Icon with urgency dot */}
                  <div className="relative">
                    <div className="p-2 rounded-lg bg-bg-secondary">
                      <Icon className="h-4 w-4 text-text-secondary" />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <PulseDot
                        variant={urgencyColors[item.urgency]}
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-muted mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-text-muted">
                        {formatRelativeTime(item.timestamp)}
                      </span>
                      {item.actionLabel && (
                        <Link href={item.actionUrl!}>
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
        </div>
      </Card>
    </motion.div>
  );
}

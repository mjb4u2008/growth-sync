"use client";

import { motion } from "framer-motion";
import { formatRelativeTime } from "@/lib/utils";
import { activityFeed } from "@/data/analytics";

interface LiveFeedProps {
  delay?: number;
}

/**
 * Live Feed - Compact activity stream
 *
 * Recent events in a tight, dense list. Always fresh, always moving.
 */
export function LiveFeed({ delay = 0 }: LiveFeedProps) {
  const platformColors: Record<string, string> = {
    shopify: "#96BF48",
    tiktok: "#00F2EA",
    amazon: "#FF9900",
    instagram: "#E1306C",
  };

  return (
    <div className="rounded-xl border border-border bg-bg-card p-6">
      <h3 className="text-sm font-semibold font-display text-text-primary uppercase tracking-wider mb-4">
        Live Feed
      </h3>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {activityFeed.slice(0, 8).map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: delay + index * 0.03,
              type: "spring",
              stiffness: 300,
              damping: 24,
            }}
            className="flex items-center gap-2 p-2 rounded hover:bg-bg-secondary/50 transition-colors cursor-pointer"
          >
            {/* Platform dot */}
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: platformColors.shopify }}
            />

            {/* Content */}
            <p className="text-xs text-text-primary flex-1 line-clamp-1">
              {activity.title}
            </p>

            {/* Time */}
            <span className="text-[10px] font-mono text-text-muted flex-shrink-0">
              {formatRelativeTime(activity.timestamp)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

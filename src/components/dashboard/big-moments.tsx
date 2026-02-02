"use client";

import { motion } from "framer-motion";
import { Flame, Crown, TrendingUp, AlertTriangle } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

const moments = [
  {
    id: "moment_1",
    icon: Flame,
    color: "#EF4444",
    title: "Bestseller alert",
    description: "Black Hoodie XL sold out on TikTok",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "moment_2",
    icon: Crown,
    color: "#F59E0B",
    title: "VIP customer returned",
    description: "Sarah Chen just placed 5th order ($2,340 LTV)",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "moment_3",
    icon: TrendingUp,
    color: "#22A861",
    title: "Unusual spike",
    description: "TikTok orders 3x normal Thursday average",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "moment_4",
    icon: AlertTriangle,
    color: "#F59E0B",
    title: "Inventory warning",
    description: "5 SKUs below safety stock",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
];

interface BigMomentsProps {
  delay?: number;
}

/**
 * Big Moments - Intelligence card
 *
 * This is where the canonical data layer shines.
 * Cross-platform insights that feel like having a smart analyst whispering in your ear.
 */
export function BigMoments({ delay = 0 }: BigMomentsProps) {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-6">
      <h3 className="text-sm font-semibold font-display text-text-primary uppercase tracking-wider mb-4">
        Big Moments
      </h3>

      <div className="space-y-3">
        {moments.map((moment, index) => {
          const Icon = moment.icon;

          return (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: delay + index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              whileHover={{ x: 4 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-secondary/50 transition-colors cursor-pointer border-l-2"
              style={{ borderLeftColor: moment.color }}
            >
              {/* Icon */}
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${moment.color}15` }}
              >
                <Icon className="h-4 w-4" style={{ color: moment.color }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-text-primary mb-0.5">
                  {moment.title}
                </h4>
                <p className="text-xs text-text-muted mb-1">
                  {moment.description}
                </p>
                <p className="text-[10px] font-mono text-text-muted">
                  {formatRelativeTime(moment.timestamp)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

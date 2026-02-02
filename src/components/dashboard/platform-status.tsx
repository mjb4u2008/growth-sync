"use client";

import { motion } from "framer-motion";
import { PulseDot } from "@/components/animations/pulse-dot";
import { formatNumber } from "@/lib/utils";

interface Platform {
  name: string;
  color: string;
  orders: number;
  lastSync: string;
  status: "synced" | "syncing" | "error";
}

const platforms: Platform[] = [
  { name: "TikTok", color: "#00F2EA", orders: 847, lastSync: "30s ago", status: "synced" },
  { name: "Shopify", color: "#22A861", orders: 234, lastSync: "45s ago", status: "synced" },
  { name: "Amazon", color: "#FF9900", orders: 156, lastSync: "2m ago", status: "synced" },
  { name: "Gmail", color: "#EA4335", orders: 12, lastSync: "watching", status: "synced" },
];

interface PlatformStatusProps {
  delay?: number;
}

/**
 * Platform health status - shows sync status and activity for each connected platform
 * Horizontal rows with pulsing dots and real-time sync times
 */
export function PlatformStatus({ delay = 0 }: PlatformStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="space-y-3"
    >
      {platforms.map((platform, index) => (
        <motion.div
          key={platform.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: delay + 0.1 + index * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          whileHover={{
            x: 4,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
          className="flex items-center gap-4 p-4 rounded-lg bg-bg-card border border-border transition-all cursor-pointer"
        >
          {/* Pulsing status dot */}
          <div className="relative flex items-center justify-center w-8">
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: platform.color }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            />
          </div>

          {/* Platform name */}
          <div className="w-20">
            <span className="text-sm font-mono font-medium text-text-primary">
              {platform.name}
            </span>
          </div>

          {/* Separator */}
          <div className="h-4 w-px bg-border" />

          {/* Orders today */}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm text-text-muted">
              {formatNumber(platform.orders)} orders today
            </span>
          </div>

          {/* Separator */}
          <div className="h-4 w-px bg-border" />

          {/* Last sync */}
          <div className="flex items-center gap-2 w-32">
            {platform.status === "syncing" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full"
              />
            )}
            <span className="text-xs text-text-muted">
              Last sync {platform.lastSync}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

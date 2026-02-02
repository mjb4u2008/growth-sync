"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { needsAttention } from "@/data/analytics";

interface Platform {
  name: string;
  color: string;
  lastSync: string;
}

const platforms: Platform[] = [
  { name: "TikTok", color: "#00F2EA", lastSync: "30s ago" },
  { name: "Shopify", color: "#22A861", lastSync: "45s ago" },
  { name: "Amazon", color: "#FF9900", lastSync: "2m ago" },
  { name: "Email", color: "#EA4335", lastSync: "watching" },
];

interface HealthStatusProps {
  delay?: number;
}

/**
 * Massive health status hero - dominates the viewport
 * The first thing users see. In 2 seconds they know: healthy or needs attention.
 */
export function HealthStatus({ delay = 0 }: HealthStatusProps) {
  const urgentItems = needsAttention.filter((item) => item.urgency === "critical" || item.urgency === "high");
  const isHealthy = urgentItems.length === 0;

  const statusColor = isHealthy ? "#22A861" : urgentItems.length <= 2 ? "#F59E0B" : "#EF4444";
  const statusText = isHealthy ? "HEALTHY" : `${urgentItems.length} ${urgentItems.length === 1 ? "ITEM NEEDS" : "ITEMS NEED"} YOU`;
  const statusSubtext = isHealthy ? "All systems operational" : "Urgent actions required";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative"
    >
      {/* Card with status-colored glow */}
      <div
        className={cn(
          "relative rounded-2xl border bg-bg-card p-12 overflow-hidden transition-shadow duration-1000",
          isHealthy ? "border-success/20" : "border-error/20"
        )}
        style={{
          boxShadow: `0 8px 40px ${statusColor}15, 0 0 80px ${statusColor}08`,
        }}
      >
        {/* Subtle gradient background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${statusColor}, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center text-center">
          {/* Massive pulsing status dot */}
          <div className="relative mb-6">
            {/* Outer pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: statusColor }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main status dot */}
            <motion.div
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: statusColor,
                boxShadow: `0 0 30px ${statusColor}60, 0 0 60px ${statusColor}30`,
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {isHealthy ? (
                <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
              ) : (
                <AlertCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
              )}
            </motion.div>
          </div>

          {/* Status text */}
          <motion.h1
            className="text-5xl font-bold font-display mb-3"
            style={{ color: statusColor }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2, duration: 0.4 }}
          >
            {statusText}
          </motion.h1>

          <motion.p
            className="text-lg text-text-secondary mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.4 }}
          >
            {statusSubtext}
          </motion.p>

          {/* Platform sync status */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.4, duration: 0.4 }}
          >
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: delay + 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
              >
                {/* Platform dot */}
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: platform.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                />
                <span className="text-sm font-medium text-text-primary">
                  {platform.name}
                </span>
                <span className="text-xs text-text-muted">
                  {platform.lastSync}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick actions for urgent items (if any) */}
          {!isHealthy && urgentItems.length > 0 && (
            <motion.div
              className="mt-8 flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.9, duration: 0.4 }}
            >
              {urgentItems.slice(0, 3).map((item) => (
                <motion.button
                  key={item.id}
                  className="px-4 py-2 rounded-lg bg-bg-secondary hover:bg-border transition-colors text-sm font-medium text-text-primary"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.title}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInboxState } from "../hooks/useInboxState";
import { formatNumber } from "@/lib/utils";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";

/**
 * InboxHeader - Page title with queue stats and action buttons
 */
export function InboxHeader() {
  const conversations = useInboxState((state) => state.conversations);

  // Calculate stats from conversations using useMemo to prevent infinite loops
  const queueCounts = useMemo(() => {
    return {
      urgent: conversations.filter((c) => c.queue === "urgent").length,
      open: conversations.filter((c) => c.queue === "open").length,
      pending: conversations.filter((c) => c.queue === "pending").length,
      done: conversations.filter((c) => c.queue === "done").length,
    };
  }, [conversations]);

  // Calculate average response time (mock calculation)
  const avgResponseTime = "2.4h";

  const stats = [
    {
      label: "Open",
      value: formatNumber(queueCounts.open),
      color: "text-[var(--text-primary)]",
      bgColor: "bg-blue-50",
    },
    {
      label: "Urgent",
      value: formatNumber(queueCounts.urgent),
      color: queueCounts.urgent > 0 ? "text-red-600" : "text-[var(--text-primary)]",
      bgColor: queueCounts.urgent > 0 ? "bg-red-50" : "bg-gray-50",
    },
    {
      label: "Pending",
      value: formatNumber(queueCounts.pending),
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Avg Response",
      value: avgResponseTime,
      color: "text-[var(--accent)]",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="mb-6">
      {/* Title and actions */}
      <div className="flex items-start justify-between mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfigs.gentle}
        >
          <h1 className="text-2xl font-bold font-display text-[var(--text-primary)]">
            Inbox
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage customer conversations across all channels
          </p>
        </motion.div>

        <motion.div
          className="hidden sm:flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfigs.gentle, delay: 0.1 }}
        >
          <Button
            variant="secondary"
            size="md"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Refresh
          </Button>
          <Button
            variant="secondary"
            size="md"
            leftIcon={<Settings className="w-4 h-4" />}
          >
            Settings
          </Button>
        </motion.div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`${stat.bgColor} border border-[var(--border)] rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...springConfigs.bouncy,
              delay: index * staggerDelays.normal,
            }}
          >
            <div className={`text-3xl font-bold font-display ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

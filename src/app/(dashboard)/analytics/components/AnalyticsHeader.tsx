"use client";

import { motion } from "framer-motion";
import { useAnalyticsState } from "../store";
import { springConfigs } from "@/lib/spring-configs";
import type { Period } from "../types";

/**
 * AnalyticsHeader - Page title with period selector
 */
export function AnalyticsHeader() {
  const selectedPeriod = useAnalyticsState((state) => state.selectedPeriod);
  const setPeriod = useAnalyticsState((state) => state.setPeriod);

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfigs.gentle}
        >
          <h1 className="text-2xl font-bold font-display text-[var(--text-primary)]">
            Analytics
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Your unified business performance
          </p>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfigs.gentle, delay: 0.1 }}
        >
          <select
            value={selectedPeriod}
            onChange={(e) => setPeriod(e.target.value as Period)}
            className="px-4 py-2 bg-white border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors cursor-pointer"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </motion.div>
      </div>
    </div>
  );
}

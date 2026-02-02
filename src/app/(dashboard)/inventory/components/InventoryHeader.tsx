"use client";

import { motion } from "framer-motion";
import { RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInventoryState } from "../store";
import { formatNumber } from "@/lib/utils";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";

/**
 * InventoryHeader - Page title with summary stats and action buttons
 */
export function InventoryHeader() {
  const summary = useInventoryState((state) => state.summary);
  const isRefreshing = useInventoryState((state) => state.isRefreshing);
  const refreshInventory = useInventoryState((state) => state.refreshInventory);

  const handleExport = () => {
    // TODO: Implement CSV export
    console.log("Export CSV");
  };

  const stats = [
    {
      label: "Products",
      value: formatNumber(summary.totalProducts),
      color: "text-[var(--text-primary)]",
    },
    {
      label: "Low Stock",
      value: formatNumber(summary.lowStockCount),
      color: "text-yellow-600",
    },
    {
      label: "Out of Stock",
      value: formatNumber(summary.outOfStockCount),
      color: "text-red-600",
    },
    {
      label: "Out of Sync",
      value: formatNumber(summary.outOfSyncCount),
      color: "text-orange-600",
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
            Inventory
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage stock across all your platforms
          </p>
        </motion.div>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfigs.gentle, delay: 0.1 }}
        >
          <Button
            variant="secondary"
            size="md"
            onClick={refreshInventory}
            leftIcon={
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            }
            disabled={isRefreshing}
          >
            Refresh
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={handleExport}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
        </motion.div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white border border-[var(--border)] rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...springConfigs.bouncy,
              delay: index * staggerDelays.normal,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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

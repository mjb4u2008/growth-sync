"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronDown, ChevronUp, Eye, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInventoryState } from "../store";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";

/**
 * AttentionPanel - Shows products that need immediate attention
 * Types: Low stock, Out of stock, Out of sync, Unlinked
 */
export function AttentionPanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const attentionItems = useInventoryState((state) => state.attentionItems);
  const openSyncModal = useInventoryState((state) => state.openSyncModal);
  const openAdjustmentModal = useInventoryState((state) => state.openAdjustmentModal);

  // Filter out dismissed items
  const visibleItems = attentionItems.filter((item) => !dismissedIds.has(item.id));

  // Limit to 5 items when not expanded
  const displayItems = isExpanded ? visibleItems : visibleItems.slice(0, 3);

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => new Set([...prev, id]));
  };

  const handleSync = (productId: string, platform: string) => {
    // Sync to the first platform that's out of sync
    openSyncModal(productId, platform as any);
  };

  const handleView = (productId: string) => {
    // Could navigate to product detail or open adjustment modal
    openAdjustmentModal(productId);
  };

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mb-6 bg-orange-50 border border-orange-200 rounded-xl p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfigs.gentle}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </motion.div>
          <h3 className="font-semibold text-[var(--text-primary)]">
            {visibleItems.length} product{visibleItems.length !== 1 ? "s" : ""} need attention
          </h3>
        </div>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-[var(--accent)] hover:text-[var(--accent-dark)] flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springConfigs.quick}
        >
          {isExpanded ? (
            <>
              Collapse <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              View All <ChevronDown className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>

      {/* Items */}
      <AnimatePresence mode="popLayout">
        <div className="space-y-2">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{
                ...springConfigs.bouncy,
                delay: index * staggerDelays.tight,
              }}
              className="bg-white border border-[var(--border)] rounded-lg p-3 flex items-center justify-between hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-[var(--text-primary)] truncate">
                    {item.product.title}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    {item.product.sku}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{item.message}</p>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {item.type === "out_of_sync" && item.platforms && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSync(item.productId, item.platforms![0].platform)}
                    leftIcon={<RefreshCw className="w-3 h-3" />}
                  >
                    Sync
                  </Button>
                )}

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleView(item.productId)}
                  leftIcon={<Eye className="w-3 h-3" />}
                >
                  View
                </Button>

                <motion.button
                  onClick={() => handleDismiss(item.id)}
                  className="p-1 hover:bg-[var(--bg-secondary)] rounded transition-colors"
                  title="Dismiss"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={springConfigs.quick}
                >
                  <X className="w-4 h-4 text-[var(--text-muted)]" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {!isExpanded && visibleItems.length > 3 && (
        <motion.button
          onClick={() => setIsExpanded(true)}
          className="mt-2 text-sm text-[var(--accent)] hover:text-[var(--accent-dark)] w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Show {visibleItems.length - 3} more
        </motion.button>
      )}
    </motion.div>
  );
}

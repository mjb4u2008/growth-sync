"use client";

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInventoryState } from "../store";
import { springConfigs } from "@/lib/spring-configs";

/**
 * SyncModal - Confirmation dialog before syncing to platform
 * Shows: Current in RM Growth, Current on platform
 * Warning if big difference (>20%)
 */
export function SyncModal() {
  const syncModalOpen = useInventoryState((state) => state.syncModalOpen);
  const syncProductId = useInventoryState((state) => state.syncProductId);
  const syncPlatform = useInventoryState((state) => state.syncPlatform);
  const closeSyncModal = useInventoryState((state) => state.closeSyncModal);
  const syncToPlatform = useInventoryState((state) => state.syncToPlatform);
  const products = useInventoryState((state) => state.products);

  if (!syncModalOpen || !syncProductId || !syncPlatform || typeof window === "undefined") return null;

  const product = products.find((p) => p.id === syncProductId);
  if (!product) return null;

  const platformData = product.platforms.find((p) => p.platform === syncPlatform);
  if (!platformData) return null;

  const currentInRM = product.ats;
  const currentOnPlatform = platformData.quantity;
  const difference = currentInRM - currentOnPlatform;
  const percentDifference = currentOnPlatform === 0
    ? 100
    : Math.abs((difference / currentOnPlatform) * 100);
  const hasWarning = percentDifference > 20;

  const handleConfirm = () => {
    syncToPlatform(syncProductId, syncPlatform);
    closeSyncModal();
  };

  const platformNames = {
    shopify: "Shopify",
    tiktok: "TikTok",
    amazon: "Amazon",
  };

  return createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeSyncModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          className="bg-white rounded-xl shadow-lg w-full max-w-md pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={springConfigs.bouncy}
        >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Sync to {platformNames[syncPlatform]}
          </h2>
          <button
            onClick={closeSyncModal}
            className="p-1 hover:bg-[var(--bg-secondary)] rounded transition-colors"
          >
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Product Info */}
          <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
            <div className="font-medium text-sm text-[var(--text-primary)]">
              {product.title}
            </div>
            <div className="text-xs text-[var(--text-secondary)] font-mono mt-1">
              SKU: {product.sku}
            </div>
          </div>

          {/* Quantities Comparison */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
              <span className="text-sm text-[var(--text-secondary)]">
                Current in RM Growth
              </span>
              <span className="text-lg font-bold font-mono text-[var(--text-primary)]">
                {currentInRM}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
              <span className="text-sm text-[var(--text-secondary)]">
                Current on {platformNames[syncPlatform]}
              </span>
              <span className="text-lg font-bold font-mono text-[var(--text-primary)]">
                {currentOnPlatform}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-900 font-medium">
                Will update to
              </span>
              <span className="text-lg font-bold font-mono text-blue-900">
                {currentInRM}
              </span>
            </div>
          </div>

          {/* Warning */}
          {hasWarning && (
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-yellow-900">
                  Large difference detected
                </div>
                <div className="text-sm text-yellow-800 mt-1">
                  This is a {percentDifference.toFixed(0)}% change ({difference > 0 ? "+" : ""}
                  {difference} units). Please verify this is correct before proceeding.
                </div>
              </div>
            </div>
          )}

          {/* Confirmation Message */}
          <div className="text-sm text-[var(--text-secondary)]">
            This will push the RM Growth quantity ({currentInRM}) to {platformNames[syncPlatform]}.
            The platform inventory will be updated immediately.
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={closeSyncModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleConfirm}
              className="flex-1"
            >
              Confirm Sync
            </Button>
          </div>
        </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

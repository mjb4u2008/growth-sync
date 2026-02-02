"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { springConfigs } from "@/lib/spring-configs";
import { useOrdersState } from "../hooks/useOrdersState";

export function SuccessToast() {
  const purchaseSuccess = useOrdersState((state) => state.purchaseSuccess);
  const rateShoppingOrderIds = useOrdersState(
    (state) => state.rateShoppingOrderIds
  );

  return (
    <AnimatePresence>
      {purchaseSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={springConfigs.smooth}
          className="fixed top-8 right-8 p-4 bg-white border border-[var(--border)] rounded-xl shadow-lg flex items-center gap-3 z-50"
        >
          <div className="h-8 w-8 rounded-full bg-[var(--accent-light)] flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Successfully purchased {rateShoppingOrderIds.length} label
              {rateShoppingOrderIds.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Tracking numbers will be synced to your platforms
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

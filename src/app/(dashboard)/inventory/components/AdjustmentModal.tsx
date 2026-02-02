"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInventoryState } from "../store";
import { springConfigs } from "@/lib/spring-configs";
import type { AdjustmentType, AdjustmentReason } from "../types";

/**
 * AdjustmentModal - Manual inventory adjustment interface
 * Types: Add / Remove / Set
 * Reasons: Recount, Damaged, Return, Sold, Other
 */
export function AdjustmentModal() {
  const adjustmentModalOpen = useInventoryState((state) => state.adjustmentModalOpen);
  const adjustmentProductId = useInventoryState((state) => state.adjustmentProductId);
  const closeAdjustmentModal = useInventoryState((state) => state.closeAdjustmentModal);
  const adjustInventory = useInventoryState((state) => state.adjustInventory);
  const products = useInventoryState((state) => state.products);

  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>("add");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState<AdjustmentReason>("recount");
  const [notes, setNotes] = useState("");

  if (!adjustmentModalOpen || !adjustmentProductId || typeof window === "undefined") return null;

  const product = products.find((p) => p.id === adjustmentProductId);
  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseInt(amount, 10);
    if (isNaN(numAmount) || numAmount <= 0) return;

    let adjustment = 0;
    switch (adjustmentType) {
      case "add":
        adjustment = numAmount;
        break;
      case "remove":
        adjustment = -numAmount;
        break;
      case "set":
        adjustment = numAmount - product.ats;
        break;
    }

    adjustInventory(adjustmentProductId, adjustment);

    // Reset and close
    setAmount("");
    setReason("recount");
    setNotes("");
    closeAdjustmentModal();
  };

  const reasonOptions: { value: AdjustmentReason; label: string }[] = [
    { value: "recount", label: "Physical Recount" },
    { value: "damaged", label: "Damaged Goods" },
    { value: "return", label: "Customer Return" },
    { value: "sold", label: "Sold Offline" },
    { value: "other", label: "Other" },
  ];

  return createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeAdjustmentModal}
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
            Adjust Inventory
          </h2>
          <button
            onClick={closeAdjustmentModal}
            className="p-1 hover:bg-[var(--bg-secondary)] rounded transition-colors"
          >
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Product Info */}
          <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
            <div className="font-medium text-sm text-[var(--text-primary)]">
              {product.title}
            </div>
            <div className="text-xs text-[var(--text-secondary)] font-mono mt-1">
              SKU: {product.sku}
            </div>
            <div className="text-sm text-[var(--text-secondary)] mt-2">
              Current quantity: <span className="font-semibold text-[var(--text-primary)]">{product.ats}</span>
            </div>
          </div>

          {/* Adjustment Type */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Adjustment Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAdjustmentType("add")}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  adjustmentType === "add"
                    ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]"
                    : "border-[var(--border)] hover:border-[var(--accent)]"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add</span>
              </button>
              <button
                type="button"
                onClick={() => setAdjustmentType("remove")}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  adjustmentType === "remove"
                    ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]"
                    : "border-[var(--border)] hover:border-[var(--accent)]"
                }`}
              >
                <Minus className="w-4 h-4" />
                <span className="text-sm font-medium">Remove</span>
              </button>
              <button
                type="button"
                onClick={() => setAdjustmentType("set")}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  adjustmentType === "set"
                    ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]"
                    : "border-[var(--border)] hover:border-[var(--accent)]"
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Set</span>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              {adjustmentType === "set" ? "New Quantity" : "Amount"}
            </label>
            <input
              id="amount"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter amount..."
              className="w-full px-4 py-2 bg-white border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
            />
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Reason
            </label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value as AdjustmentReason)}
              required
              className="w-full px-4 py-2 bg-white border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors cursor-pointer"
            >
              {reasonOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes (if Other selected) */}
          {reason === "other" && (
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
                placeholder="Please provide details..."
                rows={3}
                className="w-full px-4 py-2 bg-white border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors resize-none"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={closeAdjustmentModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="flex-1"
              disabled={!amount || (reason === "other" && !notes)}
            >
              Apply Adjustment
            </Button>
          </div>
        </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

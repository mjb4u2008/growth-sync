"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useOrdersState } from "../hooks/useOrdersState";
import { RateCard } from "./RateCard";
import { X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function RateShoppingModal() {
  const [mounted, setMounted] = useState(false);

  // Must check mounted for SSR compatibility
  useEffect(() => {
    setMounted(true);
  }, []);

  const isOpen = useOrdersState(state => state.isRateShoppingModalOpen);
  const closeModal = useOrdersState(state => state.closeRateShoppingModal);
  const rateShoppingOrderIds = useOrdersState(state => state.rateShoppingOrderIds);
  const orders = useOrdersState(state => state.orders);
  const availableRates = useOrdersState(state => state.availableRates);
  const selectedRate = useOrdersState(state => state.selectedRate);
  const selectRate = useOrdersState(state => state.selectRate);
  const isLoadingRates = useOrdersState(state => state.isLoadingRates);
  const isPurchasingLabels = useOrdersState(state => state.isPurchasingLabels);
  const purchaseLabels = useOrdersState(state => state.purchaseLabels);

  const selectedOrders = orders.filter(o => rateShoppingOrderIds.includes(o.id));

  // Don't render on server or when closed
  if (!mounted || !isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-2xl shadow-xl w-full max-w-[calc(100vw-2rem)] sm:max-w-lg overflow-hidden pointer-events-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Buy Shipping Labels
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedOrders.length} order{selectedOrders.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
                {/* Orders Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                    Orders
                  </p>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto">
                    {selectedOrders.map(order => (
                      <div key={order.id} className="flex items-center justify-between text-sm">
                        <span className="font-mono text-gray-900">{order.orderNumber}</span>
                        <span className="text-gray-500">{order.customer.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Loading */}
                {isLoadingRates && (
                  <div className="py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#22A861] mx-auto mb-3" />
                    <p className="text-sm text-gray-500">Finding best rates...</p>
                  </div>
                )}

                {/* Rates */}
                {!isLoadingRates && availableRates.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                      Shipping Options
                    </p>
                    <div className="space-y-3">
                      {availableRates.map(rate => (
                        <RateCard
                          key={rate.id}
                          rate={rate}
                          isSelected={selectedRate?.id === rate.id}
                          onClick={() => selectRate(rate)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {selectedRate && (
                <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Total Cost</span>
                    <span className="text-2xl font-bold font-mono text-[#22A861]">
                      ${selectedRate.rate.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={purchaseLabels}
                      disabled={isPurchasingLabels}
                      className="flex-1 px-4 py-3 bg-[#22A861] rounded-xl text-sm font-medium text-white hover:bg-[#1e9456] transition-colors disabled:opacity-50"
                    >
                      {isPurchasingLabels ? 'Purchasing...' : `Purchase ${selectedOrders.length} Label${selectedOrders.length !== 1 ? 's' : ''}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Portal to document.body - escapes any parent constraints
  return createPortal(modalContent, document.body);
}

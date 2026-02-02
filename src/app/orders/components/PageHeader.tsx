"use client";

import { Button } from "@/components/ui/button";
import { useOrdersState } from "../hooks/useOrdersState";

export function PageHeader() {
  const selectedOrderIds = useOrdersState((state) => state.selectedOrderIds);
  const openRateShoppingModal = useOrdersState(
    (state) => state.openRateShoppingModal
  );

  const selectedCount = selectedOrderIds.size;

  const handleBuyLabels = () => {
    openRateShoppingModal(Array.from(selectedOrderIds));
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold font-display text-[var(--text-primary)]">
        Orders
      </h1>

      <div className="flex items-center gap-3">
        <Button variant="secondary" disabled>
          + Import Orders
        </Button>

        <Button
          variant="primary"
          disabled={selectedCount === 0}
          onClick={handleBuyLabels}
        >
          Buy Labels{" "}
          {selectedCount > 0 && (
            <span className="ml-1">({selectedCount})</span>
          )}{" "}
          →
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { PageHeader } from "./components/PageHeader";
import { FilterBar } from "./components/FilterBar";
import { OrdersTable } from "./components/OrdersTable";
import { RateShoppingModal } from "./components/RateShoppingModal";
import { SuccessToast } from "./components/SuccessToast";
import { KeyboardShortcutsHelp } from "./components/KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useOrdersState } from "./hooks/useOrdersState";

export default function OrdersPage() {
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  const selectedOrderIds = useOrdersState((state) => state.selectedOrderIds);
  const openRateShoppingModal = useOrdersState(
    (state) => state.openRateShoppingModal
  );
  const toggleOrderSelection = useOrdersState(
    (state) => state.toggleOrderSelection
  );
  const selectAllOrders = useOrdersState((state) => state.selectAllOrders);
  const setCurrentFilter = useOrdersState((state) => state.setCurrentFilter);
  // Get filtered orders for keyboard navigation
  const allOrders = useOrdersState((state) => state.orders);
  const currentFilter = useOrdersState((state) => state.currentFilter);
  const searchQuery = useOrdersState((state) => state.searchQuery);
  const channelFilter = useOrdersState((state) => state.channelFilter);

  // Filter orders locally for keyboard navigation (matches OrdersTable logic)
  const filteredOrders = allOrders
    .filter((o) => {
      // Filter by status
      if (currentFilter === "all") return true;
      if (currentFilter === "ready_to_ship") return o.canPurchaseLabel;
      if (currentFilter === "awaiting_shipment")
        return o.status === "awaiting_shipment" || o.status === "processing";
      if (currentFilter === "label_purchased")
        return !!o.label && o.label.status === "purchased";
      if (currentFilter === "shipped")
        return o.status === "shipped" || o.status === "delivered";
      return false;
    })
    .filter((o) => (channelFilter !== "all" ? o.platform === channelFilter : true))
    .filter((o) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(query) ||
        o.customer.name.toLowerCase().includes(query) ||
        o.customer.email.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onNavigateNext: () => {
      // Find current selected order, select next
      const currentSelected = Array.from(selectedOrderIds)[0];
      if (!currentSelected) {
        // Select first order
        if (filteredOrders.length > 0) {
          toggleOrderSelection(filteredOrders[0].id);
        }
        return;
      }

      const currentIndex = filteredOrders.findIndex(
        (o) => o.id === currentSelected
      );
      if (currentIndex < filteredOrders.length - 1) {
        toggleOrderSelection(currentSelected);
        toggleOrderSelection(filteredOrders[currentIndex + 1].id);
      }
    },
    onNavigatePrev: () => {
      // Find current selected order, select previous
      const currentSelected = Array.from(selectedOrderIds)[0];
      if (!currentSelected) {
        // Select last order
        if (filteredOrders.length > 0) {
          toggleOrderSelection(
            filteredOrders[filteredOrders.length - 1].id
          );
        }
        return;
      }

      const currentIndex = filteredOrders.findIndex(
        (o) => o.id === currentSelected
      );
      if (currentIndex > 0) {
        toggleOrderSelection(currentSelected);
        toggleOrderSelection(filteredOrders[currentIndex - 1].id);
      }
    },
    onToggleSelection: () => {
      // Toggle first order or current focus
      if (filteredOrders.length > 0) {
        const firstSelected = Array.from(selectedOrderIds)[0];
        if (firstSelected) {
          toggleOrderSelection(firstSelected);
        } else {
          toggleOrderSelection(filteredOrders[0].id);
        }
      }
    },
    onSelectAll: selectAllOrders,
    onBuyLabels: () => {
      if (selectedOrderIds.size > 0) {
        openRateShoppingModal(Array.from(selectedOrderIds));
      }
    },
    onFocusSearch: () => {
      const searchInput = document.querySelector(
        'input[type="text"]'
      ) as HTMLInputElement;
      searchInput?.focus();
    },
    onShowHelp: () => setShowKeyboardHelp(true),
    onSwitchFilter: (filter) => setCurrentFilter(filter),
  });

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-[1800px] mx-auto">
      <PageHeader />
      <FilterBar />
      <OrdersTable />

      {/* Rate Shopping Modal */}
      <RateShoppingModal />

      {/* Success Toast */}
      <SuccessToast />

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp
        open={showKeyboardHelp}
        onClose={() => setShowKeyboardHelp(false)}
      />
    </div>
  );
}

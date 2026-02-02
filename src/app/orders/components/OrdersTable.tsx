"use client";

import { useMemo } from "react";
import { OrderRow } from "./OrderRow";
import { OrderCard } from "./OrderCard";
import { EmptyState } from "./EmptyState";
import { useOrdersState } from "../hooks/useOrdersState";
import { StaggerList } from "@/components/animations/stagger-list";
import { matchesFulfillmentFilter } from "../lib/utils";

export function OrdersTable() {
  // Use individual selectors (not getter functions)
  const allOrders = useOrdersState((state) => state.orders);
  const currentFilter = useOrdersState((state) => state.currentFilter);
  const searchQuery = useOrdersState((state) => state.searchQuery);
  const channelFilter = useOrdersState((state) => state.channelFilter);
  const selectedOrderIds = useOrdersState((state) => state.selectedOrderIds);
  const selectAllOrders = useOrdersState((state) => state.selectAllOrders);
  const clearSelection = useOrdersState((state) => state.clearSelection);

  // Compute filtered orders with useMemo
  const orders = useMemo(() => {
    let filtered = allOrders;

    // Filter by status
    filtered = filtered.filter((o) => matchesFulfillmentFilter(o, currentFilter));

    // Filter by channel
    if (channelFilter !== "all") {
      filtered = filtered.filter((o) => o.platform === channelFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(query) ||
          o.customer.name.toLowerCase().includes(query) ||
          o.customer.email.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [allOrders, currentFilter, searchQuery, channelFilter]);

  const selectableOrders = orders.filter((o) => o.canPurchaseLabel);
  const allSelected =
    selectableOrders.length > 0 &&
    selectableOrders.every((o) => selectedOrderIds.has(o.id));
  const someSelected =
    selectableOrders.some((o) => selectedOrderIds.has(o.id)) && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllOrders();
    }
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white border border-[var(--border)] rounded-xl shadow-[var(--shadow-card)] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[40px_120px_1fr_120px_80px_100px_40px] gap-4 p-4 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(input) => {
                if (input) {
                  input.indeterminate = someSelected;
                }
              }}
              onChange={handleSelectAll}
              className="cursor-pointer"
            />
          </div>
          <span className="text-xs font-medium text-[var(--text-secondary)] uppercase flex items-center">
            Order #
          </span>
          <span className="text-xs font-medium text-[var(--text-secondary)] uppercase flex items-center">
            Customer
          </span>
          <span className="text-xs font-medium text-[var(--text-secondary)] uppercase flex items-center">
            Platform
          </span>
          <span className="text-xs font-medium text-[var(--text-secondary)] uppercase flex items-center">
            Items
          </span>
          <span className="text-xs font-medium text-[var(--text-secondary)] uppercase flex items-center">
            Total
          </span>
          <span></span>
        </div>

        {/* Table Body */}
        {orders.length > 0 ? (
          <StaggerList stagger="tight">
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </StaggerList>
        ) : (
          <EmptyState type="no_results" />
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState type="no_results" />
        )}
      </div>
    </>
  );
}

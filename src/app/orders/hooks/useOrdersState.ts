import { create } from "zustand";
import type { Platform } from "@/data/types";
import type {
  ShippingOrder,
  ShippingRate,
  FulfillmentFilter,
} from "../types";
import { shippingOrders } from "../data/mockOrders";
import { generateMockRates } from "../data/mockRates";
import { matchesFulfillmentFilter, generateTrackingNumber } from "../lib/utils";
import { sleep } from "@/lib/utils";

interface OrdersState {
  // Data
  orders: ShippingOrder[];
  selectedOrderIds: Set<string>;
  currentFilter: FulfillmentFilter;
  searchQuery: string;
  channelFilter: Platform | "all";

  // Modal states
  isRateShoppingModalOpen: boolean;
  rateShoppingOrderIds: string[];
  availableRates: ShippingRate[];
  selectedRate: ShippingRate | null;

  // UI states
  isLoadingRates: boolean;
  isPurchasingLabels: boolean;
  purchaseSuccess: boolean;
  purchaseError: string | null;

  // Actions - Filters
  setCurrentFilter: (filter: FulfillmentFilter) => void;
  setSearchQuery: (query: string) => void;
  setChannelFilter: (channel: Platform | "all") => void;

  // Actions - Selection
  toggleOrderSelection: (orderId: string) => void;
  selectAllOrders: () => void;
  clearSelection: () => void;

  // Actions - Rate Shopping
  openRateShoppingModal: (orderIds: string[]) => void;
  closeRateShoppingModal: () => void;
  fetchMockRates: (orderIds: string[]) => Promise<void>;
  selectRate: (rate: ShippingRate) => void;

  // Actions - Label Purchase
  purchaseLabels: () => Promise<void>;

  // Selectors (computed)
  getFilteredOrders: () => ShippingOrder[];
  getSelectedOrders: () => ShippingOrder[];
  getTotalCost: () => number;
}

export const useOrdersState = create<OrdersState>((set, get) => ({
  // Initial state
  orders: shippingOrders,
  selectedOrderIds: new Set(),
  currentFilter: "ready_to_ship",
  searchQuery: "",
  channelFilter: "all",

  isRateShoppingModalOpen: false,
  rateShoppingOrderIds: [],
  availableRates: [],
  selectedRate: null,

  isLoadingRates: false,
  isPurchasingLabels: false,
  purchaseSuccess: false,
  purchaseError: null,

  // Filter actions
  setCurrentFilter: (filter) => set({ currentFilter: filter, selectedOrderIds: new Set() }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setChannelFilter: (channel) => set({ channelFilter: channel, selectedOrderIds: new Set() }),

  // Selection actions
  toggleOrderSelection: (orderId) => {
    set((state) => {
      const newSelection = new Set(state.selectedOrderIds);
      if (newSelection.has(orderId)) {
        newSelection.delete(orderId);
      } else {
        newSelection.add(orderId);
      }
      return { selectedOrderIds: newSelection };
    });
  },

  selectAllOrders: () => {
    const filtered = get().getFilteredOrders();
    const allIds = filtered.filter((o) => o.canPurchaseLabel).map((o) => o.id);
    set({ selectedOrderIds: new Set(allIds) });
  },

  clearSelection: () => {
    set({ selectedOrderIds: new Set() });
  },

  // Rate shopping actions
  openRateShoppingModal: async (orderIds) => {
    set({
      isRateShoppingModalOpen: true,
      rateShoppingOrderIds: orderIds,
      isLoadingRates: true,
      selectedRate: null,
    });

    // Fetch mock rates with delay
    await get().fetchMockRates(orderIds);
  },

  closeRateShoppingModal: () => {
    set({
      isRateShoppingModalOpen: false,
      rateShoppingOrderIds: [],
      availableRates: [],
      selectedRate: null,
    });
  },

  fetchMockRates: async (orderIds) => {
    set({ isLoadingRates: true });

    // Simulate API call
    await sleep(400);

    const selectedOrders = get().orders.filter((o) =>
      orderIds.includes(o.id)
    );
    const rates = generateMockRates(selectedOrders);

    set({
      availableRates: rates,
      isLoadingRates: false,
      selectedRate: rates[0], // Auto-select best value
    });
  },

  selectRate: (rate) => {
    set({ selectedRate: rate });
  },

  // Label purchase action (optimistic update)
  purchaseLabels: async () => {
    set({ isPurchasingLabels: true });

    const { selectedRate, rateShoppingOrderIds, orders } = get();

    if (!selectedRate) {
      set({ isPurchasingLabels: false });
      return;
    }

    // Simulate API call
    await sleep(300);

    // Update orders with labels (optimistic update)
    const updatedOrders = orders.map((order) => {
      if (rateShoppingOrderIds.includes(order.id)) {
        return {
          ...order,
          label: {
            id: `label_${order.id}`,
            orderId: order.id,
            carrier: selectedRate.carrier,
            service: selectedRate.service,
            trackingNumber: generateTrackingNumber(selectedRate.carrier),
            rate: selectedRate.rate / rateShoppingOrderIds.length,
            purchasedAt: new Date(),
            status: "purchased" as const,
          },
          status: "awaiting_shipment" as const,
          canPurchaseLabel: false,
        };
      }
      return order;
    });

    set({
      orders: updatedOrders,
      isPurchasingLabels: false,
      purchaseSuccess: true,
      isRateShoppingModalOpen: false,
      selectedOrderIds: new Set(),
      selectedRate: null,
    });

    // Auto-reset success after 3s
    setTimeout(() => {
      set({ purchaseSuccess: false });
    }, 3000);
  },

  // Computed selectors
  getFilteredOrders: () => {
    const { orders, currentFilter, searchQuery, channelFilter } = get();

    let filtered = orders;

    // Filter by status
    filtered = filtered.filter((o) =>
      matchesFulfillmentFilter(o, currentFilter)
    );

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
    return filtered.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },

  getSelectedOrders: () => {
    const { orders, selectedOrderIds } = get();
    return orders.filter((o) => selectedOrderIds.has(o.id));
  },

  getTotalCost: () => {
    const { selectedRate } = get();
    return selectedRate?.rate || 0;
  },
}));

// Zustand store for Inventory state management

import { create } from "zustand";
import { ALL_PRODUCTS, MOCK_SUMMARY, MOCK_ATTENTION_ITEMS } from "./data/mockData";
import type {
  InventoryProduct,
  InventorySummary,
  AttentionItem,
  InventoryFilters,
  Platform,
  InventoryStatus,
} from "./types";

interface InventoryState {
  // Data
  products: InventoryProduct[];
  summary: InventorySummary;
  attentionItems: AttentionItem[];
  selectedProducts: Set<string>;

  // Filters
  filters: InventoryFilters;

  // UI State
  isRefreshing: boolean;
  adjustmentModalOpen: boolean;
  adjustmentProductId: string | null;
  syncModalOpen: boolean;
  syncProductId: string | null;
  syncPlatform: Platform | null;

  // Actions - Filters
  setSearch: (search: string) => void;
  setPlatformFilter: (platform: Platform | "all") => void;
  setStatusFilter: (status: InventoryStatus) => void;
  setPage: (page: number) => void;
  setSortBy: (field: string) => void;
  clearFilters: () => void;

  // Actions - Selection
  toggleProductSelection: (productId: string) => void;
  selectAllProducts: () => void;
  clearSelection: () => void;

  // Actions - Modals
  openAdjustmentModal: (productId: string) => void;
  closeAdjustmentModal: () => void;
  openSyncModal: (productId: string, platform: Platform) => void;
  closeSyncModal: () => void;

  // Actions - Data
  refreshInventory: () => Promise<void>;
  adjustInventory: (productId: string, adjustment: number) => void;
  syncToPlatform: (productId: string, platform: Platform) => void;
}

const DEFAULT_FILTERS: InventoryFilters = {
  search: "",
  platform: "all",
  status: "all",
  page: 1,
  sortBy: "title",
  sortOrder: "asc",
};

export const useInventoryState = create<InventoryState>((set, get) => ({
  // Initial state
  products: ALL_PRODUCTS,
  summary: MOCK_SUMMARY,
  attentionItems: MOCK_ATTENTION_ITEMS,
  selectedProducts: new Set(),
  filters: DEFAULT_FILTERS,
  isRefreshing: false,
  adjustmentModalOpen: false,
  adjustmentProductId: null,
  syncModalOpen: false,
  syncProductId: null,
  syncPlatform: null,

  // Filter actions
  setSearch: (search: string) => {
    set((state) => ({
      filters: { ...state.filters, search, page: 1 },
    }));
  },

  setPlatformFilter: (platform: Platform | "all") => {
    set((state) => ({
      filters: { ...state.filters, platform, page: 1 },
    }));
  },

  setStatusFilter: (status: InventoryStatus) => {
    set((state) => ({
      filters: { ...state.filters, status, page: 1 },
    }));
  },

  setPage: (page: number) => {
    set((state) => ({
      filters: { ...state.filters, page },
    }));
  },

  setSortBy: (field: string) => {
    set((state) => {
      const isSameField = state.filters.sortBy === field;
      const newSortOrder = isSameField && state.filters.sortOrder === "asc" ? "desc" : "asc";
      return {
        filters: {
          ...state.filters,
          sortBy: field,
          sortOrder: newSortOrder,
        },
      };
    });
  },

  clearFilters: () => {
    set({ filters: DEFAULT_FILTERS });
  },

  // Selection actions
  toggleProductSelection: (productId: string) => {
    set((state) => {
      const newSelection = new Set(state.selectedProducts);
      if (newSelection.has(productId)) {
        newSelection.delete(productId);
      } else {
        newSelection.add(productId);
      }
      return { selectedProducts: newSelection };
    });
  },

  selectAllProducts: () => {
    const { getFilteredProducts } = get();
    const allIds = getFilteredProducts().map((p) => p.id);
    set({ selectedProducts: new Set(allIds) });
  },

  clearSelection: () => {
    set({ selectedProducts: new Set() });
  },

  // Modal actions
  openAdjustmentModal: (productId: string) => {
    set({ adjustmentModalOpen: true, adjustmentProductId: productId });
  },

  closeAdjustmentModal: () => {
    set({ adjustmentModalOpen: false, adjustmentProductId: null });
  },

  openSyncModal: (productId: string, platform: Platform) => {
    set({ syncModalOpen: true, syncProductId: productId, syncPlatform: platform });
  },

  closeSyncModal: () => {
    set({ syncModalOpen: false, syncProductId: null, syncPlatform: null });
  },

  // Data actions
  refreshInventory: async () => {
    set({ isRefreshing: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In real app: fetch fresh data here
    set({ isRefreshing: false });
  },

  adjustInventory: (productId: string, adjustment: number) => {
    set((state) => {
      const updatedProducts = state.products.map((p) => {
        if (p.id === productId) {
          const newAts = Math.max(0, p.ats + adjustment);
          const newOnHand = Math.max(0, p.onHand + adjustment);
          return {
            ...p,
            ats: newAts,
            onHand: newOnHand,
            freshnessConfidence:
              newAts === 0 ? "RED" : newAts < p.safetyStock ? "YELLOW" : "GREEN",
          };
        }
        return p;
      });

      // Recalculate summary
      const newSummary = {
        ...state.summary,
        lowStockCount: updatedProducts.filter((p) => p.ats > 0 && p.ats < p.safetyStock).length,
        outOfStockCount: updatedProducts.filter((p) => p.ats === 0).length,
      };

      return { products: updatedProducts, summary: newSummary };
    });
  },

  syncToPlatform: (productId: string, platform: Platform) => {
    set((state) => {
      const updatedProducts = state.products.map((p) => {
        if (p.id === productId) {
          const updatedPlatforms = p.platforms.map((pl) => {
            if (pl.platform === platform) {
              return {
                ...pl,
                quantity: p.ats,
                syncStatus: "synced" as const,
                lastSyncedAt: new Date().toISOString(),
              };
            }
            return pl;
          });

          return { ...p, platforms: updatedPlatforms };
        }
        return p;
      });

      // Recalculate summary
      const newSummary = {
        ...state.summary,
        outOfSyncCount: updatedProducts.filter((p) =>
          p.platforms.some((pl) => pl.syncStatus === "out_of_sync")
        ).length,
      };

      return { products: updatedProducts, summary: newSummary };
    });
  },
}));

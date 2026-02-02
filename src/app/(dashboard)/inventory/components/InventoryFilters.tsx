"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useInventoryState } from "../store";
import { springConfigs } from "@/lib/spring-configs";
import type { Platform, InventoryStatus } from "../types";

/**
 * InventoryFilters - Search and filter controls
 * Search: by product name or SKU (debounced 300ms)
 * Platform filter: All / Shopify / TikTok / Amazon
 * Status filter: All / In Stock / Low Stock / Out of Stock / Out of Sync
 */
export function InventoryFilters() {
  const filters = useInventoryState((state) => state.filters);
  const setSearch = useInventoryState((state) => state.setSearch);
  const setPlatformFilter = useInventoryState((state) => state.setPlatformFilter);
  const setStatusFilter = useInventoryState((state) => state.setStatusFilter);
  const clearFilters = useInventoryState((state) => state.clearFilters);

  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

  const hasActiveFilters =
    filters.search !== "" || filters.platform !== "all" || filters.status !== "all";

  const platformOptions: { value: Platform | "all"; label: string }[] = [
    { value: "all", label: "All Platforms" },
    { value: "shopify", label: "Shopify" },
    { value: "tiktok", label: "TikTok" },
    { value: "amazon", label: "Amazon" },
  ];

  const statusOptions: { value: InventoryStatus; label: string }[] = [
    { value: "all", label: "All Status" },
    { value: "in_stock", label: "In Stock" },
    { value: "low_stock", label: "Low Stock" },
    { value: "out_of_stock", label: "Out of Stock" },
    { value: "out_of_sync", label: "Out of Sync" },
  ];

  return (
    <motion.div
      className="mb-4 flex items-center gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfigs.gentle}
    >
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search by product name or SKU..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
        />
        <AnimatePresence>
          {searchInput && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springConfigs.quick}
              onClick={() => setSearchInput("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-[var(--bg-secondary)] rounded transition-colors"
            >
              <X className="w-3 h-3 text-[var(--text-muted)]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Platform Filter */}
      <select
        value={filters.platform}
        onChange={(e) => setPlatformFilter(e.target.value as Platform | "all")}
        className="px-4 py-2 bg-white border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors cursor-pointer"
      >
        {platformOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => setStatusFilter(e.target.value as InventoryStatus)}
        className="px-4 py-2 bg-white border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors cursor-pointer"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Clear Filters */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springConfigs.quick}
            onClick={() => {
              clearFilters();
              setSearchInput("");
            }}
            className="px-4 py-2 text-sm text-[var(--accent)] hover:text-[var(--accent-dark)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
          >
            Clear Filters
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

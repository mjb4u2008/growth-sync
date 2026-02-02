"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { ProductRow } from "./ProductRow";
import { useInventoryState } from "../store";
import { Button } from "@/components/ui/button";
import type { InventoryProduct } from "../types";

/**
 * InventoryTable - Main product table with sorting and pagination
 */
export function InventoryTable() {
  const products = useInventoryState((state) => state.products);
  const filters = useInventoryState((state) => state.filters);
  const setPage = useInventoryState((state) => state.setPage);
  const setSortBy = useInventoryState((state) => state.setSortBy);
  const selectedProducts = useInventoryState((state) => state.selectedProducts);
  const selectAllProducts = useInventoryState((state) => state.selectAllProducts);
  const clearSelection = useInventoryState((state) => state.clearSelection);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) || p.sku.toLowerCase().includes(searchLower)
      );
    }

    // Apply platform filter
    if (filters.platform !== "all") {
      filtered = filtered.filter((p) =>
        p.platforms.some((pl) => pl.platform === filters.platform)
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      switch (filters.status) {
        case "in_stock":
          filtered = filtered.filter((p) => p.ats > p.safetyStock);
          break;
        case "low_stock":
          filtered = filtered.filter((p) => p.ats > 0 && p.ats <= p.safetyStock);
          break;
        case "out_of_stock":
          filtered = filtered.filter((p) => p.ats === 0);
          break;
        case "out_of_sync":
          filtered = filtered.filter((p) =>
            p.platforms.some((pl) => pl.syncStatus === "out_of_sync")
          );
          break;
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal: any = a[filters.sortBy as keyof InventoryProduct];
      let bVal: any = b[filters.sortBy as keyof InventoryProduct];

      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (aVal < bVal) return filters.sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return filters.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [products, filters]);

  // Paginate filtered products
  const paginatedProducts = useMemo(() => {
    const start = (filters.page - 1) * 25;
    const end = start + 25;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, filters.page]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / 25);
  const startIndex = (filters.page - 1) * 25 + 1;
  const endIndex = Math.min(filters.page * 25, totalProducts);

  const allSelected = paginatedProducts.length > 0 && paginatedProducts.every((p) => selectedProducts.has(p.id));
  const someSelected = paginatedProducts.some((p) => selectedProducts.has(p.id)) && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllProducts();
    }
  };

  const handlePrevPage = () => {
    if (filters.page > 1) {
      setPage(filters.page - 1);
    }
  };

  const handleNextPage = () => {
    if (filters.page < totalPages) {
      setPage(filters.page + 1);
    }
  };

  const SortButton = ({ field, label }: { field: string; label: string }) => {
    const isActive = filters.sortBy === field;
    const isAsc = filters.sortOrder === "asc";

    return (
      <button
        onClick={() => setSortBy(field)}
        className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
      >
        <span>{label}</span>
        {isActive && (
          <>
            {isAsc ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </>
        )}
      </button>
    );
  };

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
            <tr>
              <th className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                <SortButton field="title" label="Product" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                <SortButton field="sku" label="SKU" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Shopify
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                TikTok
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Amazon
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                <SortButton field="ats" label="Total" />
              </th>
              <th className="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-[var(--text-muted)]">
                  No products found
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with pagination and bulk actions */}
      <div className="border-t border-[var(--border)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--text-secondary)]">
            Showing {totalProducts === 0 ? 0 : startIndex}-{endIndex} of {totalProducts}
          </span>
          {selectedProducts.size > 0 && (
            <span className="text-sm text-[var(--text-primary)] font-medium">
              Selected: {selectedProducts.size}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {selectedProducts.size > 0 && (
            <>
              <Button variant="secondary" size="sm">
                Bulk Sync
              </Button>
              <Button variant="secondary" size="sm">
                Bulk Edit
              </Button>
            </>
          )}

          <div className="flex items-center gap-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrevPage}
              disabled={filters.page === 1}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Prev
            </Button>
            <span className="px-3 text-sm text-[var(--text-secondary)]">
              Page {filters.page} of {totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleNextPage}
              disabled={filters.page === totalPages || totalPages === 0}
              leftIcon={<ChevronRight className="w-4 h-4" />}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

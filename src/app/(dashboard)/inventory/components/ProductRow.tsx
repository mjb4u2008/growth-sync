"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit, RefreshCw, Eye, Shield } from "lucide-react";
import { SyncStatusBadge } from "./SyncStatusBadge";
import { useInventoryState } from "../store";
import type { InventoryProduct, Platform } from "../types";

interface ProductRowProps {
  product: InventoryProduct;
}

/**
 * ProductRow - Single table row with product details and actions
 */
export function ProductRow({ product }: ProductRowProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedProducts = useInventoryState((state) => state.selectedProducts);
  const toggleProductSelection = useInventoryState((state) => state.toggleProductSelection);
  const openAdjustmentModal = useInventoryState((state) => state.openAdjustmentModal);
  const openSyncModal = useInventoryState((state) => state.openSyncModal);

  const isSelected = selectedProducts.has(product.id);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen]);

  const handleSyncClick = (platform: Platform) => {
    openSyncModal(product.id, platform);
    setIsMenuOpen(false);
  };

  // Get platform columns (always show shopify, tiktok, amazon in that order)
  const getPlatformQuantity = (platform: Platform) => {
    const platformData = product.platforms.find((p) => p.platform === platform);
    if (!platformData) {
      return { quantity: 0, status: "not_listed" as const };
    }
    return { quantity: platformData.quantity, status: platformData.syncStatus };
  };

  const shopify = getPlatformQuantity("shopify");
  const tiktok = getPlatformQuantity("tiktok");
  const amazon = getPlatformQuantity("amazon");

  return (
    <tr className={`border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors ${isSelected ? "bg-[var(--accent-muted)]" : ""}`}>
      {/* Checkbox */}
      <td className="px-4 py-3 w-12">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleProductSelection(product.id)}
          className="w-4 h-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 cursor-pointer"
        />
      </td>

      {/* Product */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Placeholder image */}
          <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
            <span className="text-xs text-[var(--text-muted)]">IMG</span>
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm text-[var(--text-primary)] truncate">
              {product.title}
            </div>
          </div>
        </div>
      </td>

      {/* SKU */}
      <td className="px-4 py-3">
        <span className="text-sm font-mono text-[var(--text-secondary)]">{product.sku}</span>
      </td>

      {/* Shopify */}
      <td className="px-4 py-3">
        <SyncStatusBadge
          quantity={shopify.quantity}
          status={shopify.status}
          safetyStock={product.safetyStock}
        />
      </td>

      {/* TikTok */}
      <td className="px-4 py-3">
        <SyncStatusBadge
          quantity={tiktok.quantity}
          status={tiktok.status}
          safetyStock={product.safetyStock}
        />
      </td>

      {/* Amazon */}
      <td className="px-4 py-3">
        <SyncStatusBadge
          quantity={amazon.quantity}
          status={amazon.status}
          safetyStock={product.safetyStock}
        />
      </td>

      {/* Total ATS */}
      <td className="px-4 py-3">
        <span className="text-sm font-mono font-semibold text-[var(--text-primary)]">
          {product.ats}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 w-12 relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1 hover:bg-[var(--bg-secondary)] rounded transition-colors"
        >
          <MoreVertical className="w-4 h-4 text-[var(--text-muted)]" />
        </button>

        {/* Actions dropdown */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 top-full mt-1 w-48 bg-white border border-[var(--border)] rounded-lg shadow-lg z-10 py-1"
          >
            <button
              onClick={() => {
                openAdjustmentModal(product.id);
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Adjust Quantity
            </button>

            {product.platforms.map((platform) => (
              <button
                key={platform.platform}
                onClick={() => handleSyncClick(platform.platform)}
                className="w-full px-4 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center gap-2 capitalize"
              >
                <RefreshCw className="w-4 h-4" />
                Sync to {platform.platform}
              </button>
            ))}

            <button
              onClick={() => {
                console.log("View details:", product.id);
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>

            <button
              onClick={() => {
                console.log("Set safety stock:", product.id);
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Set Safety Stock
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

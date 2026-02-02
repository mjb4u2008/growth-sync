"use client";

import Link from "next/link";
import { topProductsByChannel, type TopProduct } from "@/data/cross-channel";

const platforms = [
  { id: "tiktok", label: "TIKTOK", color: "#00F2EA" },
  { id: "shopify", label: "SHOPIFY", color: "#96BF48" },
  { id: "amazon", label: "AMAZON", color: "#FF9900" },
] as const;

/**
 * Top Products by Channel - Best seller per platform (compact)
 *
 * Shows #1 product from each platform at a glance
 * Invites deeper exploration in Analytics
 */
export function TopProductsChannel() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-[var(--shadow-card)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Top Products by Channel
        </h3>
        <span className="text-xs text-[var(--text-muted)]">This Week</span>
      </div>

      {/* Single row, 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {platforms.map((platform) => {
          // Get only the #1 product
          const topProduct =
            topProductsByChannel[
              platform.id as keyof typeof topProductsByChannel
            ][0];

          return (
            <div key={platform.id}>
              {/* Platform header */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                  {platform.label}
                </span>
              </div>

              {/* Compact product card */}
              <CompactProductCard product={topProduct} />
            </div>
          );
        })}
      </div>

      {/* View all link */}
      <div className="flex justify-end pt-2 border-t border-[var(--border)]">
        <Link
          href="/analytics"
          className="text-xs font-medium text-[var(--accent)] hover:underline"
        >
          View All in Analytics →
        </Link>
      </div>
    </div>
  );
}

function CompactProductCard({ product }: { product: TopProduct }) {
  const formatRevenue = (rev: number) => {
    return `$${(rev / 1000).toFixed(1)}K`;
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
      {/* Small square placeholder */}
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
        <span className="text-lg font-semibold text-gray-400">
          {product.name.charAt(0)}
        </span>
      </div>

      {/* Product info */}
      <div className="min-w-0 flex-1">
        <div className="font-medium text-gray-900 text-sm truncate mb-0.5">
          {product.name}
        </div>
        <div className="text-xs text-gray-500">
          {product.unitsSold} sold · {formatRevenue(product.revenue)}
        </div>
      </div>
    </div>
  );
}

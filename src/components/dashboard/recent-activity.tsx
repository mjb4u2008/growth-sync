"use client";

import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import { activityFeed } from "@/data/analytics";

const platformColors: Record<string, string> = {
  shopify: "#96BF48",
  tiktok: "#00F2EA",
  amazon: "#FF9900",
  instagram: "#E1306C",
  system: "#6B7280",
};

const activityTypeMap: Record<string, { platform: string; detail: string }> = {
  order_placed: { platform: "tiktok", detail: "$97.38" },
  ticket_resolved: { platform: "shopify", detail: "—" },
  order_shipped: { platform: "amazon", detail: "USPS" },
  inventory_synced: { platform: "system", detail: "147 SKUs" },
  low_stock_alert: { platform: "system", detail: "12 left" },
  order_delivered: { platform: "shopify", detail: "—" },
  ticket_created: { platform: "shopify", detail: "Urgent" },
  refund_issued: { platform: "shopify", detail: "$97.40" },
  customer_signup: { platform: "shopify", detail: "—" },
};

/**
 * Recent Activity - Compact activity stream
 *
 * Swap Commerce-inspired: Clean horizontal list of recent events
 * Shows cross-platform activity in one unified feed
 */
export function RecentActivity() {
  const recentItems = activityFeed.slice(0, 5);

  return (
    <div className="bg-white border border-[var(--border)] rounded-xl shadow-[var(--shadow-card)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Recent Activity
        </h3>
        <Link
          href="/activity"
          className="text-xs font-medium text-[var(--accent)] hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Activity list */}
      <div className="space-y-0.5">
        {recentItems.map((activity) => {
          const meta = activityTypeMap[activity.type] || { platform: "system", detail: "—" };
          const platformColor = platformColors[meta.platform] || platformColors.system;

          return (
            <div
              key={activity.id}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-4 py-3 hover:bg-[var(--bg-secondary)] transition-colors rounded-lg px-2 -mx-2 cursor-pointer"
            >
              {/* Event */}
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: platformColor }}
                />
                <span className="text-sm text-[var(--text-primary)] truncate">
                  {activity.title}
                </span>
              </div>

              {/* Detail */}
              <div className="text-sm text-[var(--text-secondary)] w-20 text-right">
                {meta.detail}
              </div>

              {/* Platform badge */}
              <div className="w-20 text-right">
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${platformColor}20`,
                    color: platformColor,
                  }}
                >
                  {meta.platform === "system" ? "System" : meta.platform.charAt(0).toUpperCase() + meta.platform.slice(1)}
                </span>
              </div>

              {/* Time */}
              <div className="text-xs text-[var(--text-muted)] w-24 text-right">
                {formatRelativeTime(activity.timestamp)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

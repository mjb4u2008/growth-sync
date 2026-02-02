"use client";

import { KPIStrip } from "@/components/dashboard/kpi-strip";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { TopProductsChannel } from "@/components/dashboard/top-products-channel";
import { SocialSignal } from "@/components/dashboard/social-signal";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { InventorySnapshot } from "@/components/dashboard/inventory-snapshot";
import { FulfillmentSnapshot } from "@/components/dashboard/fulfillment-snapshot";
import { kpiData } from "@/data/analytics";

/**
 * GROWTH SYNC DASHBOARD
 *
 * Enterprise-grade e-commerce operations center
 * Action-oriented: Shows what needs your attention
 *
 * Build this like you're selling to Nike, not a Shopify dropshipper.
 */
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-[1800px] mx-auto">
        {/* KPI Strip - Cleaned up with sparklines */}
        <KPIStrip kpis={kpiData} />

        {/* Revenue Chart - Platform revenue visualization */}
        <RevenueChart />

        {/* Row 1: Voice of Customer + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SocialSignal />
          <RecentActivity />
        </div>

        {/* Row 2: Top Products by Channel - Compact */}
        <div className="mb-6">
          <TopProductsChannel />
        </div>

        {/* Row 3: Inventory + Fulfillment - Action-oriented */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InventorySnapshot />
          <FulfillmentSnapshot />
        </div>
      </div>
    </div>
  );
}

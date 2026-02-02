"use client";

import { motion } from "framer-motion";
import { AnalyticsHeader } from "./components/AnalyticsHeader";
import { RevenueByPlatformCard } from "./components/RevenueByPlatformCard";
import { PlatformComparisonCard } from "./components/PlatformComparisonCard";
import { OrdersOverviewCard } from "./components/OrdersOverviewCard";
import { TopProductsCard } from "./components/TopProductsCard";
import { ProductPlatformMatrix } from "./components/ProductPlatformMatrix";
import { InventoryHealthCard } from "./components/InventoryHealthCard";
import { SupportMetricsCard } from "./components/SupportMetricsCard";
import { AttentionProductsCard } from "./components/AttentionProductsCard";
import { TrendsInsightsCard } from "./components/TrendsInsightsCard";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";

/**
 * Analytics Page - Cross-platform comparison and insights
 * Differentiated from Dashboard by leading with platform comparison
 */
export default function AnalyticsPage() {
  const cards = [
    // Row 1: Revenue by Platform + Platform Comparison (side by side)
    { id: "revenue", component: <RevenueByPlatformCard /> },
    { id: "comparison", component: <PlatformComparisonCard /> },

    // Row 2: Product × Platform Matrix (MOVED UP - the unique value)
    { id: "matrix", component: <ProductPlatformMatrix />, span: "lg:col-span-2" },

    // Row 3: Orders + Top Products
    { id: "orders", component: <OrdersOverviewCard /> },
    { id: "top-products", component: <TopProductsCard /> },

    // Row 4: Inventory + Support
    { id: "inventory", component: <InventoryHealthCard /> },
    { id: "support", component: <SupportMetricsCard /> },

    // Row 5: Products Needing Attention
    { id: "attention", component: <AttentionProductsCard />, span: "lg:col-span-2" },

    // Row 6: Trends & Insights
    { id: "insights", component: <TrendsInsightsCard />, span: "lg:col-span-2" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-[1800px] mx-auto">
        {/* Header */}
        <AnalyticsHeader />

        {/* Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={card.span || ""}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...springConfigs.bouncy,
                delay: index * staggerDelays.tight,
              }}
            >
              {card.component}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { InventoryHeader } from "./components/InventoryHeader";
import { AttentionPanel } from "./components/AttentionPanel";
import { InventoryFilters } from "./components/InventoryFilters";
import { InventoryTable } from "./components/InventoryTable";
import { AdjustmentModal } from "./components/AdjustmentModal";
import { SyncModal } from "./components/SyncModal";
import { springConfigs } from "@/lib/spring-configs";

/**
 * Inventory Page - V1 Implementation
 * Read + alert mode: pull inventory from connected platforms, show discrepancies, enable quick fixes
 * Not trying to be source of truth yet - that's V2
 */
export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="px-8 py-8 max-w-[1800px] mx-auto">
        {/* Header with stats */}
        <InventoryHeader />

        {/* Attention panel (products needing action) */}
        <AttentionPanel />

        {/* Filters */}
        <InventoryFilters />

        {/* Main table - containerized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfigs.gentle, delay: 0.2 }}
        >
          <InventoryTable />
        </motion.div>
      </div>

      {/* Modals */}
      <AdjustmentModal />
      <SyncModal />
    </div>
  );
}

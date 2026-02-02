"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useOrdersState } from "../hooks/useOrdersState";
import type { Platform } from "@/data/types";
import type { FulfillmentFilter } from "../types";

export function FilterBar() {
  const channelFilter = useOrdersState((state) => state.channelFilter);
  const currentFilter = useOrdersState((state) => state.currentFilter);
  const searchQuery = useOrdersState((state) => state.searchQuery);
  const setChannelFilter = useOrdersState((state) => state.setChannelFilter);
  const setCurrentFilter = useOrdersState((state) => state.setCurrentFilter);
  const setSearchQuery = useOrdersState((state) => state.setSearchQuery);

  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-white border border-[var(--border)] rounded-xl shadow-[var(--shadow-card)]">
      {/* Channel Dropdown */}
      <select
        value={channelFilter}
        onChange={(e) => setChannelFilter(e.target.value as Platform | "all")}
        className="px-3 py-2 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] cursor-pointer"
      >
        <option value="all">All Channels</option>
        <option value="shopify">Shopify</option>
        <option value="tiktok">TikTok Shop</option>
        <option value="amazon">Amazon</option>
        <option value="custom">Custom</option>
      </select>

      {/* Status Dropdown */}
      <select
        value={currentFilter}
        onChange={(e) =>
          setCurrentFilter(e.target.value as FulfillmentFilter)
        }
        className="px-3 py-2 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] cursor-pointer"
      >
        <option value="ready_to_ship">Ready to Ship</option>
        <option value="awaiting_shipment">Awaiting Shipment</option>
        <option value="label_purchased">Label Purchased</option>
        <option value="shipped">Shipped</option>
        <option value="all">All Orders</option>
      </select>

      {/* Search Input */}
      <div className="flex-1">
        <Input
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          clearable
          onClear={() => setSearchQuery("")}
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>
    </div>
  );
}

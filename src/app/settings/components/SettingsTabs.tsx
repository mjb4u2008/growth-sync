"use client";

import Link from "next/link";
import { useSettingsState } from "../store";
import { cn } from "@/lib/utils";
import type { SettingsTab } from "../types";

interface Tab {
  key: SettingsTab;
  label: string;
}

const tabs: Tab[] = [
  { key: "profile", label: "Profile" },
  { key: "business", label: "Business" },
  { key: "integrations", label: "Integrations" },
  { key: "team", label: "Team" },
  { key: "billing", label: "Billing" },
  { key: "notifications", label: "Notifications" },
  { key: "ai-automation", label: "AI & Automation" },
  { key: "security", label: "Security" },
  { key: "data-privacy", label: "Data & Privacy" },
  { key: "help", label: "Help" },
];

/**
 * SettingsTabs - Horizontal tab navigation with query param routing
 * Scrollable on mobile
 */
export function SettingsTabs() {
  const activeTab = useSettingsState((state) => state.activeTab);

  return (
    <div className="border-b border-[var(--border)] mb-6">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={`/settings?tab=${tab.key}`}
            className={cn(
              "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap -mb-px",
              activeTab === tab.key
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

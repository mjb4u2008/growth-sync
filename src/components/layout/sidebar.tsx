"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Inbox,
  Package,
  Warehouse,
  Lightbulb,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { InboxBadge } from "@/app/inbox/components/InboxBadge";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number; // Notification count
  dynamicBadge?: boolean; // Use dynamic badge component
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Inbox",
    href: "/inbox",
    icon: Inbox,
    dynamicBadge: true, // Dynamic badge from Zustand
  },
  {
    label: "Orders",
    href: "/orders",
    icon: Package,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Warehouse,
  },
  {
    label: "Insights",
    href: "/insights",
    icon: Lightbulb,
    badge: 2, // Critical insights
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

function NavItemComponent({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link href={item.href} className="block">
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors",
          isActive
            ? "bg-[var(--accent-muted)] text-[var(--text-primary)]"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
        )}
      >
        {/* Icon and label */}
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{item.label}</span>
        </div>

        {/* Notification badge */}
        {item.dynamicBadge ? (
          <InboxBadge />
        ) : item.badge ? (
          <div className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[var(--error)] text-white text-xs font-semibold rounded-full">
            {item.badge}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps = {}) {
  return (
    <aside className={cn("fixed left-0 top-0 bottom-0 w-60 bg-bg-secondary border-r border-border flex flex-col", className)}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <Link href="/" className="block">
          <div className="flex items-center gap-1 font-display text-xl font-bold">
            <span className="text-text-primary">Growth</span>
            <span className="text-accent">Sync</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItemComponent key={item.href} item={item} />
        ))}
      </nav>

      {/* Bottom section - Settings & Profile */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        {/* Settings */}
        <Link href="/settings">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors">
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </div>
        </Link>

        {/* Profile */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[var(--bg-card)] transition-colors">
          <Avatar name="Alex Morgan" size="sm" status="online" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">
              Alex Morgan
            </p>
            <p className="text-xs text-[var(--text-muted)] truncate">Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

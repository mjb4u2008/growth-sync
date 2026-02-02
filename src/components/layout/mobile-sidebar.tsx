"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  LayoutDashboard,
  Inbox,
  Package,
  Warehouse,
  Lightbulb,
  BarChart3,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { InboxBadge } from "@/app/inbox/components/InboxBadge";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  dynamicBadge?: boolean;
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
    dynamicBadge: true,
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
    badge: 2,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

interface NavItemComponentProps {
  item: NavItem;
  onClick?: () => void;
}

function NavItemComponent({ item, onClick }: NavItemComponentProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link href={item.href} className="block" onClick={onClick}>
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors",
          isActive
            ? "bg-green-50 text-gray-900"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{item.label}</span>
        </div>

        {item.dynamicBadge ? (
          <InboxBadge />
        ) : item.badge ? (
          <div className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-semibold rounded-full">
            {item.badge}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </DialogPrimitive.Overlay>

        {/* Content */}
        <DialogPrimitive.Content asChild onOpenAutoFocus={(e) => e.preventDefault()}>
          <motion.div
            className="fixed left-0 top-0 bottom-0 z-50 h-full w-[280px] max-w-[80vw] bg-white border-r border-gray-200 flex flex-col shadow-xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <DialogPrimitive.Title asChild>
                <Link
                  href="/"
                  className="block"
                  onClick={() => onOpenChange(false)}
                >
                  <div className="flex items-center gap-1 font-display text-xl font-bold">
                    <span className="text-gray-900">Growth</span>
                    <span className="text-green-600">Sync</span>
                  </div>
                </Link>
              </DialogPrimitive.Title>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <NavItemComponent
                  key={item.href}
                  item={item}
                  onClick={() => onOpenChange(false)}
                />
              ))}
            </nav>

            {/* Bottom section - Settings & Profile */}
            <div className="px-3 py-4 border-t border-gray-200 space-y-1 bg-gray-50">
              {/* Settings */}
              <Link href="/settings" onClick={() => onOpenChange(false)}>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-white transition-colors">
                  <Settings className="h-5 w-5" />
                  <span className="text-sm font-medium">Settings</span>
                </div>
              </Link>

              {/* Profile */}
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-white transition-colors">
                <Avatar name="Alex Morgan" size="sm" status="online" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Alex Morgan
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    Owner
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

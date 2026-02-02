"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-bg-secondary border-b border-border">
      <div className="flex items-center justify-between px-4 h-full">
        {/* Hamburger menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-bg-card transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-text-primary" />
        </button>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 font-display text-lg font-bold">
            <span className="text-text-primary">Growth</span>
            <span className="text-accent">Sync</span>
          </div>
        </Link>

        {/* Profile Avatar */}
        <Avatar name="Alex Morgan" size="sm" status="online" />
      </div>
    </header>
  );
}

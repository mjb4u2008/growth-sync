"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileHeader } from "@/components/layout/mobile-header";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";

interface LayoutContentProps {
  children: React.ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <Sidebar className="hidden lg:block" />

      {/* Mobile Header - visible only on mobile */}
      <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />

      {/* Mobile Sidebar Drawer */}
      <MobileSidebar
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />

      {/* Main Content - responsive margin and padding for mobile header */}
      <main className="lg:ml-60 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </>
  );
}

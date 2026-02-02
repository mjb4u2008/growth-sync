"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { easingCurves, durations } from "@/lib/spring-configs";

interface PageTransitionProps {
  children: ReactNode;
  /**
   * Custom delay before animation starts (in seconds)
   */
  delay?: number;
  /**
   * Disable animation (useful for reduced motion)
   */
  disabled?: boolean;
}

/**
 * Page transition wrapper - Fade up animation for page mounts
 * Creates that professional, polished feel when navigating
 */
export function PageTransition({
  children,
  delay = 0,
  disabled = false,
}: PageTransitionProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: durations.slow,
        delay,
        ease: easingCurves.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}

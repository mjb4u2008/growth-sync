"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerDelays } from "@/lib/spring-configs";

interface StaggerListProps {
  children: ReactNode;
  /**
   * Stagger delay between items
   */
  stagger?: "tight" | "normal" | "relaxed" | "slow";
  /**
   * Custom className for the container
   */
  className?: string;
}

/**
 * Stagger list container - Wraps a list of items for cascading reveal
 * Children should be wrapped in StaggerItem components
 */
export function StaggerList({
  children,
  stagger = "normal",
  className,
}: StaggerListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelays[stagger],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  /**
   * Custom className for the item
   */
  className?: string;
  /**
   * Custom delay for this specific item (overrides stagger)
   */
  delay?: number;
}

/**
 * Individual item in a stagger list
 * Use inside StaggerList component
 */
export function StaggerItem({ children, className, delay }: StaggerItemProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
        delay,
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

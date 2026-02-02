"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, motion, useTransform } from "framer-motion";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface CounterProps {
  /**
   * Target value to count to
   */
  value: number;
  /**
   * Format type
   */
  format?: "currency" | "number" | "percentage" | "none";
  /**
   * Custom className
   */
  className?: string;
  /**
   * Decimal places (for currency)
   */
  decimals?: number;
  /**
   * Duration of count animation (in seconds)
   */
  duration?: number;
  /**
   * Delay before starting (in seconds)
   */
  delay?: number;
}

/**
 * Animated counter component
 * Counts up from 0 to target value with spring physics
 * Perfect for revenue numbers, KPIs, and metrics
 */
export function Counter({
  value,
  format = "number",
  className,
  decimals = 2,
  duration = 1,
  delay = 0,
}: CounterProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });

  useEffect(() => {
    // Reset to 0 on mount
    motionValue.set(0);

    // Start animation after delay
    const timer = setTimeout(() => {
      motionValue.set(value);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, motionValue, delay]);

  // Transform the spring value to formatted string
  const displayValue = useTransform(springValue, (latest) => {
    const num = Math.floor(latest);

    switch (format) {
      case "currency":
        return formatCurrency(num);
      case "number":
        return formatNumber(num);
      case "percentage":
        return `${num.toFixed(decimals)}%`;
      case "none":
        return num.toString();
      default:
        return num.toString();
    }
  });

  return (
    <motion.span className={className}>
      {displayValue}
    </motion.span>
  );
}

/**
 * Animated number with custom formatting
 * More flexible version that animates on value changes
 */
export function AnimatedNumber({
  value,
  className,
  formatter,
}: {
  value: number;
  className?: string;
  formatter?: (value: number) => string;
}) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  const displayValue = useTransform(springValue, (latest) => {
    if (formatter) {
      return formatter(latest);
    }
    return Math.round(latest).toString();
  });

  return <motion.span className={className}>{displayValue}</motion.span>;
}

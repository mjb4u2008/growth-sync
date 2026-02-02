"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Counter } from "@/components/animations/counter";
import { formatCurrency, formatCurrencyCompact, cn } from "@/lib/utils";
import { analyticsData } from "@/data/analytics";

type Period = "24H" | "7D" | "30D" | "90D" | "1Y";

const platformColors = {
  shopify: "#96BF48",
  tiktok: "#00F2EA",
  amazon: "#FF9900",
  instagram: "#E1306C",
};

interface RevenueCathedralProps {
  delay?: number;
}

/**
 * Revenue Cathedral - The hero. The money shot.
 *
 * The first time they see ALL revenue unified across platforms.
 * A massive number that counts up. A beautiful graph showing convergence.
 *
 * This is the "holy shit" moment.
 */
export function RevenueCathedral({ delay = 0 }: RevenueCathedralProps) {
  const [period, setPeriod] = useState<Period>("30D");
  const [visiblePlatforms, setVisiblePlatforms] = useState({
    shopify: true,
    tiktok: true,
    amazon: true,
    instagram: true,
  });

  const revenue = analyticsData.revenue.total;
  const change = analyticsData.revenue.change;
  const isPositive = change >= 0;

  // Toggle platform visibility
  const togglePlatform = (platform: keyof typeof visiblePlatforms) => {
    setVisiblePlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  // Generate chart data (simplified - using revenue time series)
  const chartData = analyticsData.revenue.timeSeries.map((point, index) => ({
    date: point.date,
    shopify: point.value * 0.5,
    tiktok: point.value * 0.3,
    amazon: point.value * 0.15,
    instagram: point.value * 0.05,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative rounded-2xl border border-border bg-bg-card p-8 overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: "linear-gradient(135deg, #96BF48, #00F2EA, #FF9900, #E1306C)",
        }}
      />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-8">
        <div>
          <p className="text-sm font-medium text-text-muted uppercase tracking-wider mb-2">
            Unified Revenue
          </p>

          {/* Massive revenue number */}
          <div className="flex items-baseline gap-4">
            <Counter
              value={revenue}
              format="currency"
              decimals={0}
              className="text-6xl font-black font-display text-text-primary"
              duration={1.2}
              delay={delay + 0.3}
            />

            {/* Change indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.8, type: "spring", stiffness: 400 }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-sm",
                isPositive ? "bg-success/10 text-success" : "bg-error/10 text-error"
              )}
            >
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{isPositive ? "+" : ""}{change.toFixed(1)}%</span>
            </motion.div>
          </div>

          <p className="text-sm text-text-muted mt-2">vs last period</p>
        </div>

        {/* Period selector */}
        <div className="flex gap-2">
          {(["24H", "7D", "30D", "90D", "1Y"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all",
                period === p
                  ? "bg-accent text-white shadow-sm"
                  : "bg-bg-secondary text-text-secondary hover:bg-border hover:text-text-primary"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* The Graph - Platform Convergence */}
      <div className="relative h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              {Object.entries(platformColors).map(([platform, color]) => (
                <linearGradient key={platform} id={`gradient-${platform}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E5" opacity={0.5} />

            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              fontSize={11}
              fontFamily="var(--font-mono)"
            />

            <YAxis
              stroke="#9CA3AF"
              fontSize={11}
              fontFamily="var(--font-mono)"
              tickFormatter={(value) => formatCurrencyCompact(value)}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                border: "1px solid #E8E8E5",
                borderRadius: "8px",
                padding: "8px 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
              }}
              formatter={(value: number) => formatCurrency(value)}
            />

            {/* Stacked areas for each platform */}
            {visiblePlatforms.instagram && (
              <Area
                type="monotone"
                dataKey="instagram"
                stackId="1"
                stroke={platformColors.instagram}
                fill={`url(#gradient-instagram)`}
                strokeWidth={2}
              />
            )}
            {visiblePlatforms.amazon && (
              <Area
                type="monotone"
                dataKey="amazon"
                stackId="1"
                stroke={platformColors.amazon}
                fill={`url(#gradient-amazon)`}
                strokeWidth={2}
              />
            )}
            {visiblePlatforms.tiktok && (
              <Area
                type="monotone"
                dataKey="tiktok"
                stackId="1"
                stroke={platformColors.tiktok}
                fill={`url(#gradient-tiktok)`}
                strokeWidth={2}
              />
            )}
            {visiblePlatforms.shopify && (
              <Area
                type="monotone"
                dataKey="shopify"
                stackId="1"
                stroke={platformColors.shopify}
                fill={`url(#gradient-shopify)`}
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Platform Legend */}
      <div className="relative flex items-center justify-center gap-6 mt-6">
        {analyticsData.revenue.byPlatform.map((platform) => {
          const isVisible = visiblePlatforms[platform.platform as keyof typeof visiblePlatforms];

          return (
            <motion.button
              key={platform.platform}
              onClick={() => togglePlatform(platform.platform as keyof typeof visiblePlatforms)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all",
                isVisible ? "opacity-100" : "opacity-40 hover:opacity-60"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: platform.color }}
              />
              <span className="text-sm font-medium font-display capitalize text-text-primary">
                {platform.platform}
              </span>
              <span className="text-sm font-mono text-text-muted">
                {formatCurrencyCompact(platform.value)}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

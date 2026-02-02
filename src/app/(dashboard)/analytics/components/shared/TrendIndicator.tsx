import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TrendIndicatorProps {
  value: number; // e.g., 12.4 or -3.2
  showSign?: boolean; // Show + for positive
}

/**
 * TrendIndicator - Shows trend direction with color
 * - Positive: ↑ green
 * - Negative: ↓ red
 * - Zero: → gray
 */
export function TrendIndicator({ value, showSign = false }: TrendIndicatorProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  const colorClass = isPositive
    ? "text-green-600"
    : isNegative
    ? "text-red-600"
    : "text-gray-500";

  const formattedValue = Math.abs(value).toFixed(1);
  const sign = showSign && isPositive ? "+" : "";

  return (
    <div className={`flex items-center gap-1 ${colorClass}`}>
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">
        {sign}{formattedValue}%
      </span>
    </div>
  );
}

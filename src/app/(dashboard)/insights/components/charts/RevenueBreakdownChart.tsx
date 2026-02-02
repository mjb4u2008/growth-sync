"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrency, formatCurrencyCompact } from "@/lib/utils";

interface RevenueBreakdownChartProps {
  data: Array<{
    quarter: string;
    revenue: number;
    orders: number;
  }>;
}

/**
 * RevenueBreakdownChart - Bar chart for quarter comparisons
 * Uses Recharts with design system colors
 */
export function RevenueBreakdownChart({ data }: RevenueBreakdownChartProps) {
  return (
    <div className="mt-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="quarter"
            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
          />
          <YAxis
            tickFormatter={(value) => formatCurrencyCompact(value)}
            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
          />
          <Tooltip
            formatter={(value: number | undefined, name: string | undefined) => [
              name === "revenue" && value !== undefined ? formatCurrency(value) : value ?? 0,
              name === "revenue" ? "Revenue" : "Orders",
            ]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "16px",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="revenue" fill="var(--accent)" name="Revenue" radius={[4, 4, 0, 0]} />
          <Bar dataKey="orders" fill="#3B82F6" name="Orders" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

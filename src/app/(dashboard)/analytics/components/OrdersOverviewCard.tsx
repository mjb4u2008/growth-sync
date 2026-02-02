"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { analyticsData, kpiData } from "@/data/analytics";

/**
 * OrdersOverviewCard - Shows order metrics and trend chart
 * Displays total orders, AOV, total units with a bar chart
 */
export function OrdersOverviewCard() {
  const { totalOrders, aov, totalUnits, ordersLast7Days } = useMemo(() => {
    const orders = analyticsData.orders.total;
    const avgOrderValue = kpiData.find((kpi) => kpi.label === "Avg Order Value")?.value || 94.5;

    // Mock data for units (would come from real data)
    const units = 1247;

    // Generate last 7 days data from time series
    const last7Days = analyticsData.orders.timeSeries.slice(-7).map((day, index) => ({
      day: day.date.split(" ")[1], // Extract day number
      orders: day.value,
    }));

    return {
      totalOrders: orders,
      aov: avgOrderValue,
      totalUnits: units,
      ordersLast7Days: last7Days,
    };
  }, []);

  return (
    <Card hoverable padding="lg">
      <CardHeader>
        <CardTitle>Orders Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {formatNumber(totalOrders)}
            </div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {formatCurrency(aov)}
            </div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">AOV</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {formatNumber(totalUnits)}
            </div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">Units</div>
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersLast7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="orders" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

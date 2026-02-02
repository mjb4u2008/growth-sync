"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";

interface SentimentChartProps {
  data: Array<{
    category: string;
    value: number;
    percentage: number;
    color: string;
  }>;
  issues?: Array<{
    issue: string;
    mentions: number;
    severity: "low" | "medium" | "high";
  }>;
}

/**
 * SentimentChart - Pie chart for sentiment distribution
 * Shows positive/neutral/negative breakdown with issue list
 */
export function SentimentChart({ data, issues }: SentimentChartProps) {
  return (
    <div className="mt-4">
      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={(entry: any) => `${((entry.value / data.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number | undefined, name: string | undefined) => [
              `${value ?? 0} reviews`,
              name ?? "",
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
              paddingTop: "8px",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Issues List (if provided) */}
      {issues && issues.length > 0 && (
        <div className="mt-6 pt-4 border-t border-[var(--border)]">
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            Top Issues
          </p>
          <div className="space-y-2">
            {issues.map((issue, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 bg-[var(--bg-secondary)] rounded-lg"
              >
                <span className="text-sm text-[var(--text-primary)] flex-1">
                  {issue.issue}
                </span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      issue.severity === "high"
                        ? "error"
                        : issue.severity === "medium"
                        ? "warning"
                        : "neutral"
                    }
                    size="sm"
                  >
                    {issue.mentions} mentions
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

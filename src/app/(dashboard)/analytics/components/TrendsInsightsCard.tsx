"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { TrendInsight } from "../types";

/**
 * TrendsInsightsCard - AI-generated insights with action suggestions
 * Shows observations about business trends and opportunities
 */
export function TrendsInsightsCard() {
  const trendInsights: TrendInsight[] = useMemo(() => {
    // TODO: Replace with real AI-generated insights from API
    return [
      {
        id: "1",
        icon: "🔥",
        message: "TikTok revenue up 24% — your fastest growing channel",
        actionSuggestion: "Consider increasing TikTok ad spend",
      },
      {
        id: "2",
        icon: "💡",
        message: "Classic White Tee sells 2x better on TikTok than Shopify",
        actionSuggestion: "Optimize TikTok product page and boost ads",
      },
      {
        id: "3",
        icon: "🎯",
        message: "Thursday is your best sales day (+23% vs average)",
        actionSuggestion: "Schedule promotions for Thursday mornings",
      },
      {
        id: "4",
        icon: "⚠️",
        message: "Conversion rate dropped 0.4% this week",
        actionSuggestion: "Review checkout flow and shipping costs",
      },
      {
        id: "5",
        icon: "💡",
        message: "Customers buying sneakers often add backpacks",
        actionSuggestion: "Create bundle offer for 10% discount",
      },
    ];
  }, []);

  return (
    <Card hoverable padding="lg" className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Trends & Insights</CardTitle>
        <CardDescription>
          AI-powered observations about your business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trendInsights.map((insight) => (
            <div
              key={insight.id}
              className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl flex-shrink-0">{insight.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {insight.message}
                </p>
                {insight.actionSuggestion && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    💡 {insight.actionSuggestion}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

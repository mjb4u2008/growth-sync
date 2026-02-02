"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AttentionItem } from "../types";

/**
 * AttentionProductsCard - Shows products needing action
 * Grouped by issue type: declining sales, missing platforms, etc.
 */
export function AttentionProductsCard() {
  const attentionItems: AttentionItem[] = useMemo(() => {
    // TODO: Replace with real data from API
    return [
      {
        id: "1",
        type: "declining_sales",
        product: "Green Jacket XL",
        message: "Sales down 34% this week",
        actionLabel: "Investigate",
      },
      {
        id: "2",
        type: "declining_sales",
        product: "Tech Joggers - Black",
        message: "Sales down 18% compared to last month",
        actionLabel: "Review",
      },
      {
        id: "3",
        type: "missing_platform",
        product: "White Sneakers",
        message: "Not listed on Amazon",
        actionLabel: "List Product",
      },
      {
        id: "4",
        type: "missing_platform",
        product: "Classic White Tee",
        message: "Only on Shopify - expand to TikTok",
        actionLabel: "Expand",
      },
      {
        id: "5",
        type: "no_recent_sales",
        product: "Vintage Denim Jacket",
        message: "No sales in 14 days",
        actionLabel: "Review Listing",
      },
    ];
  }, []);

  const decliningItems = attentionItems.filter((item) => item.type === "declining_sales");
  const missingPlatformItems = attentionItems.filter((item) => item.type === "missing_platform");
  const noSalesItems = attentionItems.filter((item) => item.type === "no_recent_sales");

  return (
    <Card hoverable padding="lg" className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Products Needing Attention</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Declining Sales Section */}
          {decliningItems.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase text-[var(--text-secondary)] mb-2">
                Declining Sales
              </h4>
              <div className="space-y-2">
                {decliningItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">⚠️</span>
                      <div>
                        <div className="font-medium text-sm text-[var(--text-primary)]">
                          {item.product}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {item.message}
                        </div>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      {item.actionLabel} →
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missing Platforms Section */}
          {missingPlatformItems.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase text-[var(--text-secondary)] mb-2">
                Listing Opportunities
              </h4>
              <div className="space-y-2">
                {missingPlatformItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🎯</span>
                      <div>
                        <div className="font-medium text-sm text-[var(--text-primary)]">
                          {item.product}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {item.message}
                        </div>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      {item.actionLabel} →
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Recent Sales Section */}
          {noSalesItems.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase text-[var(--text-secondary)] mb-2">
                No Recent Activity
              </h4>
              <div className="space-y-2">
                {noSalesItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💤</span>
                      <div>
                        <div className="font-medium text-sm text-[var(--text-primary)]">
                          {item.product}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {item.message}
                        </div>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      {item.actionLabel} →
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

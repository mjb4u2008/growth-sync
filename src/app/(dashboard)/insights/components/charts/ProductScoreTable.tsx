"use client";

import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface Product {
  name: string;
  score: number;
  reasons: string[];
  metrics: {
    avgEngagement: string;
    conversionRate: string;
    projectedRevenue: string;
  };
}

interface ProductScoreTableProps {
  products: Product[];
}

/**
 * ProductScoreTable - Displays scored product recommendations
 * Used in Deep Dive TikTok products response
 */
export function ProductScoreTable({ products }: ProductScoreTableProps) {
  return (
    <div className="mt-4">
      <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
            <tr>
              <th className="text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide px-4 py-3">
                Product
              </th>
              <th className="text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide px-4 py-3">
                Score
              </th>
              <th className="text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide px-4 py-3">
                Key Metrics
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-[var(--bg-secondary)] transition-colors">
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-2">
                      {product.name}
                    </p>
                    <div className="space-y-1">
                      {product.reasons.map((reason, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-[var(--text-secondary)]">
                            {reason}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Badge
                      variant={product.score >= 90 ? "success" : product.score >= 80 ? "info" : "neutral"}
                      size="md"
                    >
                      {product.score}/100
                    </Badge>
                    {/* Score bar */}
                    <div className="w-16 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent)] rounded-full"
                        style={{ width: `${product.score}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-secondary)]">Engagement:</span>
                      <span className="text-[var(--text-primary)] font-mono">
                        {product.metrics.avgEngagement}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-secondary)]">Conversion:</span>
                      <span className="text-[var(--text-primary)] font-mono">
                        {product.metrics.conversionRate}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-secondary)]">Proj. Revenue:</span>
                      <span className="text-[var(--text-primary)] font-mono font-semibold">
                        {product.metrics.projectedRevenue}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

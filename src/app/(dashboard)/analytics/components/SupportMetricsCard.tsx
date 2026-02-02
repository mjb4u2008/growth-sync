"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * SupportMetricsCard - Compact summary of support/inbox metrics
 * Links to inbox page for details
 */
export function SupportMetricsCard() {
  // TODO: Pull real data from inbox store or API
  const stats = {
    openTickets: 47,
    avgResponse: "2.4h",
    resolvedPercent: 94,
  };

  return (
    <Card hoverable padding="lg">
      <CardHeader>
        <CardTitle>Support Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Open Tickets</span>
            <span className="font-mono font-semibold text-[var(--text-primary)]">
              {stats.openTickets}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Avg Response</span>
            <span className="font-mono font-semibold text-[var(--text-primary)]">
              {stats.avgResponse}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Resolved</span>
            <span className="font-mono font-semibold text-green-600">
              {stats.resolvedPercent}%
            </span>
          </div>
        </div>

        <Link href="/inbox">
          <Button variant="ghost" size="sm" className="w-full mt-4">
            View inbox →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

"use client";

import { Avatar } from "@/components/ui/avatar";
import { CustomerBadge } from "./CustomerBadge";
import { OrderCard } from "./OrderCard";
import { formatCurrency } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import type { Customer } from "../types";

interface CustomerPanelProps {
  customer: Customer;
}

export function CustomerPanel({ customer }: CustomerPanelProps) {
  console.log('[CustomerPanel] Rendering with customer:', customer?.name);
  console.log('[CustomerPanel] Customer data:', customer);

  return (
    <div className="h-full bg-[var(--bg-secondary)] overflow-y-auto">
      {/* Header - Compact */}
      <div className="p-4 border-b border-[var(--border)] bg-white">
        <div className="flex items-start gap-3 mb-3">
          <Avatar name={customer.name} size="md" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold font-display text-[var(--text-primary)] mb-0.5 truncate">
              {customer.name}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] truncate">{customer.email}</p>
          </div>
        </div>

        {/* Badges - Inline */}
        {customer.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {customer.badges.map(badge => (
              <CustomerBadge key={badge} type={badge} size="sm" />
            ))}
          </div>
        )}

        {/* Stats - Side by side, compact */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <div>
            <p className="text-[10px] text-[var(--text-muted)] mb-0.5 uppercase tracking-wide">LTV</p>
            <p className="text-sm font-bold font-mono text-[var(--accent)]">
              {formatCurrency(customer.ltv)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-muted)] mb-0.5 uppercase tracking-wide">Orders</p>
            <p className="text-sm font-bold font-mono text-[var(--text-primary)]">
              {customer.totalOrders}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders - Max 3, compact */}
      <div className="p-3">
        <h4 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-2">
          Recent Orders
        </h4>
        {customer.orders.length > 0 ? (
          <div className="space-y-2">
            {customer.orders.slice(0, 3).map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
            {customer.orders.length > 3 && (
              <button className="w-full text-xs text-[var(--accent)] hover:underline font-medium pt-1">
                View all {customer.orders.length} orders →
              </button>
            )}
          </div>
        ) : (
          <p className="text-xs text-[var(--text-muted)]">No recent orders</p>
        )}
      </div>

      {/* Past Conversations - Muted, passive */}
      <div className="p-3 border-t border-[var(--border)]">
        <h4 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide mb-2">
          Past Conversations
        </h4>
        {customer.pastConversations.length > 0 ? (
          <div className="space-y-2">
            {customer.pastConversations.map(past => (
              <div key={past.id} className="flex items-start gap-2">
                <MessageSquare className="h-3 w-3 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--text-secondary)] truncate">
                    {past.subject}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    {past.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[var(--text-muted)]">No past conversations</p>
        )}
      </div>
    </div>
  );
}

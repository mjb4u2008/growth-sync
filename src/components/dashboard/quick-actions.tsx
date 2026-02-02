"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, DollarSign, Package } from "lucide-react";

const actions = [
  {
    id: "action_1",
    label: "View 3 Urgent Messages",
    icon: MessageSquare,
    url: "/inbox",
    urgency: "high",
    count: 3,
  },
  {
    id: "action_2",
    label: "Review 2 Pending Refunds",
    icon: DollarSign,
    url: "/orders",
    urgency: "medium",
    count: 2,
  },
  {
    id: "action_3",
    label: "Buy 4 Shipping Labels",
    icon: Package,
    url: "/orders",
    urgency: "ready",
    count: 4,
  },
];

interface QuickActionsProps {
  delay?: number;
}

/**
 * Quick Actions - The 3 most important things to do RIGHT NOW
 *
 * Generated dynamically based on what needs attention.
 * Always actionable, always relevant.
 */
export function QuickActions({ delay = 0 }: QuickActionsProps) {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-6">
      <h3 className="text-sm font-semibold font-display text-text-primary uppercase tracking-wider mb-4">
        Quick Actions
      </h3>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const variant =
            action.urgency === "high"
              ? "primary"
              : action.urgency === "ready"
              ? "primary"
              : "secondary";

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: delay + index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
            >
              <Link href={action.url}>
                <Button
                  variant={variant}
                  className="w-full justify-start"
                  leftIcon={<Icon className="h-4 w-4" />}
                >
                  {action.label}
                </Button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

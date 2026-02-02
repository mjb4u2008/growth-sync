"use client";

import { motion } from "framer-motion";
import { CreditCard, FileText, TrendingUp, Download, Check } from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";

/**
 * BillingTab - Subscription and payment management (placeholder for V1)
 * Shows billing info with mock data
 */
export function BillingTab() {
  const handleManagePlan = () => {
    alert("Plan management coming soon! (mock action)");
  };

  const handleUpdatePayment = () => {
    alert("Payment method update coming soon! (mock action)");
  };

  const handleDownloadInvoice = (id: string) => {
    alert(`Downloading invoice ${id}... (mock action)`);
  };

  // Mock billing data
  const mockInvoices = [
    { id: "INV-2026-002", date: "Feb 1, 2026", amount: "$99.00", status: "Paid" },
    { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$99.00", status: "Paid" },
    { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$99.00", status: "Paid" },
  ];

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 0 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Current Plan"
          description="Your subscription and plan details"
        >
          <div className="p-6 border-2 border-[var(--accent)] rounded-xl bg-[var(--accent)]/5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
                    Pro Plan
                  </h3>
                  <Badge variant="success" size="md">
                    Active
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-[var(--accent)] mb-1">
                  $99<span className="text-base font-normal">/month</span>
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Renews on March 1, 2026
                </p>
              </div>
              <Button variant="primary" size="md" onClick={handleManagePlan}>
                Manage Plan
              </Button>
            </div>

            {/* Plan Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[var(--text-primary)]">Unlimited orders</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[var(--text-primary)]">AI-powered responses</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[var(--text-primary)]">5 team seats</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[var(--text-primary)]">Priority support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[var(--text-primary)]">Advanced analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[var(--text-primary)]">Custom integrations</span>
              </div>
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Payment Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 1 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Payment Method"
          description="Manage your payment information"
        >
          <div className="flex items-start justify-between p-4 border border-[var(--border)] rounded-lg">
            <div className="flex items-start gap-3">
              <CreditCard className="w-10 h-10 p-2 rounded-lg bg-gray-100 text-[var(--text-secondary)] flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                  Visa ending in 4242
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Expires 12/2026
                </p>
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={handleUpdatePayment}>
              Update
            </Button>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Usage This Period */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 2 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Usage This Period"
          description="Your usage for the current billing cycle"
        >
          <div className="space-y-4">
            {/* Orders */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--text-primary)]">Orders Processed</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  1,247 <span className="text-[var(--text-secondary)] font-normal">/ Unlimited</span>
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[var(--accent)] h-2 rounded-full"
                  style={{ width: "62%" }}
                />
              </div>
            </div>

            {/* AI Responses */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--text-primary)]">AI Responses Generated</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  3,847 <span className="text-[var(--text-secondary)] font-normal">/ Unlimited</span>
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[var(--accent)] h-2 rounded-full"
                  style={{ width: "77%" }}
                />
              </div>
            </div>

            {/* Team Seats */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--text-primary)]">Team Seats Used</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  2 <span className="text-[var(--text-secondary)] font-normal">/ 5</span>
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[var(--accent)] h-2 rounded-full"
                  style={{ width: "40%" }}
                />
              </div>
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 3 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Billing History"
          description="View and download past invoices"
        >
          <div className="space-y-2">
            {mockInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 border border-[var(--border)] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[var(--text-secondary)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {invoice.id}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {invoice.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {invoice.amount}
                  </span>
                  <Badge variant="success" size="sm">
                    {invoice.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownloadInvoice(invoice.id)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </SettingsSection>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Database, Download, Upload, Trash2, AlertTriangle, Shield } from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { SettingsRow } from "../components/SettingsRow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";

/**
 * DataPrivacyTab - Data export, import, and account deletion (placeholder for V1)
 * Shows data management options with simulated functionality
 */
export function DataPrivacyTab() {
  const handleExportData = () => {
    alert("Data export request submitted! You'll receive an email when ready. (mock action)");
  };

  const handleImportData = (source: string) => {
    alert(`Import from ${source} coming soon! (mock action)`);
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      alert("Clear data feature coming soon! (mock action)");
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone.")) {
      alert("Account deletion coming soon! (mock action)");
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Your Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 0 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Export Your Data"
          description="Download a copy of your data for backup or transfer"
        >
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">
              Request an export of your data. You'll receive an email with a download link when the export is ready.
            </p>

            {/* Data Types */}
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-[var(--text-primary)]">Conversations & Messages</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-[var(--text-primary)]">Orders & Customers</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-[var(--text-primary)]">Products & Inventory</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-[var(--text-primary)]">Automation Policies</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-[var(--text-primary)]">Analytics & Reports</span>
              </label>
            </div>

            {/* Format Selector */}
            <SettingsRow
              label="Export Format"
              description="Choose the file format for your export"
            >
              <select className="px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm">
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
            </SettingsRow>

            <Button
              variant="primary"
              size="md"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4 mr-2" />
              Request Data Export
            </Button>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-900">
                <span className="font-semibold">Note:</span> Large exports may take up to 24 hours to process.
                You'll receive an email when your export is ready.
              </p>
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Import Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 1 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Import Data"
          description="Migrate data from other platforms"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Gorgias */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <Upload className="w-6 h-6 text-[var(--accent)] mb-3" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                Gorgias
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                Import conversations and customer data from Gorgias
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                disabled
                onClick={() => handleImportData("Gorgias")}
              >
                Import
              </Button>
              <Badge variant="neutral" size="sm" className="mt-2">
                Coming Soon
              </Badge>
            </div>

            {/* Zendesk */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <Upload className="w-6 h-6 text-[var(--accent)] mb-3" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                Zendesk
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                Import tickets and customer data from Zendesk
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                disabled
                onClick={() => handleImportData("Zendesk")}
              >
                Import
              </Button>
              <Badge variant="neutral" size="sm" className="mt-2">
                Coming Soon
              </Badge>
            </div>

            {/* CSV */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <Upload className="w-6 h-6 text-[var(--accent)] mb-3" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                CSV Upload
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                Upload customer and order data via CSV file
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                disabled
                onClick={() => handleImportData("CSV")}
              >
                Upload CSV
              </Button>
              <Badge variant="neutral" size="sm" className="mt-2">
                Coming Soon
              </Badge>
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Data Retention */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 2 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Data Retention"
          description="Configure how long we keep your data"
        >
          <div className="space-y-4">
            <SettingsRow
              label="Conversation History"
              description="How long to keep closed conversations"
            >
              <select
                disabled
                className="px-3 py-2 bg-gray-50 border border-[var(--border)] rounded-lg text-sm opacity-60 cursor-not-allowed"
              >
                <option>Forever (Default)</option>
                <option>1 year</option>
                <option>2 years</option>
                <option>5 years</option>
              </select>
            </SettingsRow>

            <SettingsRow
              label="Analytics Data"
              description="How long to keep analytics and reports"
            >
              <select
                disabled
                className="px-3 py-2 bg-gray-50 border border-[var(--border)] rounded-lg text-sm opacity-60 cursor-not-allowed"
              >
                <option>Forever (Default)</option>
                <option>1 year</option>
                <option>2 years</option>
              </select>
            </SettingsRow>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Coming Soon:</span> Custom data retention policies
                for compliance requirements (GDPR, CCPA, etc.)
              </p>
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 3 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Danger Zone"
          description="Irreversible and destructive actions"
          danger
        >
          <div className="space-y-4">
            {/* Clear All Data */}
            <div className="flex items-start justify-between p-4 border border-red-300 rounded-lg bg-red-50">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900 mb-1">
                    Clear All Data
                  </p>
                  <p className="text-xs text-red-700">
                    Permanently delete all conversations, orders, and analytics. This cannot be undone.
                  </p>
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={handleClearData}
              >
                Clear Data
              </Button>
            </div>

            {/* Delete Account */}
            <div className="flex items-start justify-between p-4 border border-red-300 rounded-lg bg-red-50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900 mb-1">
                    Delete Account
                  </p>
                  <p className="text-xs text-red-700">
                    Permanently delete your account, all data, and cancel your subscription.
                    This action is irreversible.
                  </p>
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Privacy & Compliance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 4 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Privacy & Compliance"
          description="Learn about how we protect your data"
        >
          <div className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-lg">
            <Shield className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">
                Data Protection & Privacy
              </p>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                Growth Sync is compliant with GDPR, CCPA, and other data protection regulations.
                We use industry-standard encryption and security practices.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://growthsync.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--accent)] hover:underline"
                >
                  Privacy Policy →
                </a>
                <a
                  href="https://growthsync.com/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--accent)] hover:underline"
                >
                  Security Practices →
                </a>
                <a
                  href="https://growthsync.com/compliance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--accent)] hover:underline"
                >
                  Compliance →
                </a>
              </div>
            </div>
          </div>
        </SettingsSection>
      </motion.div>
    </div>
  );
}

"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettingsState } from "../store";
import { springConfigs } from "@/lib/spring-configs";

/**
 * ConnectPlatformModal - Shows OAuth simulation message
 * In production, this would redirect to platform OAuth
 * For demo, shows message and simulates connection after delay
 */
export function ConnectPlatformModal() {
  const modalOpen = useSettingsState((state) => state.connectPlatformModalOpen);
  const platform = useSettingsState((state) => state.connectingPlatform);
  const closeModal = useSettingsState((state) => state.closeConnectPlatformModal);

  if (!modalOpen || !platform) return null;

  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

  return createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          className="bg-white rounded-xl shadow-lg w-full max-w-[calc(100vw-2rem)] sm:max-w-md pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={springConfigs.bouncy}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-lg font-semibold font-display text-[var(--text-primary)]">
              Connect {platformName}
            </h2>
            <button
              onClick={closeModal}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  OAuth Flow Simulation
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  In production, this would redirect you to {platformName}'s OAuth
                  authorization page where you would grant Growth Sync access to your
                  account.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                What would happen:
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">1.</span>
                  <span>You'd be redirected to {platformName}'s login page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">2.</span>
                  <span>You'd review and approve requested permissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">3.</span>
                  <span>You'd be redirected back to Growth Sync with an access token</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">4.</span>
                  <span>We'd securely store your credentials and begin syncing</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Demo Mode:</span> This modal will
                automatically close in a moment and simulate a successful connection.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-4 sm:px-6 py-4 border-t border-[var(--border)]">
            <Button variant="secondary" size="md" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                // In production: window.location.href = `/api/auth/${platform}/authorize`;
                // For demo: just close and let the parent component handle the connection
                closeModal();
              }}
            >
              Simulate Connection
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

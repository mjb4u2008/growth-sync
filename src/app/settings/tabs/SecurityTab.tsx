"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Key, Smartphone, History, AlertTriangle } from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { SettingsRow } from "../components/SettingsRow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";

/**
 * SecurityTab - Password, 2FA, sessions, and API keys (placeholder for V1)
 * Shows security settings with simulated functionality
 */
export function SecurityTab() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = () => {
    setIsChangingPassword(true);
    setTimeout(() => {
      setIsChangingPassword(false);
      alert("Password change coming soon! (mock action)");
    }, 1000);
  };

  const handleSignOutAll = () => {
    if (confirm("Sign out of all sessions except this one?")) {
      alert("Sessions cleared! (mock action)");
    }
  };

  // Mock session data
  const mockSessions = [
    {
      id: "1",
      device: "MacBook Pro",
      location: "San Francisco, CA",
      lastActive: "Currently active",
      current: true,
    },
    {
      id: "2",
      device: "iPhone 15 Pro",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      current: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 0 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Password"
          description="Update your password and security settings"
        >
          <div className="space-y-4">
            <SettingsRow
              label="Current Password"
              description="Enter your current password"
            >
              <Input type="password" placeholder="••••••••" className="max-w-xs" />
            </SettingsRow>

            <SettingsRow
              label="New Password"
              description="Must be at least 8 characters"
            >
              <Input type="password" placeholder="••••••••" className="max-w-xs" />
            </SettingsRow>

            <SettingsRow
              label="Confirm Password"
              description="Re-enter your new password"
            >
              <Input type="password" placeholder="••••••••" className="max-w-xs" />
            </SettingsRow>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handlePasswordChange}
                disabled={isChangingPassword}
              >
                {isChangingPassword ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 1 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
        >
          <div className="flex items-start justify-between p-4 border border-[var(--border)] rounded-lg">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                  Authenticator App
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Use an authenticator app for two-factor authentication
                </p>
                <Badge variant="neutral" size="sm" className="mt-2">
                  Coming Soon
                </Badge>
              </div>
            </div>
            <Button variant="secondary" size="sm" disabled>
              Enable
            </Button>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Active Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 2 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Active Sessions"
          description="Manage where you're signed in"
          action={{
            label: "Sign Out All",
            onClick: handleSignOutAll,
          }}
        >
          <div className="space-y-3">
            {mockSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start justify-between p-4 border border-[var(--border)] rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <History className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {session.device}
                      </p>
                      {session.current && (
                        <Badge variant="success" size="sm">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="ghost" size="sm">
                    Sign Out
                  </Button>
                )}
              </div>
            ))}
          </div>
        </SettingsSection>
      </motion.div>

      {/* API Keys */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 3 * staggerDelays.tight }}
      >
        <SettingsSection
          title="API Keys"
          description="Generate and manage API keys for integrations"
        >
          <div className="flex items-start justify-between p-4 border border-[var(--border)] rounded-lg">
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                  API Access
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Create API keys to access Growth Sync programmatically
                </p>
                <Badge variant="neutral" size="sm" className="mt-2">
                  Coming Soon
                </Badge>
              </div>
            </div>
            <Button variant="secondary" size="sm" disabled>
              Generate Key
            </Button>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Login History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 4 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Login History"
          description="Recent authentication activity on your account"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm py-2">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-[var(--text-primary)]">Successful login</p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    San Francisco, CA • MacBook Pro
                  </p>
                </div>
              </div>
              <span className="text-xs text-[var(--text-secondary)]">Today, 9:15 AM</span>
            </div>

            <div className="flex items-center justify-between text-sm py-2">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-[var(--text-primary)]">Successful login</p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    San Francisco, CA • iPhone 15 Pro
                  </p>
                </div>
              </div>
              <span className="text-xs text-[var(--text-secondary)]">Yesterday, 7:42 PM</span>
            </div>

            <div className="flex items-center justify-between text-sm py-2">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-[var(--text-primary)]">Successful login</p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    San Francisco, CA • MacBook Pro
                  </p>
                </div>
              </div>
              <span className="text-xs text-[var(--text-secondary)]">Jan 31, 8:30 AM</span>
            </div>
          </div>
        </SettingsSection>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, CheckCircle, Upload, X } from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { SettingsRow } from "../components/SettingsRow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSettingsState } from "../store";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";
import type { UserProfile } from "../types";

/**
 * ProfileTab - Personal account settings
 * Allows editing user profile, contact info, and preferences
 */
export function ProfileTab() {
  const user = useSettingsState((state) => state.user);
  const updateUser = useSettingsState((state) => state.updateUser);

  const [formData, setFormData] = useState<UserProfile>(user);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    updateUser(formData);
    setIsSaving(false);
    setHasChanges(false);

    // TODO: Connect to PATCH /api/auth/profile endpoint
    // const response = await fetch("/api/auth/profile", {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // if (!response.ok) throw new Error("Failed to update profile");

    // Show success feedback (toast would go here)
    alert("Profile updated successfully!");
  };

  const handleAvatarUpload = () => {
    // Simulate file upload
    alert("Avatar upload coming soon! (mock action)");
    // TODO: Implement file upload
    // const input = document.createElement("input");
    // input.type = "file";
    // input.accept = "image/*";
    // input.onchange = async (e) => { ... };
    // input.click();
  };

  const handleAvatarRemove = () => {
    handleChange("avatar", "");
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 0 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Profile Picture"
          description="Update your photo and personal details"
        >
          <div className="flex items-center gap-6">
            {/* Avatar Display */}
            <div className="relative">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt={`${formData.firstName} ${formData.lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[var(--border)]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[var(--accent)]/10 border-2 border-[var(--border)] flex items-center justify-center">
                  <User className="w-12 h-12 text-[var(--accent)]" />
                </div>
              )}
            </div>

            {/* Avatar Actions */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handleAvatarUpload}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              {formData.avatar && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAvatarRemove}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-4">
            Recommended: Square image, at least 400x400px. Max file size: 5MB.
          </p>
        </SettingsSection>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 1 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Personal Information"
          description="Manage your personal details and contact information"
        >
          <div className="space-y-4">
            {/* First Name */}
            <SettingsRow
              label="First Name"
              description="Your given name"
            >
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="max-w-xs"
              />
            </SettingsRow>

            {/* Last Name */}
            <SettingsRow
              label="Last Name"
              description="Your family name"
            >
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="max-w-xs"
              />
            </SettingsRow>

            {/* Email */}
            <SettingsRow
              label="Email Address"
              description="Your primary email for notifications and login"
            >
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="max-w-xs"
                />
                {formData.emailVerified && (
                  <Badge variant="success" size="sm">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </SettingsRow>

            {/* Phone */}
            <SettingsRow
              label="Phone Number"
              description="Optional: For account recovery and notifications"
            >
              <Input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="max-w-xs"
              />
            </SettingsRow>

            {/* Role (Read-only) */}
            <SettingsRow
              label="Role"
              description="Your account role in the organization"
            >
              <Badge variant="neutral" size="md">
                {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
              </Badge>
            </SettingsRow>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 2 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Preferences"
          description="Customize how you see dates, times, and currency"
        >
          <div className="space-y-4">
            {/* Timezone */}
            <SettingsRow
              label="Timezone"
              description="Used for displaying dates and scheduling"
            >
              <select
                value={formData.timezone}
                onChange={(e) => handleChange("timezone", e.target.value)}
                className="px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm max-w-xs"
              >
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Australia/Sydney">Sydney (AEDT)</option>
              </select>
            </SettingsRow>

            {/* Date Format */}
            <SettingsRow
              label="Date Format"
              description="How dates are displayed throughout the app"
            >
              <select
                value={formData.dateFormat}
                onChange={(e) => handleChange("dateFormat", e.target.value)}
                className="px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm max-w-xs"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY (02/02/2026)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (02/02/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-02-02)</option>
                <option value="MMM D, YYYY">MMM D, YYYY (Feb 2, 2026)</option>
                <option value="D MMM YYYY">D MMM YYYY (2 Feb 2026)</option>
              </select>
            </SettingsRow>

            {/* Currency Display (future feature) */}
            <SettingsRow
              label="Currency Display"
              description="Default currency for prices and reports"
            >
              <select
                disabled
                className="px-3 py-2 bg-gray-50 border border-[var(--border)] rounded-lg text-sm max-w-xs opacity-60 cursor-not-allowed"
              >
                <option>USD ($) - Coming Soon</option>
              </select>
            </SettingsRow>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 3 * staggerDelays.tight }}
        className="flex justify-end gap-3"
      >
        <Button
          variant="secondary"
          size="md"
          disabled={!hasChanges || isSaving}
          onClick={() => {
            setFormData(user);
            setHasChanges(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="md"
          disabled={!hasChanges || isSaving}
          onClick={handleSave}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </motion.div>
    </div>
  );
}

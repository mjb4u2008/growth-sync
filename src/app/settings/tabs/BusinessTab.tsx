"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Upload, X, Globe } from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { SettingsRow } from "../components/SettingsRow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettingsState } from "../store";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";
import type { BrandProfile } from "../types";

/**
 * BusinessTab - Brand and company information
 * Manages brand identity, business details, and support contact info
 */
export function BusinessTab() {
  const brand = useSettingsState((state) => state.brand);
  const updateBrand = useSettingsState((state) => state.updateBrand);

  const [formData, setFormData] = useState<BrandProfile>(brand);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: keyof BrandProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleAddressChange = (field: keyof BrandProfile["address"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    updateBrand(formData);
    setIsSaving(false);
    setHasChanges(false);

    // TODO: Connect to PATCH /api/brands/me endpoint
    // const response = await fetch("/api/brands/me", {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // if (!response.ok) throw new Error("Failed to update brand");

    // Show success feedback (toast would go here)
    alert("Business information updated successfully!");
  };

  const handleLogoUpload = () => {
    // Simulate file upload
    alert("Logo upload coming soon! (mock action)");
    // TODO: Implement file upload
    // const input = document.createElement("input");
    // input.type = "file";
    // input.accept = "image/*";
    // input.onchange = async (e) => { ... };
    // input.click();
  };

  const handleLogoRemove = () => {
    handleChange("logo", "");
  };

  return (
    <div className="space-y-6">
      {/* Brand Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 0 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Brand Logo"
          description="Upload your company logo for invoices and emails"
        >
          <div className="flex items-center gap-6">
            {/* Logo Display */}
            <div className="relative">
              {formData.logo ? (
                <img
                  src={formData.logo}
                  alt={formData.brandName}
                  className="w-24 h-24 rounded-lg object-cover border-2 border-[var(--border)]"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-[var(--accent)]/10 border-2 border-[var(--border)] flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-[var(--accent)]" />
                </div>
              )}
            </div>

            {/* Logo Actions */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handleLogoUpload}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
              {formData.logo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogoRemove}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-4">
            Recommended: Square or landscape, at least 400x400px. PNG or SVG preferred. Max file size: 5MB.
          </p>
        </SettingsSection>
      </motion.div>

      {/* Business Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 1 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Business Information"
          description="Your company details and public information"
        >
          <div className="space-y-4">
            {/* Brand Name */}
            <SettingsRow
              label="Brand Name"
              description="Your public-facing brand name"
            >
              <Input
                type="text"
                value={formData.brandName}
                onChange={(e) => handleChange("brandName", e.target.value)}
                className="max-w-md"
              />
            </SettingsRow>

            {/* Legal Name */}
            <SettingsRow
              label="Legal Name"
              description="Registered company name for legal documents"
            >
              <Input
                type="text"
                value={formData.legalName}
                onChange={(e) => handleChange("legalName", e.target.value)}
                className="max-w-md"
              />
            </SettingsRow>

            {/* Website */}
            <SettingsRow
              label="Website"
              description="Your company website URL"
            >
              <div className="flex items-center gap-2 max-w-md">
                <Globe className="w-4 h-4 text-[var(--text-secondary)]" />
                <Input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  placeholder="https://"
                  className="flex-1"
                />
              </div>
            </SettingsRow>

            {/* Industry */}
            <SettingsRow
              label="Industry"
              description="Your primary business category"
            >
              <select
                value={formData.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                className="px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm max-w-md"
              >
                <option value="E-commerce Software">E-commerce Software</option>
                <option value="Retail & Consumer Goods">Retail & Consumer Goods</option>
                <option value="Fashion & Apparel">Fashion & Apparel</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Electronics & Tech">Electronics & Tech</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="B2B Services">B2B Services</option>
                <option value="Other">Other</option>
              </select>
            </SettingsRow>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Business Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 2 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Business Address"
          description="Your company's registered business address"
        >
          <div className="space-y-4">
            {/* Street Address */}
            <SettingsRow
              label="Street Address"
              description="Building number and street name"
            >
              <Input
                type="text"
                value={formData.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                className="max-w-md"
              />
            </SettingsRow>

            {/* City */}
            <SettingsRow
              label="City"
              description="City or town"
            >
              <Input
                type="text"
                value={formData.address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                className="max-w-md"
              />
            </SettingsRow>

            {/* State/Province & Postal Code */}
            <SettingsRow
              label="State & Postal Code"
              description="State/province and ZIP/postal code"
            >
              <div className="flex gap-3 max-w-md">
                <Input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  placeholder="State"
                  className="flex-1"
                />
                <Input
                  type="text"
                  value={formData.address.postalCode}
                  onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                  placeholder="Postal Code"
                  className="flex-1"
                />
              </div>
            </SettingsRow>

            {/* Country */}
            <SettingsRow
              label="Country"
              description="Country or region"
            >
              <select
                value={formData.address.country}
                onChange={(e) => handleAddressChange("country", e.target.value)}
                className="px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm max-w-md"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Other">Other</option>
              </select>
            </SettingsRow>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Support Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 3 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Support Contact"
          description="Customer support email and phone number"
        >
          <div className="space-y-4">
            {/* Support Email */}
            <SettingsRow
              label="Support Email"
              description="Email address for customer support inquiries"
            >
              <Input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => handleChange("supportEmail", e.target.value)}
                placeholder="support@example.com"
                className="max-w-md"
              />
            </SettingsRow>

            {/* Support Phone */}
            <SettingsRow
              label="Support Phone"
              description="Optional: Phone number for customer support"
            >
              <Input
                type="tel"
                value={formData.supportPhone || ""}
                onChange={(e) => handleChange("supportPhone", e.target.value)}
                placeholder="+1 (555) 100-2000"
                className="max-w-md"
              />
            </SettingsRow>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 4 * staggerDelays.tight }}
        className="flex justify-end gap-3"
      >
        <Button
          variant="secondary"
          size="md"
          disabled={!hasChanges || isSaving}
          onClick={() => {
            setFormData(brand);
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

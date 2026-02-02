"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, TrendingUp, Clock, Target, CheckCircle, X, Plus, ArrowRight } from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { SettingsRow } from "../components/SettingsRow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSettingsState } from "../store";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";
import type { BrandVoice } from "../types";
import Link from "next/link";

/**
 * AIAutomationTab - Brand voice and AI automation settings
 * Manages tone, phrases, automation policies, and AI performance stats
 */
export function AIAutomationTab() {
  const brandVoice = useSettingsState((state) => state.brandVoice);
  const updateBrandVoice = useSettingsState((state) => state.updateBrandVoice);

  const [formData, setFormData] = useState<BrandVoice>(brandVoice);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [newPhraseToUse, setNewPhraseToUse] = useState("");
  const [newPhraseToAvoid, setNewPhraseToAvoid] = useState("");

  const handleToneChange = (tone: BrandVoice["tone"]) => {
    setFormData((prev) => ({ ...prev, tone }));
    setHasChanges(true);
  };

  const handleSignatureChange = (signature: string) => {
    setFormData((prev) => ({ ...prev, signature }));
    setHasChanges(true);
  };

  const addPhraseToUse = () => {
    if (newPhraseToUse.trim()) {
      setFormData((prev) => ({
        ...prev,
        phrasesToUse: [...prev.phrasesToUse, newPhraseToUse.trim()],
      }));
      setNewPhraseToUse("");
      setHasChanges(true);
    }
  };

  const removePhraseToUse = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      phrasesToUse: prev.phrasesToUse.filter((_, i) => i !== index),
    }));
    setHasChanges(true);
  };

  const addPhraseToAvoid = () => {
    if (newPhraseToAvoid.trim()) {
      setFormData((prev) => ({
        ...prev,
        phrasesToAvoid: [...prev.phrasesToAvoid, newPhraseToAvoid.trim()],
      }));
      setNewPhraseToAvoid("");
      setHasChanges(true);
    }
  };

  const removePhraseToAvoid = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      phrasesToAvoid: prev.phrasesToAvoid.filter((_, i) => i !== index),
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    updateBrandVoice(formData);
    setIsSaving(false);
    setHasChanges(false);

    // TODO: Connect to PATCH /api/brand-voice endpoint
    // const response = await fetch("/api/brand-voice", {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // if (!response.ok) throw new Error("Failed to update brand voice");

    // Show success feedback (toast would go here)
    alert("Brand voice settings updated successfully!");
  };

  // Mock AI stats (would come from API)
  const mockStats = {
    responsesGenerated: 3847,
    responsesSent: 3214,
    accuracy: 96.2,
    avgDraftTime: 2.4,
  };

  return (
    <div className="space-y-6">
      {/* Brand Voice Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 0 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Brand Voice"
          description="Configure how AI should communicate with your customers"
        >
          <div className="space-y-6">
            {/* Tone Selector */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                Communication Tone
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(["professional", "friendly", "casual", "gen-z"] as const).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => handleToneChange(tone)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.tone === tone
                        ? "border-[var(--accent)] bg-[var(--accent)]/5"
                        : "border-[var(--border)] hover:border-[var(--accent)]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold capitalize">
                        {tone === "gen-z" ? "Gen-Z" : tone}
                      </span>
                      {formData.tone === tone && (
                        <CheckCircle className="w-4 h-4 text-[var(--accent)]" />
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] text-left">
                      {tone === "professional" && "Formal and business-like"}
                      {tone === "friendly" && "Warm and approachable"}
                      {tone === "casual" && "Relaxed and conversational"}
                      {tone === "gen-z" && "Fun and trendy"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Phrases to Use */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Phrases to Use
              </label>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                Encourage AI to use these phrases in customer communications
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.phrasesToUse.map((phrase, index) => (
                  <Badge
                    key={index}
                    variant="neutral"
                    size="md"
                    className="pr-1"
                  >
                    {phrase}
                    <button
                      onClick={() => removePhraseToUse(index)}
                      className="ml-2 hover:text-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPhraseToUse}
                  onChange={(e) => setNewPhraseToUse(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addPhraseToUse()}
                  placeholder="Add a phrase..."
                  className="flex-1 px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm"
                />
                <Button variant="secondary" size="sm" onClick={addPhraseToUse}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Phrases to Avoid */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Phrases to Avoid
              </label>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                Discourage AI from using these phrases
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.phrasesToAvoid.map((phrase, index) => (
                  <Badge
                    key={index}
                    variant="error"
                    size="md"
                    className="pr-1"
                  >
                    {phrase}
                    <button
                      onClick={() => removePhraseToAvoid(index)}
                      className="ml-2 hover:text-red-800 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPhraseToAvoid}
                  onChange={(e) => setNewPhraseToAvoid(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addPhraseToAvoid()}
                  placeholder="Add a phrase to avoid..."
                  className="flex-1 px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm"
                />
                <Button variant="secondary" size="sm" onClick={addPhraseToAvoid}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Email Signature */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Email Signature
              </label>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                Automatically appended to AI-generated emails
              </p>
              <textarea
                value={formData.signature}
                onChange={(e) => handleSignatureChange(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-white border border-[var(--border)] rounded-lg text-sm font-mono resize-none"
                placeholder="Best regards,&#10;The Support Team"
              />
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* AI Performance Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 1 * staggerDelays.tight }}
      >
        <SettingsSection
          title="AI Performance"
          description="Track your AI automation metrics and efficiency"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Responses Generated */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  Generated
                </span>
              </div>
              <p className="text-2xl font-bold font-display text-[var(--text-primary)]">
                {mockStats.responsesGenerated.toLocaleString()}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                AI drafts created
              </p>
            </div>

            {/* Responses Sent */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  Sent
                </span>
              </div>
              <p className="text-2xl font-bold font-display text-[var(--text-primary)]">
                {mockStats.responsesSent.toLocaleString()}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Approved & delivered
              </p>
            </div>

            {/* Accuracy */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  Accuracy
                </span>
              </div>
              <p className="text-2xl font-bold font-display text-[var(--text-primary)]">
                {mockStats.accuracy}%
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Approval rate
              </p>
            </div>

            {/* Avg Draft Time */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  Speed
                </span>
              </div>
              <p className="text-2xl font-bold font-display text-[var(--text-primary)]">
                {mockStats.avgDraftTime}s
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Avg draft time
              </p>
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Automation Policies Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 2 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Automation Policies"
          description="Manage AI response rules and automation workflows"
        >
          <div className="flex items-start justify-between p-4 border border-[var(--border)] rounded-lg">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                  AI Response Policies
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Configure when and how AI should respond to customer inquiries based on
                  ticket type, urgency, and content.
                </p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="success" size="sm">3 Active</Badge>
                  <Badge variant="neutral" size="sm">1 Draft</Badge>
                </div>
              </div>
            </div>
            <Link href="/policies">
              <Button variant="ghost" size="sm">
                Manage
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
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
            setFormData(brandVoice);
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

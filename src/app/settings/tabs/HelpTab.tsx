"use client";

import { motion } from "framer-motion";
import {
  HelpCircle,
  Book,
  Video,
  Users,
  Newspaper,
  Map,
  MessageCircle,
  Mail,
  Calendar,
  MessageSquare,
  Bug,
  Star,
  CheckCircle,
  Circle,
  PlayCircle,
} from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";

/**
 * HelpTab - Support resources and documentation
 * Provides access to tutorials, docs, support channels, and feedback options
 */
export function HelpTab() {
  const handleStartTour = () => {
    alert("Product tour coming soon! (mock action)");
  };

  const handleContactSupport = (channel: string) => {
    if (channel === "chat") {
      alert("Live chat feature coming soon!");
    } else if (channel === "email") {
      window.location.href = "mailto:support@growthsync.com";
    } else if (channel === "call") {
      alert("Schedule a call feature coming soon! (mock action)");
    }
  };

  const handleFeedback = (type: string) => {
    alert(`${type} form coming soon! (mock action)`);
  };

  // Mock setup checklist
  const setupSteps = [
    { label: "Connect your first platform", completed: true },
    { label: "Configure brand voice", completed: true },
    { label: "Set up automation policies", completed: true },
    { label: "Invite team members", completed: false },
    { label: "Configure billing", completed: false },
  ];

  const completedSteps = setupSteps.filter((s) => s.completed).length;
  const progressPercent = (completedSteps / setupSteps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Getting Started */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 0 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Getting Started"
          description="Learn how to make the most of Growth Sync"
        >
          <div className="space-y-4">
            {/* Product Tour */}
            <div className="flex items-center justify-between p-4 border border-[var(--border)] rounded-lg">
              <div className="flex items-start gap-3">
                <PlayCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                    Take the Product Tour
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Learn the basics with an interactive walkthrough
                  </p>
                </div>
              </div>
              <Button variant="primary" size="sm" onClick={handleStartTour}>
                Start Tour
              </Button>
            </div>

            {/* Setup Checklist */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                  Setup Checklist
                </h4>
                <Badge variant="neutral" size="sm">
                  {completedSteps} of {setupSteps.length}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-[var(--accent)] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Checklist Items */}
              <div className="space-y-2">
                {setupSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        step.completed
                          ? "text-[var(--text-secondary)] line-through"
                          : "text-[var(--text-primary)]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 1 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Quick Links"
          description="Browse our resources and community"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Documentation */}
            <a
              href="https://docs.growthsync.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors group"
            >
              <Book className="w-6 h-6 text-[var(--accent)] mb-2" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                Documentation
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Guides, tutorials, and API reference
              </p>
            </a>

            {/* Video Tutorials */}
            <a
              href="https://youtube.com/@growthsync"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors group"
            >
              <Video className="w-6 h-6 text-[var(--accent)] mb-2" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                Video Tutorials
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Step-by-step video guides
              </p>
            </a>

            {/* Community */}
            <a
              href="https://community.growthsync.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors group"
            >
              <Users className="w-6 h-6 text-[var(--accent)] mb-2" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                Community
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Join our Discord and Slack channels
              </p>
            </a>

            {/* Changelog */}
            <a
              href="https://growthsync.com/changelog"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors group"
            >
              <Newspaper className="w-6 h-6 text-[var(--accent)] mb-2" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                Changelog
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Latest updates and new features
              </p>
            </a>

            {/* Roadmap */}
            <a
              href="https://growthsync.com/roadmap"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors group"
            >
              <Map className="w-6 h-6 text-[var(--accent)] mb-2" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                Roadmap
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                See what we're building next
              </p>
            </a>

            {/* Help Center */}
            <a
              href="https://help.growthsync.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors group"
            >
              <HelpCircle className="w-6 h-6 text-[var(--accent)] mb-2" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                Help Center
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                FAQs and troubleshooting guides
              </p>
            </a>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 2 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Contact Support"
          description="Get help from our team when you need it"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Live Chat */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <MessageCircle className="w-6 h-6 text-[var(--accent)] mb-3" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                Live Chat
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                Chat with our support team in real-time
              </p>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => handleContactSupport("chat")}
              >
                Start Chat
              </Button>
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                Coming soon!
              </p>
            </div>

            {/* Email Support */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <Mail className="w-6 h-6 text-[var(--accent)] mb-3" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                Email Support
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                Send us an email and we'll respond within 24 hours
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => handleContactSupport("email")}
              >
                Send Email
              </Button>
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                support@growthsync.com
              </p>
            </div>

            {/* Schedule a Call */}
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <Calendar className="w-6 h-6 text-[var(--accent)] mb-3" />
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                Schedule a Call
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                Book a 30-minute call with our support team
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => handleContactSupport("call")}
              >
                Book Call
              </Button>
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                Pro plan feature
              </p>
            </div>
          </div>
        </SettingsSection>
      </motion.div>

      {/* Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 3 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Feedback"
          description="Help us improve Growth Sync"
        >
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleFeedback("Feature Request")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Request a Feature
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleFeedback("Bug Report")}
            >
              <Bug className="w-4 h-4 mr-2" />
              Report a Bug
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleFeedback("Review")}
            >
              <Star className="w-4 h-4 mr-2" />
              Leave a Review
            </Button>
          </div>
        </SettingsSection>
      </motion.div>
    </div>
  );
}

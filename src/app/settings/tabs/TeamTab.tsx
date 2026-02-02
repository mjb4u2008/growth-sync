"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, Mail, Crown, Shield, Eye, Clock, Headphones } from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSettingsState } from "../store";
import { springConfigs, staggerDelays } from "@/lib/spring-configs";

/**
 * TeamTab - Team members and invitations (placeholder for V1)
 * Shows team member management with mock data
 */
export function TeamTab() {
  const handleInvite = () => {
    alert("Invite team member coming soon! (mock action)");
  };

  const handleRemove = (name: string) => {
    if (confirm(`Remove ${name} from the team?`)) {
      alert(`${name} removed! (mock action)`);
    }
  };

  const handleResendInvite = (email: string) => {
    alert(`Invitation resent to ${email}! (mock action)`);
  };

  // Use mock team data from store
  const team = useSettingsState((state) => state.team);

  // Separate active members from pending invites
  const activeMembers = team.filter((member) => member.status === "active");
  const pendingInvites = team.filter((member) => member.status === "invited");

  // Format last active time
  const formatLastActive = (timestamp?: string) => {
    if (!timestamp) return "Never";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Currently active";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  // Format invited time
  const formatInvitedAt = (timestamp?: string) => {
    if (!timestamp) return "Recently";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case "admin":
        return <Shield className="w-4 h-4 text-blue-500" />;
      case "member":
        return <Users className="w-4 h-4 text-green-500" />;
      case "cs-manager":
        return <Headphones className="w-4 h-4 text-purple-500" />;
      case "viewer":
        return <Eye className="w-4 h-4 text-gray-500" />;
      default:
        return <Users className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    let label = role.charAt(0).toUpperCase() + role.slice(1);
    if (role === "cs-manager") {
      label = "CS Manager";
    }
    return <Badge variant="neutral" size="sm">{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 0 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Team Members"
          description="Manage your team and their permissions"
          action={{
            label: "Invite Member",
            onClick: handleInvite,
          }}
        >
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">{activeMembers.length} of 5 seats used</span> • Upgrade to add more team members
            </p>
          </div>

          {/* Active Members */}
          <div className="space-y-3">
            {activeMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-start justify-between p-4 border border-[var(--border)] rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[var(--accent)]">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {member.name}
                      </p>
                      {getRoleIcon(member.role)}
                      {getRoleBadge(member.role)}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mb-1">
                      {member.email}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                      <Clock className="w-3 h-3" />
                      {formatLastActive(member.lastActive)}
                    </div>
                  </div>
                </div>
                {member.role !== "owner" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(member.name)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </SettingsSection>
      </motion.div>

      {/* Pending Invitations */}
      {pendingInvites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfigs.bouncy, delay: 1 * staggerDelays.tight }}
        >
          <SettingsSection
            title="Pending Invitations"
            description="Team members who haven't accepted yet"
          >
            <div className="space-y-3">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-start justify-between p-4 border border-[var(--border)] rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <Mail className="w-10 h-10 p-2 rounded-full bg-gray-100 text-[var(--text-secondary)] flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {invite.email}
                        </p>
                        {getRoleBadge(invite.role)}
                        <Badge variant="warning" size="sm">
                          Pending
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Invited {formatInvitedAt(invite.invitedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleResendInvite(invite.email)}
                    >
                      Resend
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(invite.name)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </SettingsSection>
        </motion.div>
      )}

      {/* Roles & Permissions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfigs.bouncy, delay: 2 * staggerDelays.tight }}
      >
        <SettingsSection
          title="Roles & Permissions"
          description="Understand what each role can do"
        >
          <div className="space-y-4">
            {/* Owner */}
            <div className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-lg">
              <Crown className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  Owner
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Full access to all features, billing, and team management. Can delete account.
                </p>
              </div>
            </div>

            {/* Admin */}
            <div className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-lg">
              <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  Admin
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Access to all features, can manage team members and settings. Cannot manage billing or delete account.
                </p>
              </div>
            </div>

            {/* Member */}
            <div className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-lg">
              <Users className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  Member
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Can manage inbox, view analytics, and configure AI automation. Cannot manage team or billing.
                </p>
              </div>
            </div>

            {/* CS Manager */}
            <div className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-lg">
              <Headphones className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  CS Manager
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Inbox access only. Can manage customer conversations and send responses. Cannot access analytics, settings, or billing.
                </p>
              </div>
            </div>

            {/* Viewer */}
            <div className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-lg">
              <Eye className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  Viewer
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Read-only access to inbox and analytics. Cannot make changes or send messages.
                </p>
              </div>
            </div>
          </div>
        </SettingsSection>
      </motion.div>
    </div>
  );
}

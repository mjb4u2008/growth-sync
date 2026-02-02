import { create } from "zustand";
import type { SettingsTab, Integration, UserProfile, BrandProfile, NotificationPreference, BrandVoice, TeamMember } from "./types";
import { mockIntegrations, mockUser, mockBrand, mockNotifications, mockBrandVoice, mockTeam } from "./data";

interface SettingsState {
  // Tab state
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;

  // Data state
  user: UserProfile;
  brand: BrandProfile;
  integrations: Integration[];
  notifications: NotificationPreference[];
  brandVoice: BrandVoice;
  team: TeamMember[];

  // Data actions
  updateUser: (user: Partial<UserProfile>) => void;
  updateBrand: (brand: Partial<BrandProfile>) => void;
  connectIntegration: (platform: string) => void;
  disconnectIntegration: (platform: string) => void;
  toggleNotification: (key: string) => void;
  updateNotifications: (notifications: NotificationPreference[]) => void;
  updateBrandVoice: (voice: Partial<BrandVoice>) => void;

  // Modal states
  inviteModalOpen: boolean;
  deleteAccountModalOpen: boolean;
  connectPlatformModalOpen: boolean;
  connectingPlatform?: string;

  // Modal actions
  openInviteModal: () => void;
  closeInviteModal: () => void;
  openDeleteAccountModal: () => void;
  closeDeleteAccountModal: () => void;
  openConnectPlatformModal: (platform: string) => void;
  closeConnectPlatformModal: () => void;
}

export const useSettingsState = create<SettingsState>((set, get) => ({
  // Initial tab state
  activeTab: "profile",
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Initial data state
  user: mockUser,
  brand: mockBrand,
  integrations: mockIntegrations,
  notifications: mockNotifications,
  brandVoice: mockBrandVoice,
  team: mockTeam,

  // Data actions
  updateUser: (userData) => set((state) => ({
    user: { ...state.user, ...userData }
  })),

  updateBrand: (brandData) => set((state) => ({
    brand: { ...state.brand, ...brandData }
  })),

  connectIntegration: (platform) => set((state) => ({
    integrations: state.integrations.map((integration) =>
      integration.platform === platform
        ? {
            ...integration,
            connected: true,
            connectedAt: new Date().toISOString(),
            lastSyncedAt: new Date().toISOString(),
            stats: integration.stats || {},
          }
        : integration
    ),
  })),

  disconnectIntegration: (platform) => set((state) => ({
    integrations: state.integrations.map((integration) =>
      integration.platform === platform
        ? {
            ...integration,
            connected: false,
            connectedAt: undefined,
            lastSyncedAt: undefined,
            accountIdentifier: undefined,
            stats: undefined,
          }
        : integration
    ),
  })),

  toggleNotification: (key) => set((state) => ({
    notifications: state.notifications.map((notification) =>
      notification.key === key
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ),
  })),

  updateNotifications: (notifications) => set({ notifications }),

  updateBrandVoice: (voiceData) => set((state) => ({
    brandVoice: { ...state.brandVoice, ...voiceData }
  })),

  // Initial modal states
  inviteModalOpen: false,
  deleteAccountModalOpen: false,
  connectPlatformModalOpen: false,
  connectingPlatform: undefined,

  // Modal actions
  openInviteModal: () => set({ inviteModalOpen: true }),
  closeInviteModal: () => set({ inviteModalOpen: false }),
  openDeleteAccountModal: () => set({ deleteAccountModalOpen: true }),
  closeDeleteAccountModal: () => set({ deleteAccountModalOpen: false }),
  openConnectPlatformModal: (platform) => set({
    connectPlatformModalOpen: true,
    connectingPlatform: platform
  }),
  closeConnectPlatformModal: () => set({
    connectPlatformModalOpen: false,
    connectingPlatform: undefined
  }),
}));

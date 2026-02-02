"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface KeyboardShortcutsHelpProps {
  open: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsHelp({ open, onClose }: KeyboardShortcutsHelpProps) {
  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['J'], description: 'Next conversation' },
        { keys: ['K'], description: 'Previous conversation' },
        { keys: ['G', 'U'], description: 'Go to Urgent' },
        { keys: ['G', 'O'], description: 'Go to Open' },
        { keys: ['G', 'P'], description: 'Go to Pending' },
        { keys: ['G', 'D'], description: 'Go to Done' }
      ]
    },
    {
      category: 'Actions',
      items: [
        { keys: ['R'], description: 'Reply to conversation' },
        { keys: ['E'], description: 'Archive conversation' },
        { keys: ['A'], description: 'Assign conversation' }
      ]
    },
    {
      category: 'General',
      items: [
        { keys: ['Cmd', 'K'], description: 'Open command palette' },
        { keys: ['?'], description: 'Show keyboard shortcuts' },
        { keys: ['Esc'], description: 'Close modals' }
      ]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-8">
          {shortcuts.map((section) => (
            <div key={section.category}>
              <h3 className="text-sm font-semibold font-display text-[var(--text-primary)] mb-3">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">{item.description}</span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((key, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <kbd className="px-2 py-1 bg-[var(--bg-secondary)] rounded border border-[var(--border)] text-xs font-mono">
                            {key}
                          </kbd>
                          {i < item.keys.length - 1 && <span className="text-xs text-[var(--text-muted)]">+</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface KeyboardShortcutsHelpProps {
  open: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsHelp({
  open,
  onClose,
}: KeyboardShortcutsHelpProps) {
  const shortcuts = [
    {
      category: "Navigation",
      items: [
        { keys: ["j"], description: "Next order" },
        { keys: ["k"], description: "Previous order" },
        { keys: ["/"], description: "Focus search" },
      ],
    },
    {
      category: "Selection",
      items: [
        { keys: ["x"], description: "Toggle selection" },
        { keys: ["⌘", "a"], description: "Select all" },
      ],
    },
    {
      category: "Actions",
      items: [
        { keys: ["b"], description: "Buy labels for selected" },
        { keys: ["?"], description: "Show keyboard shortcuts" },
      ],
    },
    {
      category: "Filters (g + key)",
      items: [
        { keys: ["g", "r"], description: "Ready to ship" },
        { keys: ["g", "l"], description: "Label purchased" },
        { keys: ["g", "s"], description: "Shipped" },
        { keys: ["g", "a"], description: "All orders" },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Speed up your workflow with these shortcuts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {shortcuts.map((section) => (
            <div key={section.category}>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wide">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0"
                  >
                    <span className="text-sm text-[var(--text-secondary)]">
                      {item.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((key, keyIndex) => (
                        <kbd
                          key={keyIndex}
                          className="px-2 py-1 bg-[var(--bg-secondary)] rounded border border-[var(--border)] font-mono text-xs font-semibold"
                        >
                          {key}
                        </kbd>
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

"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useInboxState } from "../hooks/useInboxState";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const { setCurrentQueue, archiveConversation, getSelectedConversation } = useInboxState();

  const commands = [
    {
      id: 'archive',
      label: 'Archive conversation',
      shortcut: 'E',
      action: () => {
        const conv = getSelectedConversation();
        if (conv) archiveConversation(conv.id);
        onClose();
      }
    },
    {
      id: 'queue-urgent',
      label: 'Go to Urgent',
      shortcut: 'G U',
      action: () => {
        setCurrentQueue('urgent');
        onClose();
      }
    },
    {
      id: 'queue-open',
      label: 'Go to Open',
      shortcut: 'G O',
      action: () => {
        setCurrentQueue('open');
        onClose();
      }
    },
    {
      id: 'queue-pending',
      label: 'Go to Pending',
      shortcut: 'G P',
      action: () => {
        setCurrentQueue('pending');
        onClose();
      }
    },
    {
      id: 'queue-done',
      label: 'Go to Done',
      shortcut: 'G D',
      action: () => {
        setCurrentQueue('done');
        onClose();
      }
    }
  ];

  const filteredCommands = search
    ? commands.filter(cmd => cmd.label.toLowerCase().includes(search.toLowerCase()))
    : commands;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Command Palette</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a command..."
              autoFocus
              className="pl-10"
            />
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {filteredCommands.map((cmd) => (
            <button
              key={cmd.id}
              onClick={cmd.action}
              className="w-full flex items-center justify-between p-3 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
            >
              <span className="text-sm text-[var(--text-primary)]">{cmd.label}</span>
              <kbd className="px-2 py-1 bg-[var(--bg-secondary)] rounded border border-[var(--border)] text-xs font-mono">
                {cmd.shortcut}
              </kbd>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

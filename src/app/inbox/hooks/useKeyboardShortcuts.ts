import { useEffect } from "react";
import type { Queue } from "../types";

interface UseKeyboardShortcutsOptions {
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
  onArchive: () => void;
  onReply: () => void;
  onAssign: () => void;
  onOpenCommandPalette: () => void;
  onShowHelp: () => void;
  onSwitchQueue: (queue: Queue) => void;
}

export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    let gPressed = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        options.onOpenCommandPalette();
        return;
      }

      // 'g' prefix for two-key combos
      if (e.key === 'g') {
        gPressed = true;
        setTimeout(() => { gPressed = false; }, 1000);
        return;
      }

      // g+u/o/p/d
      if (gPressed) {
        e.preventDefault();
        if (e.key === 'u') options.onSwitchQueue('urgent');
        if (e.key === 'o') options.onSwitchQueue('open');
        if (e.key === 'p') options.onSwitchQueue('pending');
        if (e.key === 'd') options.onSwitchQueue('done');
        gPressed = false;
        return;
      }

      // Single-key shortcuts
      switch (e.key) {
        case 'j':
          e.preventDefault();
          options.onNavigateNext();
          break;
        case 'k':
          e.preventDefault();
          options.onNavigatePrev();
          break;
        case 'e':
          e.preventDefault();
          options.onArchive();
          break;
        case 'r':
          e.preventDefault();
          options.onReply();
          break;
        case 'a':
          e.preventDefault();
          options.onAssign();
          break;
        case '?':
          e.preventDefault();
          options.onShowHelp();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options]);
}

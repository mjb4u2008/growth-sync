import { useEffect } from "react";
import type { FulfillmentFilter } from "../types";

interface UseKeyboardShortcutsOptions {
  onNavigateNext: () => void; // j
  onNavigatePrev: () => void; // k
  onToggleSelection: () => void; // x
  onSelectAll: () => void; // Cmd+A
  onBuyLabels: () => void; // b
  onFocusSearch: () => void; // /
  onShowHelp: () => void; // ?
  onSwitchFilter: (filter: FulfillmentFilter) => void; // g+r/l/s/a
}

export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    let gPressed = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Two-key combos (g prefix)
      if (e.key === "g") {
        gPressed = true;
        setTimeout(() => {
          gPressed = false;
        }, 1000);
        return;
      }

      if (gPressed) {
        e.preventDefault();
        if (e.key === "r") options.onSwitchFilter("ready_to_ship");
        if (e.key === "l") options.onSwitchFilter("label_purchased");
        if (e.key === "s") options.onSwitchFilter("shipped");
        if (e.key === "a") options.onSwitchFilter("all");
        gPressed = false;
        return;
      }

      // Single-key shortcuts
      switch (e.key) {
        case "j":
          e.preventDefault();
          options.onNavigateNext();
          break;
        case "k":
          e.preventDefault();
          options.onNavigatePrev();
          break;
        case "x":
          e.preventDefault();
          options.onToggleSelection();
          break;
        case "b":
          e.preventDefault();
          options.onBuyLabels();
          break;
        case "/":
          e.preventDefault();
          options.onFocusSearch();
          break;
        case "?":
          e.preventDefault();
          options.onShowHelp();
          break;
      }

      // Cmd/Ctrl combos
      if ((e.metaKey || e.ctrlKey) && e.key === "a") {
        e.preventDefault();
        options.onSelectAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options]);
}

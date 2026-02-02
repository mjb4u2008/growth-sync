import { Package, Search, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateType = "no_orders" | "no_results" | "all_done";

interface EmptyStateProps {
  type?: EmptyStateType;
}

const config: Record<
  EmptyStateType,
  {
    icon: typeof Package;
    title: string;
    description: string;
    action: string | null;
  }
> = {
  no_orders: {
    icon: Package,
    title: "No orders to ship",
    description: "Orders ready for shipping will appear here",
    action: "Import Orders",
  },
  no_results: {
    icon: Search,
    title: "No orders found",
    description: "Try adjusting your filters or search",
    action: "Clear Filters",
  },
  all_done: {
    icon: CheckCircle,
    title: "All caught up!",
    description: "All orders have shipping labels",
    action: null,
  },
};

export function EmptyState({ type = "no_orders" }: EmptyStateProps) {
  const { icon: Icon, title, description, action } = config[type];

  return (
    <div className="py-16 text-center">
      <Icon className="h-16 w-16 text-[var(--text-muted)] mx-auto mb-4" />
      <h3 className="text-xl font-semibold font-display text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        {description}
      </p>
      {action && <Button variant="secondary">{action}</Button>}
    </div>
  );
}

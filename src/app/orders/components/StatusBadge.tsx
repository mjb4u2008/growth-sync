import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/data/types";

interface StatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md" | "lg";
}

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config: Record<
    OrderStatus,
    { variant: "success" | "warning" | "error" | "info" | "neutral"; label: string }
  > = {
    pending: { variant: "neutral", label: "Pending" },
    processing: { variant: "info", label: "Processing" },
    awaiting_shipment: { variant: "warning", label: "Awaiting Shipment" },
    shipped: { variant: "info", label: "Shipped" },
    delivered: { variant: "success", label: "Delivered" },
    cancelled: { variant: "error", label: "Cancelled" },
    refunded: { variant: "neutral", label: "Refunded" },
  };

  const { variant, label } = config[status] || config.pending;

  return (
    <Badge variant={variant} size={size}>
      {label}
    </Badge>
  );
}

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "stubhub" | "seatgeek" | "viagogo" | "deal" | "stage" | "rising" | "falling";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  stubhub: "bg-stubhub-light text-stubhub",
  seatgeek: "bg-seatgeek-light text-seatgeek",
  viagogo: "bg-viagogo-light text-viagogo",
  deal: "bg-green-100 text-green-700",
  stage: "bg-gray-100 text-gray-600",
  rising: "bg-red-50 text-red-600",
  falling: "bg-green-50 text-green-600",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

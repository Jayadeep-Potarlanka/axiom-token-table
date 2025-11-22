import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "danger" | "default";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-success/10 text-success": variant === "success",
          "bg-danger/10 text-danger": variant === "danger",
          "bg-gray-700 text-gray-300": variant === "default",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

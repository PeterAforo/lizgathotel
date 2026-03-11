"use client";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-600",
  read: "bg-blue-100 text-blue-800",
  unread: "bg-yellow-100 text-yellow-800",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-600";

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 font-body text-xs font-semibold capitalize",
        style
      )}
    >
      {status}
    </span>
  );
}

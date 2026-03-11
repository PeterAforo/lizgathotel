"use client";

import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "No data",
  message = "There are no items to display yet.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-cream-dark bg-white py-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream">
        <Inbox size={28} className="text-gray-dark" />
      </div>
      <h3 className="mt-4 font-sans text-lg font-bold text-dark">{title}</h3>
      <p className="mt-1 font-body text-sm text-gray-dark">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 rounded-sm bg-primary px-6 py-2.5 font-body text-sm font-semibold text-dark transition-colors hover:bg-primary-dark"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

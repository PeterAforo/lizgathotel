"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, backHref, actionLabel, onAction, children }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="mb-2 inline-flex items-center gap-1 font-body text-sm text-gray-dark transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
        )}
        <h1 className="font-sans text-2xl font-bold text-dark">{title}</h1>
        {subtitle && <p className="mt-1 font-body text-sm text-gray-dark">{subtitle}</p>}
      </div>
      {children
        ? children
        : actionLabel && onAction && (
            <button
              onClick={onAction}
              className="flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 font-body text-sm font-semibold text-dark transition-colors hover:bg-primary-dark"
            >
              <Plus size={16} />
              {actionLabel}
            </button>
          )}
    </div>
  );
}

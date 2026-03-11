"use client";

import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <div className="rounded-sm border border-cream-dark bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-body text-sm text-gray-dark">{title}</p>
          <p className="mt-1 font-sans text-2xl font-bold text-dark">{value}</p>
          {trend && (
            <p className={`mt-1 font-body text-xs font-semibold ${trendUp ? "text-green-600" : "text-red-500"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10">
          <Icon size={22} className="text-primary" />
        </div>
      </div>
    </div>
  );
}

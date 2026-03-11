"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarCheck, DollarSign, Mail, Newspaper, ArrowRight } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import StatusBadge from "@/components/admin/StatusBadge";

interface Stats {
  totalBookings: number;
  totalRevenue: number;
  pendingInquiries: number;
  newsletterSubscribers: number;
  recentBookings: Array<{
    id: string;
    bookingRef: string;
    firstName: string;
    lastName: string;
    status: string;
    totalPrice: number;
    createdAt: string;
    room: { name: string };
  }>;
  recentContacts: Array<{
    id: string;
    name: string;
    subject: string;
    isRead: boolean;
    createdAt: string;
  }>;
  bookingsByStatus: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!stats) return <p className="font-body text-gray-dark">Failed to load stats.</p>;

  return (
    <div>
      <h1 className="font-sans text-2xl font-bold text-dark">Dashboard</h1>
      <p className="mt-1 font-body text-sm text-gray-dark">Overview of your hotel operations this month.</p>

      {/* Stats Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Bookings This Month" value={stats.totalBookings} icon={CalendarCheck} />
        <StatsCard title="Revenue This Month" value={`$${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} />
        <StatsCard title="Pending Inquiries" value={stats.pendingInquiries} icon={Mail} />
        <StatsCard title="Newsletter Subs" value={stats.newsletterSubscribers} icon={Newspaper} />
      </div>

      {/* Bookings by Status */}
      <div className="mt-8 grid gap-6 lg:grid-cols-4">
        {Object.entries(stats.bookingsByStatus).map(([status, count]) => (
          <div key={status} className="rounded-sm border border-cream-dark bg-white p-4 text-center">
            <StatusBadge status={status} />
            <p className="mt-2 font-sans text-2xl font-bold text-dark">{count}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <div className="rounded-sm border border-cream-dark bg-white">
          <div className="flex items-center justify-between border-b border-cream-dark px-4 py-3">
            <h2 className="font-sans text-base font-bold text-dark">Recent Bookings</h2>
            <Link href="/admin/bookings" className="flex items-center gap-1 font-body text-xs font-semibold text-primary hover:underline">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-cream-dark">
            {stats.recentBookings.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-body text-sm font-semibold text-dark">{b.bookingRef}</p>
                  <p className="font-body text-xs text-gray-dark">
                    {b.firstName} {b.lastName} &middot; {b.room.name}
                  </p>
                </div>
                <div className="text-right">
                  <StatusBadge status={b.status} />
                  <p className="mt-1 font-body text-xs text-gray-dark">${b.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="rounded-sm border border-cream-dark bg-white">
          <div className="flex items-center justify-between border-b border-cream-dark px-4 py-3">
            <h2 className="font-sans text-base font-bold text-dark">Recent Inquiries</h2>
            <Link href="/admin/contacts" className="flex items-center gap-1 font-body text-xs font-semibold text-primary hover:underline">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-cream-dark">
            {stats.recentContacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-body text-sm font-semibold text-dark">{c.name}</p>
                  <p className="font-body text-xs text-gray-dark">{c.subject}</p>
                </div>
                <StatusBadge status={c.isRead ? "read" : "unread"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { Activity, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";

interface LogEntry {
  id: string;
  action: string;
  target: string;
  details: string | null;
  ipAddress: string | null;
  createdAt: string;
  user: { name: string; email: string; role: string };
}

const ACTION_COLORS: Record<string, string> = {
  CREATE_USER: "bg-green-100 text-green-700",
  UPDATE_USER: "bg-blue-100 text-blue-700",
  DELETE_USER: "bg-red-100 text-red-700",
  LOGIN: "bg-purple-100 text-purple-700",
  UPDATE_BOOKING: "bg-yellow-100 text-yellow-700",
  CREATE_BOOKING: "bg-green-100 text-green-700",
};

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 25;

  const fetchLogs = useCallback(() => {
    setLoading(true);
    fetch(`/api/admin/activity?page=${page}&limit=${limit}`)
      .then((r) => r.json())
      .then((data) => {
        setLogs(data.logs || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Activity Log" subtitle="Track all admin actions and changes" />

      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-cream-dark bg-white py-16">
          <Activity size={48} className="text-gray" />
          <p className="mt-4 font-body text-sm text-gray-dark">No activity recorded yet.</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-sm border border-cream-dark bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-dark bg-cream/50">
                  <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                    User
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                    Target
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark">
                {logs.map((log) => (
                  <tr key={log.id} className="transition-colors hover:bg-cream/30">
                    <td className="whitespace-nowrap px-4 py-3 font-body text-xs text-gray-dark">
                      {new Date(log.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-body text-sm font-semibold text-dark">{log.user.name}</p>
                      <p className="font-body text-xs text-gray">{log.user.role}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          ACTION_COLORS[log.action] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {log.action.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 font-body text-sm text-dark">
                      {log.target}
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 font-body text-xs text-gray-dark">
                      {log.details || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="font-body text-xs text-gray-dark">
                Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-sm border border-cream-dark p-2 text-gray-dark transition-colors hover:bg-cream disabled:opacity-30"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-sm border border-cream-dark p-2 text-gray-dark transition-colors hover:bg-cream disabled:opacity-30"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

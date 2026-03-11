"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (item: T) => void;
}

export default function DataTable<T extends object>({
  columns,
  data,
  loading,
  page = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-sm border border-cream-dark bg-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-2 font-body text-sm text-gray-dark">Loading...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-sm border border-cream-dark bg-white">
        <p className="font-body text-sm text-gray-dark">No data found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-cream-dark bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cream-dark bg-cream">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-gray-dark"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-dark">
            {data.map((item, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(item)}
                className={`transition-colors hover:bg-cream/50 ${onRowClick ? "cursor-pointer" : ""}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 font-body text-sm text-gray-dark">
                    {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between border-t border-cream-dark px-4 py-3">
          <p className="font-body text-sm text-gray-dark">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="rounded-sm border border-cream-dark p-1.5 text-gray-dark transition-colors hover:bg-cream disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="rounded-sm border border-cream-dark p-1.5 text-gray-dark transition-colors hover:bg-cream disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

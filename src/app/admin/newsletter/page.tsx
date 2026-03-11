"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteConfirm from "@/components/admin/DeleteConfirm";

interface Subscriber {
  id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
}

export default function NewsletterAdminPage() {
  const [items, setItems] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Subscriber | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/newsletter").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchItems(); }, []);

  const handleUnsubscribe = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/newsletter/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Subscriber deactivated");
      setDeleteTarget(null);
      fetchItems();
    } catch { toast.error("Failed to unsubscribe"); } finally { setSaving(false); }
  };

  const activeCount = items.filter((s) => s.isActive).length;

  const columns = [
    { key: "email", label: "Email", render: (s: Subscriber) => <span className="font-semibold text-dark">{s.email}</span> },
    { key: "subscribedAt", label: "Subscribed", render: (s: Subscriber) => new Date(s.subscribedAt).toLocaleDateString() },
    { key: "isActive", label: "Status", render: (s: Subscriber) => <StatusBadge status={s.isActive ? "active" : "inactive"} /> },
    { key: "actions", label: "", render: (s: Subscriber) => s.isActive ? (
      <button
        onClick={(e) => { e.stopPropagation(); setDeleteTarget(s); }}
        className="rounded-sm bg-red-50 px-3 py-1 font-body text-xs font-semibold text-red-600 hover:bg-red-100"
      >
        Unsubscribe
      </button>
    ) : null },
  ];

  return (
    <div>
      <PageHeader title="Newsletter Subscribers" subtitle={`${activeCount} active subscriber${activeCount !== 1 ? "s" : ""}`} />
      <DataTable columns={columns} data={items} loading={loading} />
      <DeleteConfirm
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleUnsubscribe}
        loading={saving}
        title="Unsubscribe"
        message={`Are you sure you want to deactivate ${deleteTarget?.email}?`}
      />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import FormField from "@/components/admin/FormField";

interface PageContent {
  id: string;
  page: string;
  section: string;
  title: string;
  content: string;
  metadata: string | null;
  updatedAt: string;
}

export default function ContentAdminPage() {
  const [items, setItems] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PageContent | null>(null);
  const [form, setForm] = useState({ page: "", section: "", title: "", content: "", metadata: "" });
  const [saving, setSaving] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/pages").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ page: "", section: "", title: "", content: "", metadata: "" });
    setModalOpen(true);
  };

  const openEdit = (item: PageContent) => {
    setEditing(item);
    setForm({
      page: item.page,
      section: item.section,
      title: item.title,
      content: item.content,
      metadata: item.metadata || "",
    });
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form, metadata: form.metadata || null };
      const res = await fetch("/api/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Content updated" : "Content created");
      setModalOpen(false);
      fetchItems();
    } catch { toast.error("Failed to save content"); } finally { setSaving(false); }
  };

  const columns = [
    { key: "page", label: "Page", render: (p: PageContent) => <span className="font-semibold capitalize text-dark">{p.page}</span> },
    { key: "section", label: "Section", render: (p: PageContent) => <span className="capitalize">{p.section}</span> },
    { key: "title", label: "Title" },
    { key: "content", label: "Content", render: (p: PageContent) => <span className="line-clamp-1 max-w-xs">{p.content}</span> },
    { key: "updatedAt", label: "Updated", render: (p: PageContent) => new Date(p.updatedAt).toLocaleDateString() },
  ];

  return (
    <div>
      <PageHeader title="Content Editor" subtitle="Manage page content and copy" actionLabel="Add Content" onAction={openCreate} />
      <DataTable columns={columns} data={items} loading={loading} onRowClick={openEdit} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Content" : "New Content"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Page" name="page" value={form.page} onChange={handleChange} required placeholder="e.g. home, about" />
            <FormField label="Section" name="section" value={form.section} onChange={handleChange} required placeholder="e.g. hero, welcome" />
          </div>
          <FormField label="Title" name="title" value={form.title} onChange={handleChange} required />
          <FormField label="Content" name="content" value={form.content} onChange={handleChange} rows={8} required />
          <FormField label="Metadata (optional JSON)" name="metadata" value={form.metadata} onChange={handleChange} rows={3} />
          <div className="flex justify-end gap-2 border-t border-cream-dark pt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-sm border border-cream-dark px-4 py-2 font-body text-sm text-gray-dark hover:bg-cream">Cancel</button>
            <button type="submit" disabled={saving} className="rounded-sm bg-primary px-6 py-2 font-body text-sm font-semibold text-dark hover:bg-primary-dark disabled:opacity-50">
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import FormField from "@/components/admin/FormField";
import DeleteConfirm from "@/components/admin/DeleteConfirm";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  isActive: boolean;
  sortOrder: number;
}

const emptyForm = { name: "", location: "", rating: 5, text: "", avatar: "", isActive: true, sortOrder: 0 };

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/testimonials").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item: Testimonial) => { setEditing(item); setForm(item as typeof emptyForm); setModalOpen(true); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({ ...f, [name]: type === "number" ? Number(value) : value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form, rating: Number(form.rating), sortOrder: Number(form.sortOrder) };
      const url = editing ? `/api/testimonials/${editing.id}` : "/api/testimonials";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Testimonial updated" : "Testimonial created");
      setModalOpen(false); fetchItems();
    } catch { toast.error("Failed to save"); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/testimonials/${editing.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Testimonial deleted"); setDeleteOpen(false); setModalOpen(false); fetchItems();
    } catch { toast.error("Failed to delete"); } finally { setSaving(false); }
  };

  const columns = [
    { key: "name", label: "Guest", render: (t: Testimonial) => (
      <div>
        <span className="font-semibold text-dark">{t.name}</span>
        <p className="font-body text-xs text-gray-dark">{t.location}</p>
      </div>
    )},
    { key: "rating", label: "Rating", render: (t: Testimonial) => (
      <div className="flex gap-0.5">
        {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="fill-primary text-primary" />)}
      </div>
    )},
    { key: "text", label: "Review", render: (t: Testimonial) => <span className="line-clamp-2 max-w-xs">{t.text}</span> },
    { key: "isActive", label: "Active", render: (t: Testimonial) => t.isActive ? "Yes" : "No" },
  ];

  return (
    <div>
      <PageHeader title="Testimonials" subtitle="Manage guest reviews and testimonials" actionLabel="Add Testimonial" onAction={openCreate} />
      <DataTable columns={columns} data={items} loading={loading} onRowClick={openEdit} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Testimonial" : "New Testimonial"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Guest Name" name="name" value={form.name} onChange={handleChange} required />
            <FormField label="Location" name="location" value={form.location} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Rating (1-5)" name="rating" type="number" value={form.rating} onChange={handleChange} required />
            <FormField label="Avatar (initials)" name="avatar" value={form.avatar} onChange={handleChange} required placeholder="e.g. JD" />
          </div>
          <FormField label="Review Text" name="text" value={form.text} onChange={handleChange} rows={4} required />
          <FormField label="Sort Order" name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} />
          <div className="flex justify-between border-t border-cream-dark pt-4">
            <div>{editing && <button type="button" onClick={() => setDeleteOpen(true)} className="rounded-sm bg-red-50 px-4 py-2 font-body text-sm font-semibold text-red-600 hover:bg-red-100">Delete</button>}</div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-sm border border-cream-dark px-4 py-2 font-body text-sm text-gray-dark hover:bg-cream">Cancel</button>
              <button type="submit" disabled={saving} className="rounded-sm bg-primary px-6 py-2 font-body text-sm font-semibold text-dark hover:bg-primary-dark disabled:opacity-50">{saving ? "Saving..." : editing ? "Update" : "Create"}</button>
            </div>
          </div>
        </form>
      </Modal>
      <DeleteConfirm open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}

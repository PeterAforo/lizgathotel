"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import FormField from "@/components/admin/FormField";
import DeleteConfirm from "@/components/admin/DeleteConfirm";

interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  image: string;
  items: Array<{ name: string; price: string; description: string }>;
  isActive: boolean;
  sortOrder: number;
}

const emptyForm = { category: "", name: "", description: "", image: "", items: "[]", isActive: true, sortOrder: 0 };

export default function DiningAdminPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/dining").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item: MenuItem) => { setEditing(item); setForm({ ...item, items: JSON.stringify(item.items, null, 2) } as typeof emptyForm); setModalOpen(true); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({ ...f, [name]: type === "number" ? Number(value) : value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form, sortOrder: Number(form.sortOrder), items: JSON.parse(form.items as string) };
      const url = editing ? `/api/dining/${editing.id}` : "/api/dining";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Menu item updated" : "Menu item created");
      setModalOpen(false); fetchItems();
    } catch { toast.error("Failed to save"); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/dining/${editing.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Menu item deleted"); setDeleteOpen(false); setModalOpen(false); fetchItems();
    } catch { toast.error("Failed to delete"); } finally { setSaving(false); }
  };

  const columns = [
    { key: "name", label: "Name", render: (m: MenuItem) => <span className="font-semibold text-dark">{m.name}</span> },
    { key: "category", label: "Category", render: (m: MenuItem) => <span className="capitalize">{m.category}</span> },
    { key: "items", label: "Items", render: (m: MenuItem) => `${m.items?.length || 0} items` },
    { key: "sortOrder", label: "Order" },
    { key: "isActive", label: "Active", render: (m: MenuItem) => m.isActive ? "Yes" : "No" },
  ];

  return (
    <div>
      <PageHeader title="Dining" subtitle="Manage restaurant menu categories and items" actionLabel="Add Menu Category" onAction={openCreate} />
      <DataTable columns={columns} data={items} loading={loading} onRowClick={openEdit} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Menu Category" : "New Menu Category"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Name" name="name" value={form.name} onChange={handleChange} required />
            <FormField label="Category Key" name="category" value={form.category} onChange={handleChange} required placeholder="e.g. breakfast" />
          </div>
          <FormField label="Description" name="description" value={form.description} onChange={handleChange} rows={2} />
          <FormField label="Image URL" name="image" value={form.image} onChange={handleChange} />
          <FormField label="Menu Items (JSON array)" name="items" value={form.items as string} onChange={handleChange} rows={6} />
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

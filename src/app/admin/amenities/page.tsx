"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import FormField from "@/components/admin/FormField";
import DeleteConfirm from "@/components/admin/DeleteConfirm";

interface Amenity {
  id: string;
  amenityId: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
  details: string[];
  isActive: boolean;
  sortOrder: number;
}

const emptyForm = { amenityId: "", name: "", description: "", iconName: "", image: "", details: "[]", isActive: true, sortOrder: 0 };

export default function AmenitiesAdminPage() {
  const [items, setItems] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Amenity | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/amenities").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item: Amenity) => { setEditing(item); setForm({ ...item, details: JSON.stringify(item.details) } as typeof emptyForm); setModalOpen(true); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({ ...f, [name]: type === "number" ? Number(value) : value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form, sortOrder: Number(form.sortOrder), details: JSON.parse(form.details as string) };
      const url = editing ? `/api/amenities/${editing.id}` : "/api/amenities";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Amenity updated" : "Amenity created");
      setModalOpen(false); fetchItems();
    } catch { toast.error("Failed to save amenity"); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/amenities/${editing.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Amenity deleted"); setDeleteOpen(false); setModalOpen(false); fetchItems();
    } catch { toast.error("Failed to delete"); } finally { setSaving(false); }
  };

  const columns = [
    { key: "name", label: "Name", render: (a: Amenity) => <span className="font-semibold text-dark">{a.name}</span> },
    { key: "amenityId", label: "ID" },
    { key: "iconName", label: "Icon" },
    { key: "sortOrder", label: "Order" },
    { key: "isActive", label: "Active", render: (a: Amenity) => a.isActive ? "Yes" : "No" },
  ];

  return (
    <div>
      <PageHeader title="Amenities" subtitle="Manage hotel amenities and facilities" actionLabel="Add Amenity" onAction={openCreate} />
      <DataTable columns={columns} data={items} loading={loading} onRowClick={openEdit} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Amenity" : "New Amenity"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Name" name="name" value={form.name} onChange={handleChange} required />
            <FormField label="Amenity ID" name="amenityId" value={form.amenityId} onChange={handleChange} required placeholder="e.g. pool" />
          </div>
          <FormField label="Description" name="description" value={form.description} onChange={handleChange} rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Icon Name" name="iconName" value={form.iconName} onChange={handleChange} placeholder="e.g. Waves" />
            <FormField label="Sort Order" name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} />
          </div>
          <FormField label="Image URL" name="image" value={form.image} onChange={handleChange} />
          <FormField label="Details (JSON array)" name="details" value={form.details as string} onChange={handleChange} rows={3} />
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

"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";
import Modal from "@/components/admin/Modal";
import FormField from "@/components/admin/FormField";
import DeleteConfirm from "@/components/admin/DeleteConfirm";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  isActive: boolean;
  sortOrder: number;
}

const emptyForm = { src: "", alt: "", category: "rooms", width: 800, height: 600, isActive: true, sortOrder: 0 };

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/gallery").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item: GalleryImage) => { setEditing(item); setForm(item as typeof emptyForm); setModalOpen(true); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({ ...f, [name]: type === "number" ? Number(value) : value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form, width: Number(form.width), height: Number(form.height), sortOrder: Number(form.sortOrder) };
      const url = editing ? `/api/gallery/${editing.id}` : "/api/gallery";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Image updated" : "Image added");
      setModalOpen(false); fetchItems();
    } catch { toast.error("Failed to save image"); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/gallery/${editing.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Image deleted"); setDeleteOpen(false); setModalOpen(false); fetchItems();
    } catch { toast.error("Failed to delete"); } finally { setSaving(false); }
  };

  return (
    <div>
      <PageHeader title="Gallery" subtitle="Manage hotel photo gallery" actionLabel="Add Image" onAction={openCreate} />

      {loading ? (
        <div className="flex h-48 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((img) => (
            <div key={img.id} onClick={() => openEdit(img)} className="group cursor-pointer overflow-hidden rounded-sm border border-cream-dark bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-40 overflow-hidden">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <span className="absolute left-2 top-2 rounded-sm bg-dark/70 px-2 py-0.5 font-body text-[10px] uppercase text-white">{img.category}</span>
              </div>
              <div className="p-3">
                <p className="font-body text-xs text-gray-dark truncate">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Image" : "Add Image"}>
        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Image URL" name="src" value={form.src} onChange={handleChange} required />
          <FormField label="Alt Text" name="alt" value={form.alt} onChange={handleChange} required />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category" name="category" value={form.category} onChange={handleChange} options={[
              { value: "rooms", label: "Rooms" }, { value: "dining", label: "Dining" },
              { value: "pool", label: "Pool & Spa" }, { value: "events", label: "Events" }, { value: "exterior", label: "Exterior" },
            ]} />
            <FormField label="Sort Order" name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Width" name="width" type="number" value={form.width} onChange={handleChange} />
            <FormField label="Height" name="height" type="number" value={form.height} onChange={handleChange} />
          </div>
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

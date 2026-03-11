"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import FormField from "@/components/admin/FormField";
import DeleteConfirm from "@/components/admin/DeleteConfirm";

interface Room {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  shortDescription: string;
  capacity: number;
  size: string;
  bedType: string;
  image: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  isActive: boolean;
  sortOrder: number;
}

const emptyRoom = {
  slug: "", name: "", category: "standard", price: 0, description: "", shortDescription: "",
  capacity: 2, size: "", bedType: "", image: "", images: "[]", amenities: "[]",
  featured: false, isActive: true, sortOrder: 0,
};

export default function RoomsAdminPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Room | null>(null);
  const [form, setForm] = useState(emptyRoom);
  const [saving, setSaving] = useState(false);

  const fetchRooms = () => {
    setLoading(true);
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => { setRooms(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchRooms(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyRoom);
    setModalOpen(true);
  };

  const openEdit = (room: Room) => {
    setEditing(room);
    setForm({
      ...room,
      images: JSON.stringify(room.images),
      amenities: JSON.stringify(room.amenities),
    } as typeof emptyRoom);
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        ...form,
        price: Number(form.price),
        capacity: Number(form.capacity),
        sortOrder: Number(form.sortOrder),
        images: JSON.parse(form.images as string),
        amenities: JSON.parse(form.amenities as string),
      };
      const url = editing ? `/api/rooms/${editing.id}` : "/api/rooms";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Room updated" : "Room created");
      setModalOpen(false);
      fetchRooms();
    } catch {
      toast.error("Failed to save room");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/rooms/${editing.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Room deleted");
      setDeleteOpen(false);
      setModalOpen(false);
      fetchRooms();
    } catch {
      toast.error("Failed to delete room");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { key: "image", label: "", render: (r: Room) => (
      <img src={r.image} alt={r.name} className="h-10 w-14 rounded-sm object-cover" />
    )},
    { key: "name", label: "Name", render: (r: Room) => <span className="font-semibold text-dark">{r.name}</span> },
    { key: "category", label: "Category", render: (r: Room) => <span className="capitalize">{r.category}</span> },
    { key: "price", label: "Price", render: (r: Room) => `$${r.price}/night` },
    { key: "capacity", label: "Capacity", render: (r: Room) => `${r.capacity} guests` },
    { key: "featured", label: "Featured", render: (r: Room) => r.featured ? "Yes" : "No" },
  ];

  return (
    <div>
      <PageHeader title="Rooms" subtitle="Manage hotel rooms and suites" actionLabel="Add Room" onAction={openCreate} />
      <DataTable columns={columns} data={rooms} loading={loading} onRowClick={openEdit} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Room" : "New Room"} maxWidth="max-w-3xl">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Name" name="name" value={form.name} onChange={handleChange} required />
            <FormField label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Category" name="category" value={form.category} onChange={handleChange} options={[
              { value: "standard", label: "Standard" }, { value: "deluxe", label: "Deluxe" },
              { value: "suite", label: "Suite" }, { value: "presidential", label: "Presidential" },
            ]} />
            <FormField label="Price ($/night)" name="price" type="number" value={form.price} onChange={handleChange} required />
            <FormField label="Capacity" name="capacity" type="number" value={form.capacity} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Size" name="size" value={form.size} onChange={handleChange} placeholder="e.g. 28 sqm" />
            <FormField label="Bed Type" name="bedType" value={form.bedType} onChange={handleChange} placeholder="e.g. King Bed" />
          </div>
          <FormField label="Short Description" name="shortDescription" value={form.shortDescription} onChange={handleChange} />
          <FormField label="Description" name="description" value={form.description} onChange={handleChange} rows={4} />
          <FormField label="Main Image URL" name="image" value={form.image} onChange={handleChange} />
          <FormField label="Gallery Images (JSON array)" name="images" value={form.images as string} onChange={handleChange} rows={2} />
          <FormField label="Amenities (JSON array)" name="amenities" value={form.amenities as string} onChange={handleChange} rows={2} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Sort Order" name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} />
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 font-body text-sm">
                <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="rounded" />
                Featured
              </label>
              <label className="flex items-center gap-2 font-body text-sm">
                <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} className="rounded" />
                Active
              </label>
            </div>
          </div>
          <div className="flex justify-between border-t border-cream-dark pt-4">
            <div>
              {editing && (
                <button type="button" onClick={() => setDeleteOpen(true)} className="rounded-sm bg-red-50 px-4 py-2 font-body text-sm font-semibold text-red-600 hover:bg-red-100">
                  Delete Room
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-sm border border-cream-dark px-4 py-2 font-body text-sm text-gray-dark hover:bg-cream">Cancel</button>
              <button type="submit" disabled={saving} className="rounded-sm bg-primary px-6 py-2 font-body text-sm font-semibold text-dark hover:bg-primary-dark disabled:opacity-50">
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <DeleteConfirm open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}

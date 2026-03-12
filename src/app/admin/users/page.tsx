"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Plus, Edit2, Trash2, Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

const ROLE_CONFIG: Record<string, { label: string; color: string; icon: typeof Shield }> = {
  superadmin: { label: "Super Admin", color: "bg-red-100 text-red-700", icon: ShieldAlert },
  admin: { label: "Admin", color: "bg-blue-100 text-blue-700", icon: ShieldCheck },
  editor: { label: "Editor", color: "bg-green-100 text-green-700", icon: Shield },
};

export default function UsersAdminPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "editor" });
  const [saving, setSaving] = useState(false);

  const currentUserId = (session?.user as { id?: string })?.id;

  const fetchUsers = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openCreate = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", password: "", role: "editor" });
    setShowModal(true);
  };

  const openEdit = (user: AdminUser) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, password: "", role: user.role });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingUser) {
        const body: Record<string, string> = { name: form.name, email: form.email, role: form.role };
        if (form.password) body.password = form.password;

        const res = await fetch(`/api/admin/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update user");
        toast.success("User updated");
      } else {
        if (!form.password) {
          toast.error("Password is required for new users");
          setSaving(false);
          return;
        }
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create user");
        toast.success("User created");
      }
      setShowModal(false);
      fetchUsers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (user: AdminUser) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(user.isActive ? "User deactivated" : "User activated");
      fetchUsers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update user");
    }
  };

  const deleteUser = async (user: AdminUser) => {
    if (!confirm(`Delete user "${user.name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("User deleted");
      fetchUsers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="User Management" subtitle="Manage admin users and their roles">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 font-body text-sm font-semibold text-dark transition-colors hover:bg-primary-dark"
        >
          <Plus size={16} />
          Add User
        </button>
      </PageHeader>

      {/* Roles Legend */}
      <div className="mb-6 flex flex-wrap gap-4">
        {Object.entries(ROLE_CONFIG).map(([role, config]) => {
          const Icon = config.icon;
          return (
            <div key={role} className="flex items-center gap-2">
              <Icon size={14} className="text-gray-dark" />
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.color}`}>
                {config.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-sm border border-cream-dark bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cream-dark bg-cream/50">
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                User
              </th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                Role
              </th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                Status
              </th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                Last Login
              </th>
              <th className="px-4 py-3 text-right font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-dark">
            {users.map((user) => {
              const roleConfig = ROLE_CONFIG[user.role] || ROLE_CONFIG.editor;
              const Icon = roleConfig.icon;
              const isCurrentUser = user.id === currentUserId;

              return (
                <tr key={user.id} className={`transition-colors hover:bg-cream/30 ${!user.isActive ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <span className="font-sans text-sm font-bold text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold text-dark">
                          {user.name} {isCurrentUser && <span className="text-xs text-gray">(you)</span>}
                        </p>
                        <p className="font-body text-xs text-gray">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleConfig.color}`}>
                      <Icon size={12} />
                      {roleConfig.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(user)}
                      disabled={isCurrentUser}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                        user.isActive
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      } ${isCurrentUser ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-gray-dark">
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Never"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openEdit(user)}
                        className="rounded-sm p-2 text-gray-dark transition-colors hover:bg-cream hover:text-primary"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      {!isCurrentUser && (
                        <button
                          onClick={() => deleteUser(user)}
                          className="rounded-sm p-2 text-gray-dark transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-xl">
            <h2 className="font-sans text-lg font-bold text-dark">
              {editingUser ? "Edit User" : "Add New User"}
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-sm border border-cream-dark px-3 py-2 font-body text-sm text-dark focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-sm border border-cream-dark px-3 py-2 font-body text-sm text-dark focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                  Password {editingUser && "(leave blank to keep current)"}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-sm border border-cream-dark px-3 py-2 font-body text-sm text-dark focus:border-primary focus:outline-none"
                  minLength={6}
                />
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-semibold uppercase tracking-wider text-gray-dark">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  disabled={editingUser?.id === currentUserId}
                  className="w-full rounded-sm border border-cream-dark px-3 py-2 font-body text-sm text-dark focus:border-primary focus:outline-none disabled:opacity-50"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-sm border border-cream-dark px-4 py-2 font-body text-sm text-gray-dark transition-colors hover:bg-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-sm bg-primary px-6 py-2 font-body text-sm font-semibold text-dark transition-colors hover:bg-primary-dark disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingUser ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

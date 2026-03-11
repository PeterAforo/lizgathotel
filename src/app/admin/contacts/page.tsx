"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ContactsAdminPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/contact").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchItems(); }, []);

  const markAsRead = async (item: Contact) => {
    setSelected(item);
    if (!item.isRead) {
      try {
        await fetch(`/api/contact/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        });
        fetchItems();
      } catch { /* silently fail */ }
    }
  };

  const columns = [
    { key: "isRead", label: "", render: (c: Contact) => (
      <div className={`h-2 w-2 rounded-full ${c.isRead ? "bg-gray-300" : "bg-primary"}`} />
    )},
    { key: "name", label: "Name", render: (c: Contact) => <span className={c.isRead ? "text-gray-dark" : "font-semibold text-dark"}>{c.name}</span> },
    { key: "subject", label: "Subject", render: (c: Contact) => <span className={c.isRead ? "" : "font-semibold"}>{c.subject}</span> },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Date", render: (c: Contact) => new Date(c.createdAt).toLocaleDateString() },
    { key: "status", label: "Status", render: (c: Contact) => <StatusBadge status={c.isRead ? "read" : "unread"} /> },
  ];

  return (
    <div>
      <PageHeader title="Contact Submissions" subtitle="View and manage customer inquiries" />
      <DataTable columns={columns} data={items} loading={loading} onRowClick={markAsRead} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Contact Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-body text-xs text-gray-dark">Name</p>
                <p className="font-body text-sm font-semibold text-dark">{selected.name}</p>
              </div>
              <div>
                <p className="font-body text-xs text-gray-dark">Email</p>
                <p className="font-body text-sm text-dark">{selected.email}</p>
              </div>
              <div>
                <p className="font-body text-xs text-gray-dark">Phone</p>
                <p className="font-body text-sm text-dark">{selected.phone || "N/A"}</p>
              </div>
              <div>
                <p className="font-body text-xs text-gray-dark">Date</p>
                <p className="font-body text-sm text-dark">{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div>
              <p className="font-body text-xs text-gray-dark">Subject</p>
              <p className="font-body text-sm font-semibold text-dark">{selected.subject}</p>
            </div>
            <div>
              <p className="font-body text-xs text-gray-dark">Message</p>
              <p className="mt-1 whitespace-pre-wrap rounded-sm bg-cream p-4 font-body text-sm text-dark">{selected.message}</p>
            </div>
            <div className="flex justify-end border-t border-cream-dark pt-4">
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="rounded-sm bg-primary px-6 py-2 font-body text-sm font-semibold text-dark transition-colors hover:bg-primary-dark"
              >
                Reply via Email
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

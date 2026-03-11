"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Modal from "@/components/admin/Modal";

interface Booking {
  id: string;
  bookingRef: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  totalPrice: number;
  nights: number;
  guests: number;
  checkIn: string;
  checkOut: string;
  specialRequests?: string;
  createdAt: string;
  room: { name: string };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const router = useRouter();

  const fetchBookings = () => {
    setLoading(true);
    const url = statusFilter ? `/api/bookings?status=${statusFilter}` : "/api/bookings";
    fetch(url)
      .then((res) => res.json())
      .then((data) => { setBookings(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Booking ${status}`);
      fetchBookings();
      setSelected(null);
    } catch {
      toast.error("Failed to update booking");
    }
  };

  const columns = [
    { key: "bookingRef", label: "Reference", render: (b: Booking) => (
      <span className="font-semibold text-dark">{b.bookingRef}</span>
    )},
    { key: "guest", label: "Guest", render: (b: Booking) => `${b.firstName} ${b.lastName}` },
    { key: "room", label: "Room", render: (b: Booking) => b.room?.name },
    { key: "checkIn", label: "Check-in", render: (b: Booking) => new Date(b.checkIn).toLocaleDateString() },
    { key: "nights", label: "Nights" },
    { key: "totalPrice", label: "Total", render: (b: Booking) => `$${b.totalPrice}` },
    { key: "status", label: "Status", render: (b: Booking) => <StatusBadge status={b.status} /> },
  ];

  return (
    <div>
      <PageHeader title="Bookings" subtitle="Manage all hotel reservations" />

      <div className="mb-4 flex gap-2">
        {["", "pending", "confirmed", "completed", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-sm px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wider transition-colors ${
              statusFilter === s ? "bg-primary text-dark" : "bg-white text-gray-dark hover:bg-cream"
            }`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={bookings}
        loading={loading}
        onRowClick={(b) => setSelected(b as Booking)}
      />

      {/* Booking Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Booking ${selected?.bookingRef || ""}`}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-body text-xs text-gray-dark">Guest</p>
                <p className="font-body text-sm font-semibold text-dark">{selected.firstName} {selected.lastName}</p>
              </div>
              <div>
                <p className="font-body text-xs text-gray-dark">Room</p>
                <p className="font-body text-sm font-semibold text-dark">{selected.room?.name}</p>
              </div>
              <div>
                <p className="font-body text-xs text-gray-dark">Email</p>
                <p className="font-body text-sm text-dark">{selected.email}</p>
              </div>
              <div>
                <p className="font-body text-xs text-gray-dark">Phone</p>
                <p className="font-body text-sm text-dark">{selected.phone}</p>
              </div>
              <div>
                <p className="font-body text-xs text-gray-dark">Check-in</p>
                <p className="font-body text-sm text-dark">{new Date(selected.checkIn).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-body text-xs text-gray-dark">Check-out</p>
                <p className="font-body text-sm text-dark">{new Date(selected.checkOut).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-body text-xs text-gray-dark">Nights / Guests</p>
                <p className="font-body text-sm text-dark">{selected.nights} nights, {selected.guests} guests</p>
              </div>
              <div>
                <p className="font-body text-xs text-gray-dark">Total</p>
                <p className="font-sans text-lg font-bold text-primary">${selected.totalPrice}</p>
              </div>
            </div>
            {selected.specialRequests && (
              <div>
                <p className="font-body text-xs text-gray-dark">Special Requests</p>
                <p className="mt-1 font-body text-sm text-dark">{selected.specialRequests}</p>
              </div>
            )}
            <div>
              <p className="font-body text-xs text-gray-dark">Current Status</p>
              <div className="mt-1"><StatusBadge status={selected.status} /></div>
            </div>
            <div className="flex gap-2 border-t border-cream-dark pt-4">
              {selected.status === "pending" && (
                <button onClick={() => updateStatus(selected.id, "confirmed")} className="rounded-sm bg-green-600 px-4 py-2 font-body text-sm font-semibold text-white hover:bg-green-700">
                  Confirm
                </button>
              )}
              {selected.status === "confirmed" && (
                <button onClick={() => updateStatus(selected.id, "completed")} className="rounded-sm bg-blue-600 px-4 py-2 font-body text-sm font-semibold text-white hover:bg-blue-700">
                  Mark Complete
                </button>
              )}
              {selected.status !== "cancelled" && selected.status !== "completed" && (
                <button onClick={() => updateStatus(selected.id, "cancelled")} className="rounded-sm bg-red-600 px-4 py-2 font-body text-sm font-semibold text-white hover:bg-red-700">
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

interface DeleteConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

export default function DeleteConfirm({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  loading,
}: DeleteConfirmProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle size={28} className="text-red-600" />
        </div>
        <p className="mt-4 font-body text-sm text-gray-dark">{message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-sm border border-cream-dark px-6 py-2.5 font-body text-sm font-semibold text-gray-dark transition-colors hover:bg-cream disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-sm bg-red-600 px-6 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

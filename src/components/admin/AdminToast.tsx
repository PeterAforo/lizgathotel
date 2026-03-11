"use client";

import { Toaster } from "react-hot-toast";

export default function AdminToast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          borderRadius: "2px",
        },
        success: {
          style: { background: "#F0FDF4", color: "#166534", border: "1px solid #BBF7D0" },
        },
        error: {
          style: { background: "#FEF2F2", color: "#991B1B", border: "1px solid #FECACA" },
        },
      }}
    />
  );
}

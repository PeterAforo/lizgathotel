"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import AdminToast from "@/components/admin/AdminToast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-cream">
        <Sidebar />
        <div className="flex-1 pl-64">
          <Header />
          <main className="p-6">{children}</main>
        </div>
        <AdminToast />
      </div>
    </SessionProvider>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-cream-dark bg-white px-6">
      <button
        onClick={onMenuToggle}
        className="rounded-sm p-2 text-gray-dark transition-colors hover:bg-cream lg:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <button className="relative rounded-sm p-2 text-gray-dark transition-colors hover:bg-cream">
          <Bell size={18} />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 rounded-sm px-3 py-2 text-gray-dark transition-colors hover:bg-cream"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <User size={16} className="text-primary" />
            </div>
            <span className="hidden font-body text-sm font-semibold md:inline">Admin</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-12 w-48 rounded-sm border border-cream-dark bg-white py-1 shadow-lg">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-4 py-2 font-body text-sm text-gray-dark transition-colors hover:bg-cream"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

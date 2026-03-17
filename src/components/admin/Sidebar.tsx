"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  CalendarCheck,
  Bed,
  Sparkles,
  Image,
  UtensilsCrossed,
  Star,
  Mail,
  Newspaper,
  FileText,
  Settings,
  Users,
  Activity,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { hasPermission, type Permission } from "@/lib/permissions";

const navItems: { href: string; label: string; icon: typeof LayoutDashboard; permission: Permission }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, permission: "view_dashboard" },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck, permission: "view_bookings" },
  { href: "/admin/rooms", label: "Rooms", icon: Bed, permission: "view_rooms" },
  { href: "/admin/amenities", label: "Amenities", icon: Sparkles, permission: "view_content" },
  { href: "/admin/gallery", label: "Gallery", icon: Image, permission: "view_content" },
  { href: "/admin/dining", label: "Dining", icon: UtensilsCrossed, permission: "view_content" },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star, permission: "view_content" },
  { href: "/admin/contacts", label: "Contacts", icon: Mail, permission: "view_contacts" },
  { href: "/admin/newsletter", label: "Newsletter", icon: Newspaper, permission: "view_newsletter" },
  { href: "/admin/content", label: "Content", icon: FileText, permission: "view_content" },
  { href: "/admin/users", label: "Users", icon: Users, permission: "view_users" },
  { href: "/admin/activity", label: "Activity Log", icon: Activity, permission: "view_activity_log" },
  { href: "/admin/settings", label: "Settings", icon: Settings, permission: "view_settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as { role?: string })?.role || "";

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-dark">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <img
            src="/images/logos/favicon.png"
            alt="LIZGAT"
            className="h-8 w-auto"
          />
          <div>
            <span className="font-sans text-base font-bold tracking-wider text-white">LIZGAT</span>
            <span className="ml-1 font-body text-[10px] uppercase tracking-[0.2em] text-primary">Admin</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.filter((item) => !role || hasPermission(role, item.permission)).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-sm px-3 py-2.5 font-body text-sm transition-all",
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-gray hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm px-3 py-2.5 font-body text-sm text-gray transition-all hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} />
          Back to Site
        </Link>
      </div>
    </aside>
  );
}

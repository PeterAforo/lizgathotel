export const ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  EDITOR: "editor",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: "view_dashboard",
  // Bookings
  VIEW_BOOKINGS: "view_bookings",
  MANAGE_BOOKINGS: "manage_bookings",
  // Rooms
  VIEW_ROOMS: "view_rooms",
  MANAGE_ROOMS: "manage_rooms",
  // Content (amenities, gallery, dining, testimonials, content pages)
  VIEW_CONTENT: "view_content",
  MANAGE_CONTENT: "manage_content",
  // Contacts
  VIEW_CONTACTS: "view_contacts",
  MANAGE_CONTACTS: "manage_contacts",
  // Newsletter
  VIEW_NEWSLETTER: "view_newsletter",
  MANAGE_NEWSLETTER: "manage_newsletter",
  // Users
  VIEW_USERS: "view_users",
  MANAGE_USERS: "manage_users",
  // Settings
  VIEW_SETTINGS: "view_settings",
  MANAGE_SETTINGS: "manage_settings",
  // Activity Log
  VIEW_ACTIVITY_LOG: "view_activity_log",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  superadmin: Object.values(PERMISSIONS),
  admin: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_BOOKINGS,
    PERMISSIONS.MANAGE_BOOKINGS,
    PERMISSIONS.VIEW_ROOMS,
    PERMISSIONS.MANAGE_ROOMS,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.VIEW_CONTACTS,
    PERMISSIONS.MANAGE_CONTACTS,
    PERMISSIONS.VIEW_NEWSLETTER,
    PERMISSIONS.MANAGE_NEWSLETTER,
    PERMISSIONS.VIEW_ACTIVITY_LOG,
  ],
  editor: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_BOOKINGS,
    PERMISSIONS.VIEW_ROOMS,
    PERMISSIONS.MANAGE_ROOMS,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.VIEW_NEWSLETTER,
  ],
};

export function hasPermission(role: string, permission: Permission): boolean {
  const perms = ROLE_PERMISSIONS[role as Role];
  if (!perms) return false;
  return perms.includes(permission);
}

export function hasAnyPermission(role: string, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

export function getRoleLabel(role: string): string {
  switch (role) {
    case ROLES.SUPERADMIN:
      return "Super Admin";
    case ROLES.ADMIN:
      return "Admin";
    case ROLES.EDITOR:
      return "Editor";
    default:
      return role;
  }
}

// Map admin routes to required permissions
export const ROUTE_PERMISSIONS: Record<string, Permission> = {
  "/admin": PERMISSIONS.VIEW_DASHBOARD,
  "/admin/bookings": PERMISSIONS.VIEW_BOOKINGS,
  "/admin/rooms": PERMISSIONS.VIEW_ROOMS,
  "/admin/amenities": PERMISSIONS.VIEW_CONTENT,
  "/admin/gallery": PERMISSIONS.VIEW_CONTENT,
  "/admin/dining": PERMISSIONS.VIEW_CONTENT,
  "/admin/testimonials": PERMISSIONS.VIEW_CONTENT,
  "/admin/contacts": PERMISSIONS.VIEW_CONTACTS,
  "/admin/newsletter": PERMISSIONS.VIEW_NEWSLETTER,
  "/admin/content": PERMISSIONS.VIEW_CONTENT,
  "/admin/settings": PERMISSIONS.VIEW_SETTINGS,
  "/admin/users": PERMISSIONS.VIEW_USERS,
  "/admin/activity": PERMISSIONS.VIEW_ACTIVITY_LOG,
};

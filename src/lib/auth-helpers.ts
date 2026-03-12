import { auth } from "./auth";
import { NextResponse } from "next/server";
import { hasPermission, type Permission } from "./permissions";

export async function requireAdmin() {
  const session = await auth();
  if (!session) {
    return null;
  }
  return session;
}

export async function requirePermission(permission: Permission) {
  const session = await auth();
  if (!session) return null;

  const role = (session.user as { role?: string })?.role;
  if (!role || !hasPermission(role, permission)) return null;

  return session;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbiddenResponse() {
  return NextResponse.json({ error: "Forbidden: insufficient permissions" }, { status: 403 });
}

import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { requirePermission, forbiddenResponse, unauthorizedResponse } from "@/lib/auth-helpers";
import { logActivity } from "@/lib/activity-log";
import { ROLES } from "@/lib/permissions";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requirePermission("manage_users");
  if (!session) return forbiddenResponse();

  const { id } = await params;

  try {
    const body = await request.json();
    const { email, name, password, role, isActive } = body;

    // Validate role if provided
    if (role) {
      const validRoles = Object.values(ROLES);
      if (!validRoles.includes(role)) {
        return NextResponse.json({ error: `Invalid role` }, { status: 400 });
      }
    }

    // Prevent deactivating yourself
    const currentUserId = (session.user as { id?: string })?.id;
    if (id === currentUserId && isActive === false) {
      return NextResponse.json({ error: "You cannot deactivate your own account" }, { status: 400 });
    }

    // Prevent changing your own role
    if (id === currentUserId && role) {
      return NextResponse.json({ error: "You cannot change your own role" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (typeof isActive === "boolean") updateData.isActive = isActive;
    if (password) updateData.passwordHash = await hash(password, 12);

    const user = await prisma.adminUser.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true },
    });

    if (currentUserId) {
      await logActivity({
        userId: currentUserId,
        action: "UPDATE_USER",
        target: `User: ${user.name} (${user.email})`,
        details: `Updated fields: ${Object.keys(updateData).join(", ")}`,
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requirePermission("manage_users");
  if (!session) return forbiddenResponse();

  const { id } = await params;
  const currentUserId = (session.user as { id?: string })?.id;

  if (id === currentUserId) {
    return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
  }

  try {
    const user = await prisma.adminUser.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete activity logs first, then user
    await prisma.activityLog.deleteMany({ where: { userId: id } });
    await prisma.adminUser.delete({ where: { id } });

    if (currentUserId) {
      await logActivity({
        userId: currentUserId,
        action: "DELETE_USER",
        target: `User: ${user.name} (${user.email})`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

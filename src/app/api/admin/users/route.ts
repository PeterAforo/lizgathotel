import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { requirePermission, unauthorizedResponse, forbiddenResponse } from "@/lib/auth-helpers";
import { logActivity } from "@/lib/activity-log";
import { ROLES } from "@/lib/permissions";

export async function GET() {
  const session = await requirePermission("view_users");
  if (!session) return unauthorizedResponse();

  try {
    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await requirePermission("manage_users");
  if (!session) return forbiddenResponse();

  try {
    const body = await request.json();
    const { email, name, password, role } = body;

    if (!email || !name || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate role
    const validRoles = Object.values(ROLES);
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: `Invalid role. Must be one of: ${validRoles.join(", ")}` }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const passwordHash = await hash(password, 12);

    const user = await prisma.adminUser.create({
      data: { email, name, passwordHash, role },
      select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true },
    });

    // Log activity
    const currentUserId = (session.user as { id?: string })?.id;
    if (currentUserId) {
      await logActivity({
        userId: currentUserId,
        action: "CREATE_USER",
        target: `User: ${name} (${email})`,
        details: `Role: ${role}`,
      });
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

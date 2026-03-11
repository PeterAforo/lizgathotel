import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth-helpers";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const group = searchParams.get("group");

    const where: Record<string, unknown> = {};

    if (group) {
      where.group = group;
    }

    const settings = await prisma.siteSetting.findMany({ where });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return unauthorizedResponse();

    const body = await request.json();
    const pairs: { key: string; value: string }[] = body;

    const results = await Promise.all(
      pairs.map((pair) =>
        prisma.siteSetting.upsert({
          where: { key: pair.key },
          update: { value: pair.value },
          create: { key: pair.key, value: pair.value },
        })
      )
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

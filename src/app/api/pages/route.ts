import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth-helpers";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    const where: Record<string, unknown> = {};

    if (page) {
      where.page = page;
    }

    const pages = await prisma.pageContent.findMany({ where });

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching page content:", error);
    return NextResponse.json(
      { error: "Failed to fetch page content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return unauthorizedResponse();

    const body = await request.json();
    const { page, section, ...data } = body;

    const result = await prisma.pageContent.upsert({
      where: {
        page_section: { page, section },
      },
      update: data,
      create: { page, section, ...data },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating page content:", error);
    return NextResponse.json(
      { error: "Failed to update page content" },
      { status: 500 }
    );
  }
}

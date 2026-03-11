import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth-helpers";

export async function GET() {
  try {
    const amenities = await prisma.amenity.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(amenities);
  } catch (error) {
    console.error("Error fetching amenities:", error);
    return NextResponse.json(
      { error: "Failed to fetch amenities" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return unauthorizedResponse();

    const body = await request.json();
    const amenity = await prisma.amenity.create({ data: body });

    return NextResponse.json(amenity, { status: 201 });
  } catch (error) {
    console.error("Error creating amenity:", error);
    return NextResponse.json(
      { error: "Failed to create amenity" },
      { status: 500 }
    );
  }
}

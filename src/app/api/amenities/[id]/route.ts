import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth-helpers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const amenity = await prisma.amenity.findUnique({ where: { id } });

    if (!amenity) {
      return NextResponse.json(
        { error: "Amenity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(amenity);
  } catch (error) {
    console.error("Error fetching amenity:", error);
    return NextResponse.json(
      { error: "Failed to fetch amenity" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin();
    if (!session) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    const amenity = await prisma.amenity.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(amenity);
  } catch (error) {
    console.error("Error updating amenity:", error);
    return NextResponse.json(
      { error: "Failed to update amenity" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin();
    if (!session) return unauthorizedResponse();

    const { id } = await params;

    const amenity = await prisma.amenity.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(amenity);
  } catch (error) {
    console.error("Error deleting amenity:", error);
    return NextResponse.json(
      { error: "Failed to delete amenity" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth-helpers";
import { sendEmail } from "@/lib/email";
import { bookingStatusUpdateTemplate } from "@/lib/email-templates";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorizedResponse();

  try {
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { room: true },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Failed to fetch booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await request.json();

    const existingBooking = await prisma.booking.findUnique({
      where: { id },
      include: { room: true },
    });

    if (!existingBooking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: body,
      include: { room: true },
    });

    // Send status update email if status changed to confirmed or cancelled
    if (
      body.status &&
      (body.status === "confirmed" || body.status === "cancelled") &&
      body.status !== existingBooking.status
    ) {
      try {
        const formattedCheckIn = existingBooking.checkIn.toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
        const formattedCheckOut = existingBooking.checkOut.toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

        const emailHtml = bookingStatusUpdateTemplate({
          bookingRef: existingBooking.bookingRef,
          firstName: existingBooking.firstName,
          lastName: existingBooking.lastName,
          roomName: existingBooking.room.name,
          checkIn: formattedCheckIn,
          checkOut: formattedCheckOut,
          nights: existingBooking.nights,
          guests: existingBooking.guests,
          totalPrice: existingBooking.totalPrice,
          status: body.status,
        });

        await sendEmail(
          existingBooking.email,
          `Booking ${body.status === "confirmed" ? "Confirmed" : "Cancelled"} - ${existingBooking.bookingRef}`,
          emailHtml
        );
      } catch (emailError) {
        console.error("Failed to send status update email:", emailError);
      }
    }

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Failed to update booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

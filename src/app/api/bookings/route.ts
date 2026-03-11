import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth-helpers";
import { generateBookingRef } from "@/lib/booking-ref";
import { sendEmail } from "@/lib/email";
import { bookingConfirmationTemplate } from "@/lib/email-templates";

export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const bookings = await prisma.booking.findMany({
      where: status ? { status } : undefined,
      include: { room: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      roomId,
      checkIn,
      checkOut,
      guests,
      nights,
      totalPrice,
      firstName,
      lastName,
      email,
      phone,
      specialRequests,
    } = body;

    if (
      !roomId ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !nights ||
      !totalPrice ||
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bookingRef = generateBookingRef();

    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        roomId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests,
        nights,
        totalPrice,
        firstName,
        lastName,
        email,
        phone,
        specialRequests: specialRequests || null,
      },
    });

    // Try to send confirmation email
    try {
      const room = await prisma.room.findUnique({
        where: { id: roomId },
        select: { name: true },
      });

      const formattedCheckIn = new Date(checkIn).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedCheckOut = new Date(checkOut).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const emailHtml = bookingConfirmationTemplate({
        bookingRef,
        firstName,
        lastName,
        roomName: room?.name || "Room",
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut,
        nights,
        guests,
        totalPrice,
      });

      const sent = await sendEmail(
        email,
        `Booking Confirmation - ${bookingRef}`,
        emailHtml
      );

      if (sent) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { emailSent: true },
        });
      }
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Failed to create booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

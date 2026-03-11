import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth-helpers";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorizedResponse();

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalBookings,
      revenueResult,
      pendingInquiries,
      newsletterSubscribers,
      recentBookings,
      recentContacts,
      pendingCount,
      confirmedCount,
      completedCount,
      cancelledCount,
    ] = await Promise.all([
      // Total bookings this month
      prisma.booking.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),

      // Total revenue this month (confirmed + completed)
      prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: {
          createdAt: { gte: startOfMonth },
          status: { in: ["confirmed", "completed"] },
        },
      }),

      // Pending (unread) contact inquiries
      prisma.contactSubmission.count({
        where: { isRead: false },
      }),

      // Active newsletter subscribers
      prisma.newsletterSubscriber.count({
        where: { isActive: true },
      }),

      // Recent bookings (last 10)
      prisma.booking.findMany({
        include: { room: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),

      // Recent contacts (last 5)
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

      // Bookings by status
      prisma.booking.count({ where: { status: "pending" } }),
      prisma.booking.count({ where: { status: "confirmed" } }),
      prisma.booking.count({ where: { status: "completed" } }),
      prisma.booking.count({ where: { status: "cancelled" } }),
    ]);

    const totalRevenue = revenueResult._sum.totalPrice || 0;

    const bookingsByStatus = {
      pending: pendingCount,
      confirmed: confirmedCount,
      completed: completedCount,
      cancelled: cancelledCount,
    };

    return NextResponse.json({
      totalBookings,
      totalRevenue,
      pendingInquiries,
      newsletterSubscribers,
      recentBookings,
      recentContacts,
      bookingsByStatus,
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 }
    );
  }
}

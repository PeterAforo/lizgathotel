import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth-helpers";
import { sendEmail } from "@/lib/email";
import { newsletterWelcomeTemplate } from "@/lib/email-templates";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorizedResponse();

  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: "desc" },
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Failed to fetch subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if already exists
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { message: "You are already subscribed to our newsletter" },
          { status: 200 }
        );
      }

      // Reactivate inactive subscriber
      const reactivated = await prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true },
      });

      // Try to send welcome email
      try {
        const emailHtml = newsletterWelcomeTemplate();
        await sendEmail(
          email,
          "Welcome Back to LIZGAT Hotel Newsletter",
          emailHtml
        );
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
      }

      return NextResponse.json(reactivated, { status: 201 });
    }

    // Create new subscriber
    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email },
    });

    // Try to send welcome email
    try {
      const emailHtml = newsletterWelcomeTemplate();
      await sendEmail(
        email,
        "Welcome to LIZGAT Hotel Newsletter",
        emailHtml
      );
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    console.error("Failed to subscribe:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

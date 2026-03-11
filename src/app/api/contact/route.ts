import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, unauthorizedResponse } from "@/lib/auth-helpers";
import { sendEmail } from "@/lib/email";
import { contactNotificationTemplate } from "@/lib/email-templates";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorizedResponse();

  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contact = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
      },
    });

    // Try to send notification email to the hotel
    try {
      const emailHtml = contactNotificationTemplate({
        name,
        email,
        phone,
        subject,
        message,
      });

      const notificationEmail =
        process.env.SMTP_USER || "info@lizgathotel.com";

      await sendEmail(
        notificationEmail,
        `New Contact Inquiry: ${subject}`,
        emailHtml
      );
    } catch (emailError) {
      console.error("Failed to send contact notification email:", emailError);
    }

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Failed to create contact submission:", error);
    return NextResponse.json(
      { error: "Failed to create contact submission" },
      { status: 500 }
    );
  }
}

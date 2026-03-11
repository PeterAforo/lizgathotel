const baseStyle = `
  font-family: 'Georgia', serif;
  max-width: 600px;
  margin: 0 auto;
  background: #FFFFFF;
`;

const headerStyle = `
  background: #1A1A2E;
  padding: 24px;
  text-align: center;
`;

const footerStyle = `
  background: #1A1A2E;
  padding: 20px;
  text-align: center;
  color: #9CA3AF;
  font-size: 12px;
`;

function layout(content: string) {
  return `
    <div style="${baseStyle}">
      <div style="${headerStyle}">
        <h1 style="color: #C9A84C; margin: 0; font-size: 28px; letter-spacing: 2px;">LIZGAT</h1>
        <p style="color: #9CA3AF; margin: 4px 0 0; font-size: 12px; letter-spacing: 3px;">HOTEL</p>
      </div>
      <div style="padding: 32px 24px;">
        ${content}
      </div>
      <div style="${footerStyle}">
        <p style="margin: 0;">12 Liberation Road, Airport Residential Area, Accra, Ghana</p>
        <p style="margin: 4px 0 0;">+233 30 277 5500 | info@lizgathotel.com</p>
      </div>
    </div>
  `;
}

interface BookingData {
  bookingRef: string;
  firstName: string;
  lastName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalPrice: number;
  status?: string;
}

export function bookingConfirmationTemplate(booking: BookingData) {
  return layout(`
    <h2 style="color: #1A1A2E; margin: 0 0 16px;">Booking Confirmation</h2>
    <p style="color: #4B5563;">Dear ${booking.firstName} ${booking.lastName},</p>
    <p style="color: #4B5563;">Thank you for choosing LIZGAT Hotel. Your booking has been received.</p>

    <div style="background: #F5F0E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0 0 8px; color: #1A1A2E;"><strong>Booking Reference:</strong> ${booking.bookingRef}</p>
      <p style="margin: 0 0 8px; color: #1A1A2E;"><strong>Room:</strong> ${booking.roomName}</p>
      <p style="margin: 0 0 8px; color: #1A1A2E;"><strong>Check-in:</strong> ${booking.checkIn}</p>
      <p style="margin: 0 0 8px; color: #1A1A2E;"><strong>Check-out:</strong> ${booking.checkOut}</p>
      <p style="margin: 0 0 8px; color: #1A1A2E;"><strong>Nights:</strong> ${booking.nights}</p>
      <p style="margin: 0 0 8px; color: #1A1A2E;"><strong>Guests:</strong> ${booking.guests}</p>
      <p style="margin: 0; color: #C9A84C; font-size: 18px;"><strong>Total: $${booking.totalPrice.toLocaleString()}</strong></p>
    </div>

    <p style="color: #4B5563;">Check-in time is 2:00 PM and check-out time is 12:00 PM.</p>
    <p style="color: #4B5563;">If you have any questions, please contact us at +233 30 277 5500.</p>
    <p style="color: #4B5563;">We look forward to welcoming you!</p>
  `);
}

export function bookingStatusUpdateTemplate(booking: BookingData) {
  const statusText = booking.status === "confirmed"
    ? "Your booking has been confirmed! We look forward to welcoming you."
    : booking.status === "cancelled"
    ? "Your booking has been cancelled. If this was not requested by you, please contact us immediately."
    : `Your booking status has been updated to: ${booking.status}`;

  const statusColor = booking.status === "confirmed" ? "#10B981" : booking.status === "cancelled" ? "#EF4444" : "#C9A84C";

  return layout(`
    <h2 style="color: #1A1A2E; margin: 0 0 16px;">Booking Update</h2>
    <p style="color: #4B5563;">Dear ${booking.firstName} ${booking.lastName},</p>

    <div style="background: #F5F0E8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${statusColor};">
      <p style="margin: 0 0 8px; color: #1A1A2E;"><strong>Booking Reference:</strong> ${booking.bookingRef}</p>
      <p style="margin: 0; color: ${statusColor}; font-size: 16px;"><strong>Status: ${(booking.status || "").toUpperCase()}</strong></p>
    </div>

    <p style="color: #4B5563;">${statusText}</p>
    <p style="color: #4B5563;">For any queries, contact us at +233 30 277 5500.</p>
  `);
}

interface ContactData {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

export function contactNotificationTemplate(data: ContactData) {
  return layout(`
    <h2 style="color: #1A1A2E; margin: 0 0 16px;">New Contact Inquiry</h2>

    <div style="background: #F5F0E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0 0 8px; color: #1A1A2E;"><strong>From:</strong> ${data.name}</p>
      <p style="margin: 0 0 8px; color: #1A1A2E;"><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p style="margin: 0 0 8px; color: #1A1A2E;"><strong>Phone:</strong> ${data.phone}</p>` : ""}
      <p style="margin: 0 0 8px; color: #1A1A2E;"><strong>Subject:</strong> ${data.subject}</p>
    </div>

    <div style="background: #FFFFFF; padding: 16px; border: 1px solid #E8DFD0; border-radius: 8px;">
      <p style="margin: 0; color: #4B5563; white-space: pre-wrap;">${data.message}</p>
    </div>
  `);
}

export function newsletterWelcomeTemplate() {
  return layout(`
    <h2 style="color: #1A1A2E; margin: 0 0 16px;">Welcome to LIZGAT Hotel</h2>
    <p style="color: #4B5563;">Thank you for subscribing to our newsletter!</p>
    <p style="color: #4B5563;">You'll be the first to know about exclusive offers, upcoming events, and special packages at LIZGAT Hotel.</p>

    <div style="text-align: center; margin: 24px 0;">
      <a href="http://localhost:3000/rooms" style="background: #C9A84C; color: #1A1A2E; padding: 12px 32px; text-decoration: none; border-radius: 4px; font-weight: bold;">Explore Our Rooms</a>
    </div>

    <p style="color: #9CA3AF; font-size: 12px;">If you did not subscribe, please ignore this email.</p>
  `);
}

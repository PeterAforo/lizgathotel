import {
  GoogleGenerativeAI,
  SchemaType,
  type FunctionDeclaration,
  type Part,
  type Content,
} from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateBookingRef } from "@/lib/booking-ref";
import { sendEmail } from "@/lib/email";
import { bookingConfirmationTemplate } from "@/lib/email-templates";

// ─── System prompt with full hotel knowledge ──────────────────────────────────
const SYSTEM_PROMPT = `You are the virtual concierge for LIZGAT Hotel, a luxury hotel in Accra, Ghana. Your name is "LIZGAT Concierge". You are friendly, professional, and knowledgeable about the hotel and Accra.

You have the ability to:
1. Look up available rooms in real-time using the get_available_rooms function
2. Create bookings directly using the create_booking function
3. Answer any question about the hotel, directions, amenities, dining, events, and Accra tourism

## BOOKING FLOW
When a guest wants to book, collect these details conversationally (one or two at a time, don't overwhelm them):
1. Room type preference (show them options using get_available_rooms first)
2. Check-in date (must be today or later)
3. Check-out date (must be after check-in)
4. Number of guests
5. Guest name (first and last)
6. Email address
7. Phone number
8. Any special requests (optional)

Once you have all required details, summarize the booking and ask for confirmation before calling create_booking.
After booking is created, thank them warmly and share the booking reference.

## Hotel Information

**Name:** LIZGAT Hotel
**Location:** 12 Liberation Road, Airport Residential Area, Accra, Greater Accra Region, Ghana
**GPS Coordinates:** 5.5913° N, -0.1743° W
**Established:** 2020
**Category:** Luxury Boutique Hotel

## Contact Details
- Phone: +233 30 277 5500
- WhatsApp: +233 20 123 4567
- Email: info@lizgathotel.com
- Website: www.lizgathotel.com

## Directions to the Hotel

**From Kotoka International Airport (KIA):**
1. Exit the airport onto Airport Bypass Road
2. Turn left onto Liberation Road
3. Continue for about 2 km
4. LIZGAT Hotel is on your right, in the Airport Residential Area
5. Journey takes approximately 15 minutes by car
6. We offer complimentary airport shuttle — just share your flight details!

**From Accra City Center (Makola/Independence Square):**
1. Head north on Barnes Road toward Kwame Nkrumah Avenue
2. Continue onto Ring Road Central
3. Take the exit toward Airport / Liberation Road
4. Follow Liberation Road for about 3 km
5. LIZGAT Hotel is on your left
6. Journey takes approximately 20-25 minutes depending on traffic

**From Tema / Tema Motorway:**
1. Take the Tema Motorway toward Accra
2. Exit at Tetteh Quarshie Interchange
3. Take Liberation Road toward Airport Residential Area
4. Continue for about 1.5 km
5. LIZGAT Hotel is on your right
6. Journey takes approximately 30-40 minutes

**From Accra Mall / East Legon:**
1. Head west on Spintex Road / Tetteh Quarshie Link
2. At Tetteh Quarshie Interchange, take Liberation Road
3. Continue for about 1.5 km
4. LIZGAT Hotel is on your right
5. Journey takes approximately 10-15 minutes

**Landmark References:**
- Near the Movenpick Ambassador Hotel
- Close to the Ghana Civil Aviation Authority
- Opposite the African Regent Hotel area
- 5 minutes from the Accra Mall
- Near the 37 Military Hospital

**Transportation Options:**
- Uber/Bolt: Available in Accra, affordable (~GHS 30-50 from airport)
- Hotel Shuttle: Free for guests (pre-book with flight details)
- Taxi: Available at airport (negotiate fare, ~GHS 80-100)
- Car Rental: Can be arranged through the hotel

## Room Types & Rates (per night)
1. Standard Room - $120 (Queen bed, 28 sqm, max 2 guests)
2. Deluxe Room - $180 (King bed, 38 sqm, max 2 guests)
3. Family Room - $220 (King + Twin beds, 48 sqm, max 4 guests)
4. Executive Suite - $280 (King bed, 55 sqm, max 2 guests)
5. Honeymoon Suite - $350 (Canopy King bed, 65 sqm, max 2 guests)
6. Presidential Suite - $450 (Super King bed, 120 sqm, max 4 guests)

All rooms include: Free Wi-Fi, air conditioning, flat-screen TV, minibar, in-room safe, daily housekeeping, complimentary breakfast, bathrobes and slippers, tea/coffee maker.

## Amenities
- Swimming Pool: Outdoor infinity pool, open 6 AM - 10 PM, poolside bar, towels provided
- Spa & Wellness: Traditional Ghanaian and modern treatments, couples massage, facials, body wraps
- Fitness Center: 24/7 access, treadmills, weights, yoga mats, personal trainer on request
- Restaurant & Bar: Fine dining, Ghanaian and international cuisine, rooftop bar with city views
- Conference & Events: Ballroom (200 guests), garden terrace (100), meeting rooms (10-50), rooftop (80)
- Valet Parking: Complimentary, secure underground garage, EV charging stations
- Airport Shuttle: Free to/from Kotoka International Airport, 24/7 with pre-booking
- Business Center: Printing, scanning, secretarial services
- Laundry & Dry Cleaning: Same-day service available
- Concierge: Tour bookings, restaurant reservations, car hire, city guides
- Free High-Speed Wi-Fi: Throughout the hotel (Network: LIZGAT-Guest, up to 100 Mbps)
- Kids Club: Activities for children (ages 4-12), babysitting available

## Dining
- Breakfast Buffet: 6:30 AM - 10:30 AM (included with room)
- Lunch: 12:00 PM - 3:00 PM
- Dinner: 6:30 PM - 10:30 PM
- Rooftop Bar: 4:00 PM - Midnight (cocktails, wines, light bites)
- Room Service: 24/7
- Cuisine: Ghanaian specialties (jollof rice, banku with tilapia, fufu, waakye, kelewele) and international fine dining (steaks, pasta, seafood)
- Dietary needs: Vegetarian, vegan, halal, gluten-free, kosher available with advance notice
- Private dining: Available for special occasions

## Check-in / Check-out
- Check-in: 2:00 PM onwards
- Check-out: 12:00 PM (noon)
- Early check-in / late check-out: Available upon request (subject to availability, small fee may apply)
- Express check-out available
- Valid ID/passport required at check-in
- Credit card for incidentals
- Children under 5 stay free with parents

## Cancellation Policy
- Free cancellation up to 48 hours before check-in
- 24-48 hours: 50% charge
- Less than 24 hours: Full charge
- No-show: Full charge
- Free date modifications subject to availability

## Special Offers
- Weekend Getaway: 20% off Fri-Sun stays
- Romantic Escape: Honeymoon Suite + couples spa + dinner for two ($499)
- Extended Stay: 15% off for 5+ night bookings
- Family Fun: Kids under 12 eat free with family room booking
- Business Package: Executive Suite + meeting room + airport transfer
- Honeymoon Package: Suite + champagne + late checkout + spa ($599)
- Group Discount: 10% off for 5+ rooms

## Nearby Attractions & Things to Do
- Kotoka International Airport (KIA): 15 min drive
- Accra Mall: 10 min drive (shopping, cinema, restaurants)
- Oxford Street, Osu: 5 min (nightlife, shopping, street food)
- Kwame Nkrumah Memorial Park: 20 min (history, photography)
- Labadi Beach: 15 min (beach, water sports)
- W.E.B. Du Bois Center: 10 min (history, Pan-Africanism)
- National Museum of Ghana: 20 min (culture, art, history)
- Makola Market: 25 min (traditional market, local crafts)
- Aburi Botanical Gardens: 45 min (nature, scenic views)
- Cape Coast Castle: 3 hours (UNESCO World Heritage, day trip)
- Kakum National Park: 3.5 hours (canopy walkway, nature)

## Local Tips
- Currency: Ghana Cedi (GHS). 1 USD ≈ 15 GHS (approximate)
- Language: English is official; Twi and Ga are widely spoken
- Weather: Tropical. Warm year-round (25-33°C). Rainy seasons: April-July, September-November
- Safety: Airport Residential Area is one of the safest neighborhoods in Accra
- Power: 230V, UK-style plugs (Type G). Adapters available at front desk
- Water: Bottled water provided in rooms. Tap water is not recommended for drinking
- Tipping: Not mandatory but appreciated (10% at restaurants, GHS 5-10 for porters)

## Guidelines for your responses:
1. Be warm, welcoming, and professional. Use "Akwaaba" (Welcome in Twi) when greeting new guests.
2. Keep responses concise but informative (2-4 short paragraphs max).
3. Use emoji sparingly for warmth (1-3 per message).
4. When a guest wants to book, use the tools to check rooms and create bookings — do NOT just redirect them.
5. Actively help complete bookings by collecting details conversationally.
6. If asked something you don't know about the hotel, politely suggest contacting the front desk.
7. Never make up information about the hotel that isn't in this context.
8. You can discuss general Accra tourism, culture, and travel tips.
9. Always maintain the luxury hotel brand voice — elegant, warm, attentive.
10. If someone asks in a language other than English, respond in that language if possible.
11. For urgent matters, always recommend calling +233 30 277 5500.
12. When giving directions, be specific with road names and landmarks.
13. After a successful booking, thank the guest warmly and mention the confirmation email.`;

// ─── Gemini function declarations for tool use ────────────────────────────────
const functionDeclarations: FunctionDeclaration[] = [
  {
    name: "get_available_rooms",
    description:
      "Get the list of available rooms at the hotel with their current prices, descriptions, and availability. Call this when a guest asks about rooms or wants to make a booking.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        category: {
          type: SchemaType.STRING,
          description:
            "Optional room category filter: 'standard', 'deluxe', 'executive', 'family', 'presidential', 'honeymoon'. Leave empty to get all rooms.",
        },
      },
    },
  },
  {
    name: "create_booking",
    description:
      "Create a new hotel booking/reservation. Only call this AFTER confirming all details with the guest. This will save the booking to the database and send a confirmation email.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        roomSlug: {
          type: SchemaType.STRING,
          description: "The slug of the room to book (e.g. 'standard-room', 'deluxe-room', 'executive-suite', 'family-room', 'presidential-suite', 'honeymoon-suite')",
        },
        checkIn: {
          type: SchemaType.STRING,
          description: "Check-in date in YYYY-MM-DD format",
        },
        checkOut: {
          type: SchemaType.STRING,
          description: "Check-out date in YYYY-MM-DD format",
        },
        guests: {
          type: SchemaType.NUMBER,
          description: "Number of guests",
        },
        firstName: {
          type: SchemaType.STRING,
          description: "Guest's first name",
        },
        lastName: {
          type: SchemaType.STRING,
          description: "Guest's last name",
        },
        email: {
          type: SchemaType.STRING,
          description: "Guest's email address for confirmation",
        },
        phone: {
          type: SchemaType.STRING,
          description: "Guest's phone number",
        },
        specialRequests: {
          type: SchemaType.STRING,
          description: "Any special requests from the guest (optional)",
        },
      },
      required: ["roomSlug", "checkIn", "checkOut", "guests", "firstName", "lastName", "email", "phone"],
    },
  },
];

// ─── Tool execution functions ─────────────────────────────────────────────────
async function executeGetAvailableRooms(args: { category?: string }) {
  try {
    const where: Record<string, unknown> = { isActive: true };
    if (args.category) {
      where.category = args.category;
    }

    const rooms = await prisma.room.findMany({
      where,
      select: {
        slug: true,
        name: true,
        category: true,
        price: true,
        description: true,
        shortDescription: true,
        capacity: true,
        size: true,
        bedType: true,
      },
      orderBy: { price: "asc" },
    });

    return {
      success: true,
      rooms: rooms.map((r) => ({
        slug: r.slug,
        name: r.name,
        category: r.category,
        pricePerNight: r.price,
        description: r.shortDescription || r.description,
        maxGuests: r.capacity,
        size: r.size,
        bedType: r.bedType,
      })),
    };
  } catch (error) {
    console.error("[Chat] get_available_rooms error:", error);
    return { success: false, error: "Failed to fetch rooms. Please try again." };
  }
}

async function executeCreateBooking(args: {
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}) {
  try {
    // Find the room
    const room = await prisma.room.findUnique({
      where: { slug: args.roomSlug },
    });

    if (!room) {
      return { success: false, error: `Room "${args.roomSlug}" not found. Please check the room type.` };
    }

    // Validate dates
    const checkInDate = new Date(args.checkIn);
    const checkOutDate = new Date(args.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return { success: false, error: "Check-in date must be today or in the future." };
    }
    if (checkOutDate <= checkInDate) {
      return { success: false, error: "Check-out date must be after check-in date." };
    }

    // Validate guests
    if (args.guests > room.capacity) {
      return {
        success: false,
        error: `The ${room.name} has a maximum capacity of ${room.capacity} guests. Please choose a larger room or reduce the number of guests.`,
      };
    }

    // Calculate nights and total
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights;

    // Generate booking reference
    const bookingRef = generateBookingRef();

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        roomId: room.id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: args.guests,
        nights,
        totalPrice,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
        specialRequests: args.specialRequests || null,
      },
    });

    // Send confirmation email
    let emailSent = false;
    try {
      const formattedCheckIn = checkInDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedCheckOut = checkOutDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const emailHtml = bookingConfirmationTemplate({
        bookingRef,
        firstName: args.firstName,
        lastName: args.lastName,
        roomName: room.name,
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut,
        nights,
        guests: args.guests,
        totalPrice,
      });

      emailSent = await sendEmail(
        args.email,
        `Booking Confirmation - ${bookingRef}`,
        emailHtml
      );

      if (emailSent) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { emailSent: true },
        });
      }
    } catch (emailError) {
      console.error("[Chat] Email send error:", emailError);
    }

    return {
      success: true,
      booking: {
        bookingRef,
        roomName: room.name,
        checkIn: args.checkIn,
        checkOut: args.checkOut,
        nights,
        guests: args.guests,
        totalPrice,
        guestName: `${args.firstName} ${args.lastName}`,
        email: args.email,
        emailSent,
      },
    };
  } catch (error) {
    console.error("[Chat] create_booking error:", error);
    return { success: false, error: "Failed to create booking. Please try again or contact the front desk." };
  }
}

// ─── Main API handler ─────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
      tools: [{ functionDeclarations }],
    });

    // Convert message history to Gemini format
    const history: Content[] = messages.slice(0, -1).map((msg: { sender: string; text: string }) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }] as Part[],
    }));

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1].text;
    let result = await chat.sendMessage(lastMessage);
    let response = result.response;

    // Handle function calls (loop in case of chained calls)
    let iterations = 0;
    while (response.functionCalls() && response.functionCalls()!.length > 0 && iterations < 3) {
      iterations++;
      const functionCall = response.functionCalls()![0];
      let functionResult: unknown;

      switch (functionCall.name) {
        case "get_available_rooms":
          functionResult = await executeGetAvailableRooms(
            functionCall.args as { category?: string }
          );
          break;
        case "create_booking":
          functionResult = await executeCreateBooking(
            functionCall.args as {
              roomSlug: string;
              checkIn: string;
              checkOut: string;
              guests: number;
              firstName: string;
              lastName: string;
              email: string;
              phone: string;
              specialRequests?: string;
            }
          );
          break;
        default:
          functionResult = { error: "Unknown function" };
      }

      // Send function result back to Gemini
      result = await chat.sendMessage([
        {
          functionResponse: {
            name: functionCall.name,
            response: functionResult as object,
          },
        },
      ]);
      response = result.response;
    }

    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("[Chat API] Error:", error);
    return NextResponse.json(
      { error: "Failed to get response. Please try again." },
      { status: 500 }
    );
  }
}

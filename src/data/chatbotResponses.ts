export interface QuickReply {
  label: string;
  value: string;
}

export interface ChatResponse {
  keywords: string[];
  response: string;
  quickReplies?: QuickReply[];
}

export const chatResponses: ChatResponse[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings"],
    response:
      "Welcome to LIZGAT Hotel! 🌟 I'm your virtual concierge. How can I assist you today? Whether you're looking to book a room, learn about our amenities, or plan your visit to Accra, I'm here to help!",
    quickReplies: [
      { label: "View Rooms", value: "rooms" },
      { label: "Make a Booking", value: "booking" },
      { label: "Hotel Amenities", value: "amenities" },
      { label: "Contact Us", value: "contact" },
    ],
  },
  {
    keywords: ["room", "rooms", "accommodation", "stay", "suite", "bed"],
    response:
      "We offer 6 luxurious room types to suit every need:\n\n🏨 **Standard Room** - $120/night (Queen bed, 28 sqm)\n🌟 **Deluxe Room** - $180/night (King bed, 38 sqm)\n💼 **Executive Suite** - $280/night (King bed, 55 sqm)\n👨‍👩‍👧‍👦 **Family Room** - $220/night (King + Twin beds, 48 sqm)\n👑 **Presidential Suite** - $450/night (Super King, 120 sqm)\n💕 **Honeymoon Suite** - $350/night (Canopy King, 65 sqm)\n\nAll rooms include free Wi-Fi, air conditioning, and daily housekeeping. Would you like to book a room?",
    quickReplies: [
      { label: "Book Now", value: "booking" },
      { label: "Room Details", value: "room details" },
      { label: "Special Offers", value: "offers" },
    ],
  },
  {
    keywords: ["book", "booking", "reserve", "reservation", "available", "availability"],
    response:
      "I'd be happy to help you make a reservation! 📅\n\nTo get started, I'll need a few details:\n1. **Check-in date**\n2. **Check-out date**\n3. **Number of guests**\n4. **Preferred room type**\n\nYou can also visit our online booking page for a seamless experience. Would you like me to guide you there?",
    quickReplies: [
      { label: "Go to Booking Page", value: "booking page" },
      { label: "View Room Types", value: "rooms" },
      { label: "Check Rates", value: "pricing" },
    ],
  },
  {
    keywords: ["price", "pricing", "cost", "rate", "rates", "how much", "expensive", "cheap", "affordable"],
    response:
      "Here are our current room rates per night:\n\n💰 **Standard Room**: $120\n💰 **Deluxe Room**: $180\n💰 **Family Room**: $220\n💰 **Executive Suite**: $280\n💰 **Honeymoon Suite**: $350\n💰 **Presidential Suite**: $450\n\nRates include breakfast and free Wi-Fi. Special rates available for extended stays and group bookings. Contact us for custom quotes!",
    quickReplies: [
      { label: "Book a Room", value: "booking" },
      { label: "Special Offers", value: "offers" },
      { label: "Contact Us", value: "contact" },
    ],
  },
  {
    keywords: ["amenity", "amenities", "facility", "facilities", "pool", "spa", "gym", "fitness"],
    response:
      "LIZGAT Hotel offers excellent amenities:\n\n🍽️ **Restaurant & Bar** - Fine dining with Ghanaian and international cuisine\n📋 **Conference Rooms** - Up to 200 guests\n🚗 **Valet Parking** - Complimentary for guests\n💼 **Business Center** - Printing, scanning, workspaces\n👔 **Concierge Service** - Tours, reservations, car hire\n👕 **Laundry & Dry Cleaning** - Same-day service\n📶 **Free Wi-Fi** - High-speed throughout the hotel\n🔒 **24/7 Security** - CCTV and key card access\n\nWould you like more details about any specific amenity?",
    quickReplies: [
      { label: "Restaurant Menu", value: "dining" },
      { label: "Conference Rooms", value: "events" },
      { label: "Book a Room", value: "booking" },
    ],
  },
  {
    keywords: ["restaurant", "dining", "food", "menu", "eat", "breakfast", "lunch", "dinner", "bar", "drink"],
    response:
      "Our restaurant offers an exceptional culinary experience! 🍽️\n\n**Dining Hours:**\n🌅 Breakfast Buffet: 6:30 AM - 10:30 AM\n☀️ Lunch: 12:00 PM - 3:00 PM\n🌙 Dinner: 6:30 PM - 10:30 PM\n🍸 Rooftop Bar: 4:00 PM - Midnight\n\n**Cuisine:** A blend of traditional Ghanaian dishes (jollof rice, banku, fufu) and international fine dining.\n\nPrivate dining and room service available 24/7. Dietary restrictions are accommodated with advance notice.",
    quickReplies: [
      { label: "Make Reservation", value: "booking" },
      { label: "Room Service", value: "room service" },
      { label: "Dietary Needs", value: "dietary" },
    ],
  },
  {
    keywords: ["location", "address", "where", "direction", "directions", "map", "find"],
    response:
      "📍 **LIZGAT Hotel Location:**\n\n12 Liberation Road, Airport Residential Area\nAccra, Greater Accra Region, Ghana\n\n**Nearby Landmarks:**\n- 15 min from Kotoka International Airport (KIA)\n- 10 min from Accra Mall\n- 20 min from Kwame Nkrumah Memorial Park\n- 5 min from Oxford Street (Osu)\n\nUber/Bolt and taxis are readily available. Need directions or transportation assistance?",
    quickReplies: [
      { label: "Get Directions", value: "directions" },
      { label: "Transportation", value: "transport" },
      { label: "Contact Us", value: "contact" },
    ],
  },
  {
    keywords: ["check in", "checkin", "check-in", "check out", "checkout", "check-out", "time", "policy"],
    response:
      "⏰ **Check-in / Check-out Times:**\n\n✅ **Check-in:** 2:00 PM onwards\n🚪 **Check-out:** 12:00 PM (noon)\n⏩ **Early Check-in:** Available upon request (subject to availability)\n⏰ **Late Check-out:** Available upon request, small fee may apply\n\n**Policies:**\n- Valid ID required at check-in\n- Credit card for incidentals\n- Free cancellation up to 48 hours before arrival\n- Children under 5 stay free with parents",
    quickReplies: [
      { label: "Make a Booking", value: "booking" },
      { label: "Cancellation Policy", value: "cancellation" },
      { label: "Contact Front Desk", value: "contact" },
    ],
  },
  {
    keywords: ["contact", "phone", "email", "call", "reach", "talk", "speak", "human", "staff", "reception"],
    response:
      "📞 **Contact LIZGAT Hotel:**\n\n📱 Phone: +233 24 548 2078 (Primary)\n📱 Phone: +233 54 098 6101\n📱 Phone: +233 24 002 9429\n� Phone: +233 24 222 2481\n�📧 Email: info@lizgathotel.com\n\n🌐 Website: www.lizgathotel.com\n\n**Social Media:**\n📘 Facebook: /LizgatHotel\n📸 Instagram: @lizgathotel\n🐦 Twitter: @lizgathotel\n\n**Front Desk Hours:** 24/7\n\nWould you like to send us a message or make a reservation?",
    quickReplies: [
      { label: "Send Message", value: "message" },
      { label: "Make a Booking", value: "booking" },
      { label: "View Location", value: "location" },
    ],
  },
  {
    keywords: ["event", "events", "wedding", "conference", "meeting", "party", "celebration", "banquet"],
    response:
      "🎉 **Events at LIZGAT Hotel:**\n\nWe host unforgettable events!\n\n**Venues Available:**\n- Grand Ballroom (up to 200 guests)\n- Garden Terrace (up to 100 guests)\n- Conference Rooms (10-50 guests)\n- Rooftop Lounge (up to 80 guests)\n\n**Services Include:**\n- Dedicated event coordinator\n- Custom catering menus\n- Audiovisual equipment\n- Floral and decor arrangements\n- Entertainment coordination\n\nContact our events team for a personalized quote!",
    quickReplies: [
      { label: "Event Inquiry", value: "contact" },
      { label: "View Venues", value: "amenities" },
      { label: "Catering Menu", value: "dining" },
    ],
  },
  {
    keywords: ["offer", "offers", "deal", "deals", "discount", "promo", "promotion", "special", "package"],
    response:
      "🎁 **Current Special Offers:**\n\n🌴 **Weekend Getaway Package** - 20% off for Fri-Sun stays\n💕 **Romantic Escape** - Honeymoon Suite + dinner for two\n📅 **Extended Stay** - 15% off for 5+ night bookings\n👨‍👩‍👧‍👦 **Family Fun** - Kids under 12 eat free with family booking\n💼 **Business Package** - Executive Suite + meeting room access\n\nAll packages include complimentary breakfast. Contact us for details!",
    quickReplies: [
      { label: "Book Package", value: "booking" },
      { label: "More Details", value: "contact" },
      { label: "View Rooms", value: "rooms" },
    ],
  },
  {
    keywords: ["thank", "thanks", "bye", "goodbye", "great", "awesome", "perfect", "wonderful"],
    response:
      "Thank you for chatting with us! 😊 We look forward to welcoming you at LIZGAT Hotel. If you have any more questions, don't hesitate to reach out. Have a wonderful day! 🌟\n\nAkwaaba! (Welcome in Twi) 🇬🇭",
    quickReplies: [
      { label: "Make a Booking", value: "booking" },
      { label: "Back to Start", value: "hello" },
    ],
  },
  {
    keywords: ["wifi", "internet", "wi-fi", "connection"],
    response:
      "📶 **Wi-Fi Information:**\n\nComplimentary high-speed Wi-Fi is available throughout the hotel!\n\n**Network:** LIZGAT-Guest\n**Speed:** Up to 100 Mbps\n**Coverage:** All rooms, lobby, pool area, restaurant\n\nConnect with the password provided at check-in. For technical assistance, dial 0 from your room phone.",
    quickReplies: [
      { label: "Other Amenities", value: "amenities" },
      { label: "Contact Support", value: "contact" },
    ],
  },
  {
    keywords: ["parking", "car", "valet", "drive"],
    response:
      "🚗 **Parking at LIZGAT Hotel:**\n\n✅ Complimentary valet parking for all guests\n✅ Secure underground parking garage\n✅ 24/7 CCTV monitoring\n✅ EV charging stations available\n\nSimply drive up to the main entrance and our valet team will take care of the rest!",
    quickReplies: [
      { label: "Other Amenities", value: "amenities" },
      { label: "Contact Us", value: "contact" },
    ],
  },
  {
    keywords: ["shuttle", "airport", "transfer", "transport", "taxi", "pickup", "pick up", "drop off"],
    response:
      "✈️ **Getting to LIZGAT Hotel from the Airport:**\n\n**Kotoka International Airport (KIA):**\n- Distance: ~7 km (15 min drive)\n- Uber/Bolt: ~GHS 30-50 (available at airport)\n- Taxi: ~GHS 80-100 (negotiate fare)\n\n**Note:** We do not currently offer an airport shuttle service, but our concierge can help arrange transportation for you. Car rental can also be arranged through the hotel.",
    quickReplies: [
      { label: "Book Transfer", value: "booking" },
      { label: "Hotel Location", value: "location" },
    ],
  },
  {
    keywords: ["cancellation", "cancel", "refund", "change", "modify"],
    response:
      "📋 **Cancellation Policy:**\n\n✅ **Free cancellation** up to 48 hours before check-in\n⚠️ **24-48 hours:** 50% charge applies\n❌ **Less than 24 hours:** Full charge applies\n🔄 **Modifications:** Free date changes subject to availability\n\nFor cancellations or modifications, contact us at:\n📧 reservations@lizgathotel.com\n📱 +233 24 548 2078",
    quickReplies: [
      { label: "Contact Us", value: "contact" },
      { label: "Make New Booking", value: "booking" },
    ],
  },
];

export const defaultResponse: ChatResponse = {
  keywords: [],
  response:
    "I appreciate your question! While I may not have the specific answer right now, our friendly team at the front desk would love to help. You can reach us at:\n\n📱 +233 24 548 2078\n📧 info@lizgathotel.com\n\nOr would you like to know about something else?",
  quickReplies: [
    { label: "View Rooms", value: "rooms" },
    { label: "Hotel Amenities", value: "amenities" },
    { label: "Make a Booking", value: "booking" },
    { label: "Contact Us", value: "contact" },
  ],
};

export function findResponse(message: string): ChatResponse {
  const lower = message.toLowerCase();
  const matched = chatResponses.find((cr) =>
    cr.keywords.some((kw) => lower.includes(kw))
  );
  return matched || defaultResponse;
}

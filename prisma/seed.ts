import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create default admin user
  const passwordHash = await hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@lizgathotel.com" },
    update: {},
    create: {
      email: "admin@lizgathotel.com",
      name: "Admin",
      passwordHash,
      role: "superadmin",
    },
  });
  console.log("Admin user created");

  // 2. Seed rooms
  const roomsData = [
    {
      slug: "standard-room",
      name: "Standard Room",
      category: "standard",
      price: 120,
      description: "Our Standard Room offers a comfortable retreat with modern amenities, perfect for both business and leisure travelers. Enjoy a restful night's sleep on our premium mattress, surrounded by tasteful African-inspired decor that celebrates Ghana's rich cultural heritage.",
      shortDescription: "A comfortable retreat with modern amenities for the discerning traveler.",
      capacity: 2,
      size: "28 sqm",
      bedType: "Queen Bed",
      image: "/images/rooms/room-2/036.jpg",
      images: [
        "/images/rooms/room-2/036.jpg",
        "/images/rooms/room-2/037.jpg",
        "/images/rooms/room-2/038.jpg",
      ],
      amenities: ["Free Wi-Fi", "Air Conditioning", "Flat Screen TV", "Mini Bar", "Room Service", "Daily Housekeeping"],
      featured: false,
      sortOrder: 0,
    },
    {
      slug: "deluxe-room",
      name: "Deluxe Room",
      category: "deluxe",
      price: 180,
      description: "Step into luxury with our Deluxe Room, featuring expanded living space, premium furnishings, and stunning views of Accra. The room blends contemporary comfort with authentic Ghanaian artistry, creating an unforgettable stay experience.",
      shortDescription: "Expanded luxury with premium furnishings and city views.",
      capacity: 2,
      size: "38 sqm",
      bedType: "King Bed",
      image: "/images/rooms/room-4/045.jpg",
      images: [
        "/images/rooms/room-4/045.jpg",
        "/images/rooms/room-4/046.jpg",
        "/images/rooms/room-4/047.jpg",
      ],
      amenities: ["Free Wi-Fi", "Air Conditioning", '55" Smart TV', "Mini Bar", "Room Service", "Bathrobe & Slippers", "Coffee Machine", "Safe Box"],
      featured: true,
      sortOrder: 1,
    },
    {
      slug: "executive-suite",
      name: "Executive Suite",
      category: "suite",
      price: 280,
      description: "Our Executive Suite is designed for those who demand the finest. With a separate living area, work desk, and premium bathroom amenities, this suite is perfect for extended stays or business travelers who want to unwind in style.",
      shortDescription: "Separate living area and workspace for the executive traveler.",
      capacity: 3,
      size: "55 sqm",
      bedType: "King Bed",
      image: "/images/rooms/room-7/055.jpg",
      images: [
        "/images/rooms/room-7/055.jpg",
        "/images/rooms/room-7/056.jpg",
        "/images/rooms/room-7/057.jpg",
      ],
      amenities: ["Free Wi-Fi", "Air Conditioning", '65" Smart TV', "Full Mini Bar", "24/7 Room Service", "Bathrobe & Slippers", "Espresso Machine", "Safe Box", "Work Desk", "Living Area"],
      featured: true,
      sortOrder: 2,
    },
    {
      slug: "family-room",
      name: "Family Room",
      category: "deluxe",
      price: 220,
      description: "Designed with families in mind, our Family Room offers generous space and thoughtful amenities for parents and children alike. Enjoy the extra room to relax while keeping the little ones entertained and comfortable.",
      shortDescription: "Spacious comfort designed for the whole family.",
      capacity: 4,
      size: "48 sqm",
      bedType: "1 King + 2 Twin Beds",
      image: "/images/rooms/room-10/066.jpg",
      images: [
        "/images/rooms/room-10/066.jpg",
        "/images/rooms/room-10/067.jpg",
        "/images/rooms/room-10/068.jpg",
      ],
      amenities: ["Free Wi-Fi", "Air Conditioning", '50" Smart TV', "Mini Fridge", "Room Service", "Baby Cot Available", "Game Console", "Daily Housekeeping"],
      featured: false,
      sortOrder: 3,
    },
    {
      slug: "presidential-suite",
      name: "Presidential Suite",
      category: "presidential",
      price: 450,
      description: "The crown jewel of LIZGAT Hotel, our Presidential Suite offers unparalleled luxury across two floors. Featuring a grand living room, private dining area, and panoramic views of Accra, this suite redefines opulence. Every detail has been curated to provide an experience befitting royalty.",
      shortDescription: "Two floors of unparalleled luxury with panoramic city views.",
      capacity: 4,
      size: "120 sqm",
      bedType: "Super King Bed",
      image: "/images/rooms/room-11/077.jpg",
      images: [
        "/images/rooms/room-11/077.jpg",
        "/images/rooms/room-11/078.jpg",
        "/images/rooms/room-11/079.jpg",
      ],
      amenities: ["Free Wi-Fi", "Climate Control", '75" Smart TV', "Premium Mini Bar", "24/7 Butler Service", "Luxury Bathrobe & Slippers", "Private Dining Area", "Jacuzzi", "Walk-in Closet", "Grand Piano", "Private Balcony", "Espresso Machine"],
      featured: true,
      sortOrder: 4,
    },
    {
      slug: "honeymoon-suite",
      name: "Honeymoon Suite",
      category: "suite",
      price: 350,
      description: "Celebrate love in our exquisite Honeymoon Suite, where romance meets luxury. Rose-petal turndown service, couples' spa treatments, and a private balcony overlooking the gardens create the perfect setting for an unforgettable romantic getaway.",
      shortDescription: "Romance meets luxury for an unforgettable experience.",
      capacity: 2,
      size: "65 sqm",
      bedType: "King Bed with Canopy",
      image: "/images/rooms/room-14/089.jpg",
      images: [
        "/images/rooms/room-14/089.jpg",
        "/images/rooms/room-14/090.jpg",
        "/images/rooms/room-14/091.jpg",
      ],
      amenities: ["Free Wi-Fi", "Climate Control", '65" Smart TV', "Premium Mini Bar", "24/7 Room Service", "Luxury Bathrobe & Slippers", "Couples' Spa Access", "Jacuzzi", "Rose Petal Turndown", "Champagne Welcome", "Private Balcony"],
      featured: false,
      sortOrder: 5,
    },
  ];

  for (const room of roomsData) {
    await prisma.room.upsert({
      where: { slug: room.slug },
      update: {},
      create: room,
    });
  }
  console.log("Rooms seeded");

  // 3. Seed amenities
  const amenitiesData = [
    { amenityId: "pool", name: "Swimming Pool", description: "Dive into relaxation at our stunning outdoor infinity pool overlooking the cityscape. Open from 6 AM to 10 PM daily.", iconName: "Waves", image: "/images/environs/009.jpg", details: ["Outdoor infinity pool", "Poolside bar and snacks", "Sun loungers and cabanas", "Towel service", "Children's splash area", "Open daily 6 AM - 10 PM"], sortOrder: 0 },
    { amenityId: "spa", name: "Spa & Wellness", description: "Rejuvenate body and mind at our world-class spa, offering traditional Ghanaian treatments alongside modern wellness therapies.", iconName: "Sparkles", image: "/images/environs/014.jpg", details: ["Full-body massage treatments", "Facial and skin care", "Traditional shea butter therapy", "Steam room and sauna", "Couples' treatment rooms", "Yoga and meditation classes"], sortOrder: 1 },
    { amenityId: "gym", name: "Fitness Center", description: "Stay active during your stay with state-of-the-art equipment and professional trainers available upon request.", iconName: "Dumbbell", image: "/images/environs/015.jpg", details: ["Modern cardio equipment", "Free weights area", "Personal trainer available", "Yoga mats and equipment", "24/7 access for guests", "Fresh towels and water"], sortOrder: 2 },
    { amenityId: "restaurant", name: "Restaurant & Bar", description: "Savor exquisite cuisine from our award-winning chefs, blending Ghanaian flavors with international fine dining.", iconName: "UtensilsCrossed", image: "/images/restaurant/027.jpg", details: ["Breakfast buffet 6:30 - 10:30 AM", "All-day dining restaurant", "Rooftop bar with cocktails", "Traditional Ghanaian cuisine", "International menu", "Private dining available"], sortOrder: 3 },
    { amenityId: "conference", name: "Conference Rooms", description: "Host successful events in our versatile conference facilities equipped with the latest audiovisual technology.", iconName: "Users", image: "/images/conference/001.jpg", details: ["3 fully equipped meeting rooms", "Capacity up to 200 guests", "Projector and screen", "Video conferencing setup", "Catering services available", "Dedicated event coordinator"], sortOrder: 4 },
    { amenityId: "business", name: "Business Center", description: "Stay productive with our fully equipped business center offering printing, faxing, and private workspaces.", iconName: "Briefcase", image: "/images/reception/024.jpg", details: ["High-speed internet", "Printing and scanning", "Private meeting pods", "Administrative assistance", "Available 24/7", "Complimentary coffee and tea"], sortOrder: 5 },
    { amenityId: "shuttle", name: "Airport Shuttle", description: "Enjoy seamless transfers to and from Kotoka International Airport in our comfortable shuttle service.", iconName: "Plane", image: "/images/environs/006.jpg", details: ["Kotoka Airport transfers", "Luxury vehicle fleet", "Professional drivers", "Pre-booking available", "City tour arrangements", "24/7 availability"], sortOrder: 6 },
    { amenityId: "wifi", name: "Free High-Speed Wi-Fi", description: "Stay connected throughout your stay with complimentary high-speed wireless internet access in all areas.", iconName: "Wifi", image: "/images/reception/025.jpg", details: ["Complimentary for all guests", "Available in all rooms and public areas", "High-speed fiber connection", "Streaming-ready speeds", "Secure network", "Technical support available"], sortOrder: 7 },
    { amenityId: "concierge", name: "Concierge Service", description: "Our dedicated concierge team is available around the clock to assist with dining reservations, tours, and local experiences.", iconName: "ConciergeBell", image: "/images/reception/023.jpg", details: ["24/7 availability", "Restaurant reservations", "Tour and activity booking", "Transportation arrangements", "Special occasion planning", "Local area expertise"], sortOrder: 8 },
    { amenityId: "laundry", name: "Laundry Service", description: "Keep your wardrobe fresh with our professional same-day laundry and dry-cleaning service.", iconName: "WashingMachine", image: "/images/mart/017.jpg", details: ["Same-day service", "Dry cleaning available", "Express service", "Ironing and pressing", "Pickup from room", "Eco-friendly detergents"], sortOrder: 9 },
    { amenityId: "parking", name: "Valet Parking", description: "Enjoy hassle-free parking with our secure valet service, available for all hotel guests.", iconName: "Car", image: "/images/environs/008.jpg", details: ["Complimentary for guests", "Secure underground parking", "24/7 valet service", "EV charging stations", "CCTV monitored", "Easy access to lobby"], sortOrder: 10 },
    { amenityId: "security", name: "24/7 Security", description: "Your safety is our priority. Our professional security team ensures a safe and secure environment at all times.", iconName: "ShieldCheck", image: "/images/environs/007.jpg", details: ["Round-the-clock security personnel", "CCTV surveillance", "Electronic key card access", "In-room safe boxes", "Fire safety systems", "Emergency response team"], sortOrder: 11 },
  ];

  for (const amenity of amenitiesData) {
    await prisma.amenity.upsert({
      where: { amenityId: amenity.amenityId },
      update: {},
      create: amenity,
    });
  }
  console.log("Amenities seeded");

  // 4. Seed testimonials
  const testimonialsData = [
    { name: "Kwame Asante", location: "Accra, Ghana", rating: 5, text: "An absolutely exceptional experience from check-in to check-out. The staff went above and beyond to make our anniversary celebration truly special. The Presidential Suite was breathtaking!", avatar: "KA", sortOrder: 0 },
    { name: "Sarah Mitchell", location: "London, UK", rating: 5, text: "LIZGAT Hotel exceeded all expectations. The blend of Ghanaian hospitality with world-class service is remarkable. The spa treatments were divine, and the restaurant served the best jollof rice I've ever tasted.", avatar: "SM", sortOrder: 1 },
    { name: "David Osei", location: "Kumasi, Ghana", rating: 5, text: "Perfect for business travel. The conference facilities are top-notch, and the Executive Suite provided a wonderful space to relax after meetings. I'll definitely be returning on my next trip.", avatar: "DO", sortOrder: 2 },
    { name: "Aisha Johnson", location: "New York, USA", rating: 5, text: "What a gem in Accra! The pool area is stunning, the rooms are impeccably clean, and the concierge helped us plan the most amazing tour of the city. Highly recommended for any traveler!", avatar: "AJ", sortOrder: 3 },
    { name: "Emmanuel Mensah", location: "Cape Coast, Ghana", rating: 5, text: "We hosted our wedding reception at LIZGAT Hotel and it was absolutely magical. The event team handled everything flawlessly. Our guests are still talking about how wonderful it was!", avatar: "EM", sortOrder: 4 },
    { name: "Chen Wei", location: "Beijing, China", rating: 5, text: "Outstanding hospitality! From the moment we arrived, we felt welcomed and valued. The attention to detail in every aspect of the hotel is impressive. A true five-star experience in Ghana.", avatar: "CW", sortOrder: 5 },
  ];

  for (let i = 0; i < testimonialsData.length; i++) {
    await prisma.testimonial.create({ data: testimonialsData[i] });
  }
  console.log("Testimonials seeded");

  // 5. Seed gallery images
  const galleryData = [
    { src: "/images/environs/005.jpg", alt: "Hotel exterior view", category: "exterior", width: 800, height: 600, sortOrder: 0 },
    { src: "/images/rooms/room-2/036.jpg", alt: "Standard room interior", category: "rooms", width: 800, height: 533, sortOrder: 1 },
    { src: "/images/environs/010.jpg", alt: "Hotel surroundings", category: "exterior", width: 800, height: 534, sortOrder: 2 },
    { src: "/images/restaurant/027.jpg", alt: "Restaurant and dining area", category: "dining", width: 800, height: 533, sortOrder: 3 },
    { src: "/images/conference/001.jpg", alt: "Conference hall setup", category: "events", width: 800, height: 533, sortOrder: 4 },
    { src: "/images/rooms/room-4/045.jpg", alt: "Deluxe room interior", category: "rooms", width: 800, height: 534, sortOrder: 5 },
    { src: "/images/reception/023.jpg", alt: "Hotel reception", category: "exterior", width: 800, height: 533, sortOrder: 6 },
    { src: "/images/environs/012.jpg", alt: "Hotel entrance", category: "exterior", width: 800, height: 533, sortOrder: 7 },
    { src: "/images/rooms/room-7/055.jpg", alt: "Executive suite living room", category: "rooms", width: 800, height: 533, sortOrder: 8 },
    { src: "/images/restaurant/030.jpg", alt: "Bar and lounge area", category: "dining", width: 800, height: 533, sortOrder: 9 },
    { src: "/images/conference/003.jpg", alt: "Conference room", category: "events", width: 800, height: 533, sortOrder: 10 },
    { src: "/images/rooms/room-14/089.jpg", alt: "Honeymoon suite", category: "rooms", width: 800, height: 533, sortOrder: 11 },
  ];

  for (const img of galleryData) {
    await prisma.galleryImage.create({ data: img });
  }
  console.log("Gallery images seeded");

  // 6. Seed menu items
  const menuData = [
    { category: "Breakfast", iconName: "Coffee", time: "6:30 AM - 10:30 AM", items: ["Continental & Full English Breakfast", "Traditional Ghanaian Breakfast (Waakye, Hausa Koko)", "Fresh Tropical Fruits & Juices", "Pastries & Freshly Baked Bread", "Eggs to Order"], sortOrder: 0 },
    { category: "Lunch", iconName: "UtensilsCrossed", time: "12:00 PM - 3:00 PM", items: ["Jollof Rice with Grilled Chicken", "Grilled Tilapia with Banku", "Caesar Salad with Prawns", "Gourmet Burgers & Sandwiches", "Chef's Special of the Day"], sortOrder: 1 },
    { category: "Dinner", iconName: "UtensilsCrossed", time: "6:30 PM - 10:30 PM", items: ["Pan-Seared Atlantic Salmon", "Grilled Lamb Chops with Herbs", "Fufu with Light Soup", "Lobster Thermidor", "Vegetarian Risotto"], sortOrder: 2 },
    { category: "Bar & Cocktails", iconName: "Wine", time: "4:00 PM - Midnight", items: ["Signature Cocktails", "Premium Wines & Champagne", "Craft Beers & Local Brews", "Mocktails & Fresh Juices", "Bar Snacks & Tapas"], sortOrder: 3 },
  ];

  for (const menu of menuData) {
    await prisma.menuItem.create({ data: menu });
  }
  console.log("Menu items seeded");

  // 7. Seed site settings
  const settings = [
    { key: "hotel_name", value: "LIZGAT Hotel", group: "general" },
    { key: "hotel_tagline", value: "Luxury Accommodation in Accra, Ghana", group: "general" },
    { key: "address", value: "12 Liberation Road, Airport Residential Area, Accra, Ghana", group: "contact" },
    { key: "phone", value: "+233 30 277 5500", group: "contact" },
    { key: "whatsapp", value: "+233 20 123 4567", group: "contact" },
    { key: "email", value: "info@lizgathotel.com", group: "contact" },
    { key: "reservations_email", value: "reservations@lizgathotel.com", group: "contact" },
    { key: "facebook", value: "#", group: "social" },
    { key: "instagram", value: "#", group: "social" },
    { key: "twitter", value: "#", group: "social" },
    { key: "meta_title", value: "LIZGAT Hotel | Luxury Accommodation in Accra, Ghana", group: "seo" },
    { key: "meta_description", value: "Experience luxury at LIZGAT Hotel in Accra, Ghana. Premium rooms, world-class dining, spa & wellness, and exceptional hospitality.", group: "seo" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("Site settings seeded");

  // 8. Seed page content
  const pageContent = [
    {
      page: "about",
      section: "story",
      content: JSON.stringify({
        title: "Our Story",
        subtitle: "A Legacy of Luxury",
        text: "Founded in 2020, LIZGAT Hotel was born from a vision to create a world-class luxury destination in the heart of Accra. Our founders, inspired by Ghana's rich cultural heritage and warm hospitality traditions, set out to build a hotel that would seamlessly blend African elegance with modern luxury.\n\nToday, LIZGAT Hotel stands as a testament to that vision. Every corner of our establishment reflects our commitment to excellence, from the carefully curated art pieces that adorn our walls to the locally sourced ingredients in our restaurant.",
        image: "/images/environs/005.jpg",
      }),
      sortOrder: 0,
    },
    {
      page: "about",
      section: "values",
      content: JSON.stringify([
        { icon: "Heart", title: "Warm Hospitality", description: "We treat every guest as family, ensuring a warm, personalized experience that reflects the best of Ghanaian hospitality." },
        { icon: "Award", title: "Excellence", description: "We strive for perfection in every detail, from room preparation to dining service, maintaining the highest standards." },
        { icon: "Globe", title: "Cultural Pride", description: "We celebrate Ghana's rich culture and traditions, integrating local art, cuisine, and customs into the guest experience." },
        { icon: "Shield", title: "Trust & Safety", description: "Your safety and privacy are paramount. We maintain rigorous security standards and respect guest confidentiality." },
      ]),
      sortOrder: 1,
    },
    {
      page: "about",
      section: "milestones",
      content: JSON.stringify([
        { year: 2020, title: "Grand Opening", description: "LIZGAT Hotel opens its doors, welcoming its first guests with 80 luxury rooms." },
        { year: 2021, title: "Spa & Wellness Launch", description: "Opening of our world-class spa featuring traditional Ghanaian treatments." },
        { year: 2022, title: "Culinary Excellence Award", description: "Our restaurant receives the Ghana Hospitality Award for Best Hotel Dining." },
        { year: 2023, title: "Expansion Complete", description: "Addition of 70 new rooms including the iconic Presidential Suite." },
        { year: 2024, title: "5-Star Recognition", description: "Awarded official 5-star rating by the Ghana Tourism Authority." },
        { year: 2025, title: "Sustainability Initiative", description: "Launch of our green initiative with solar power and water recycling systems." },
      ]),
      sortOrder: 2,
    },
    {
      page: "home",
      section: "hero",
      content: JSON.stringify({
        title: "Experience Luxury in the Heart of Accra",
        subtitle: "Welcome to LIZGAT Hotel",
        description: "Where Ghanaian hospitality meets world-class luxury",
      }),
      sortOrder: 0,
    },
    {
      page: "home",
      section: "welcome",
      content: JSON.stringify({
        subtitle: "Welcome to LIZGAT",
        title: "A New Standard of Luxury in Ghana",
        text: "Nestled in the prestigious Airport Residential Area of Accra, LIZGAT Hotel redefines luxury hospitality in West Africa. Our commitment to excellence is reflected in every detail, from our meticulously designed rooms to our award-winning culinary experiences.",
        stats: [
          { value: 150, suffix: "+", label: "Luxury Rooms" },
          { value: 50, suffix: "K+", label: "Happy Guests" },
          { value: 15, suffix: "+", label: "Awards Won" },
        ],
      }),
      sortOrder: 1,
    },
    {
      page: "home",
      section: "cta",
      content: JSON.stringify({
        title: "Ready for an Unforgettable Experience?",
        description: "Book your stay at LIZGAT Hotel and discover the perfect blend of luxury, comfort, and Ghanaian hospitality.",
      }),
      sortOrder: 2,
    },
  ];

  for (const content of pageContent) {
    await prisma.pageContent.upsert({
      where: { page_section: { page: content.page, section: content.section } },
      update: { content: content.content },
      create: content,
    });
  }
  console.log("Page content seeded");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

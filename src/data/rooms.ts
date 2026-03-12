export interface Room {
  id?: string;
  slug: string;
  name: string;
  category: "standard" | "deluxe" | "suite" | "presidential" | string;
  price: number;
  description: string;
  shortDescription: string;
  capacity: number;
  size: string;
  bedType: string;
  image: string;
  images: string[];
  amenities: string[];
  featured?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export const rooms: Room[] = [
  {
    slug: "standard-room",
    name: "Standard Room",
    category: "standard",
    price: 120,
    description:
      "Our Standard Room offers a comfortable retreat with modern amenities, perfect for both business and leisure travelers. Enjoy a restful night's sleep on our premium mattress, surrounded by tasteful African-inspired decor that celebrates Ghana's rich cultural heritage.",
    shortDescription:
      "A comfortable retreat with modern amenities for the discerning traveler.",
    capacity: 2,
    size: "28 sqm",
    bedType: "Queen Bed",
    image: "/images/rooms/room-2/036.jpg",
    images: [
      "/images/rooms/room-2/036.jpg",
      "/images/rooms/room-2/037.jpg",
      "/images/rooms/room-2/038.jpg",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Flat Screen TV",
      "Mini Bar",
      "Room Service",
      "Daily Housekeeping",
    ],
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    category: "deluxe",
    price: 180,
    description:
      "Step into luxury with our Deluxe Room, featuring expanded living space, premium furnishings, and stunning views of Accra. The room blends contemporary comfort with authentic Ghanaian artistry, creating an unforgettable stay experience.",
    shortDescription:
      "Expanded luxury with premium furnishings and city views.",
    capacity: 2,
    size: "38 sqm",
    bedType: "King Bed",
    image: "/images/rooms/room-4/045.jpg",
    images: [
      "/images/rooms/room-4/045.jpg",
      "/images/rooms/room-4/046.jpg",
      "/images/rooms/room-4/047.jpg",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "55\" Smart TV",
      "Mini Bar",
      "Room Service",
      "Bathrobe & Slippers",
      "Coffee Machine",
      "Safe Box",
    ],
    featured: true,
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    category: "suite",
    price: 280,
    description:
      "Our Executive Suite is designed for those who demand the finest. With a separate living area, work desk, and premium bathroom amenities, this suite is perfect for extended stays or business travelers who want to unwind in style.",
    shortDescription:
      "Separate living area and workspace for the executive traveler.",
    capacity: 3,
    size: "55 sqm",
    bedType: "King Bed",
    image: "/images/rooms/room-7/055.jpg",
    images: [
      "/images/rooms/room-7/055.jpg",
      "/images/rooms/room-7/056.jpg",
      "/images/rooms/room-7/057.jpg",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "65\" Smart TV",
      "Full Mini Bar",
      "24/7 Room Service",
      "Bathrobe & Slippers",
      "Espresso Machine",
      "Safe Box",
      "Work Desk",
      "Living Area",
    ],
    featured: true,
  },
  {
    slug: "family-room",
    name: "Family Room",
    category: "deluxe",
    price: 220,
    description:
      "Designed with families in mind, our Family Room offers generous space and thoughtful amenities for parents and children alike. Enjoy the extra room to relax while keeping the little ones entertained and comfortable.",
    shortDescription:
      "Spacious comfort designed for the whole family.",
    capacity: 4,
    size: "48 sqm",
    bedType: "1 King + 2 Twin Beds",
    image: "/images/rooms/room-10/066.jpg",
    images: [
      "/images/rooms/room-10/066.jpg",
      "/images/rooms/room-10/067.jpg",
      "/images/rooms/room-10/068.jpg",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "50\" Smart TV",
      "Mini Fridge",
      "Room Service",
      "Baby Cot Available",
      "Game Console",
      "Daily Housekeeping",
    ],
  },
  {
    slug: "presidential-suite",
    name: "Presidential Suite",
    category: "presidential",
    price: 450,
    description:
      "The crown jewel of LIZGAT Hotel, our Presidential Suite offers unparalleled luxury across two floors. Featuring a grand living room, private dining area, and panoramic views of Accra, this suite redefines opulence. Every detail has been curated to provide an experience befitting royalty.",
    shortDescription:
      "Two floors of unparalleled luxury with panoramic city views.",
    capacity: 4,
    size: "120 sqm",
    bedType: "Super King Bed",
    image: "/images/rooms/room-11/077.jpg",
    images: [
      "/images/rooms/room-11/077.jpg",
      "/images/rooms/room-11/078.jpg",
      "/images/rooms/room-11/079.jpg",
    ],
    amenities: [
      "Free Wi-Fi",
      "Climate Control",
      "75\" Smart TV",
      "Premium Mini Bar",
      "24/7 Butler Service",
      "Luxury Bathrobe & Slippers",
      "Private Dining Area",
      "Jacuzzi",
      "Walk-in Closet",
      "Grand Piano",
      "Private Balcony",
      "Espresso Machine",
    ],
    featured: true,
  },
  {
    slug: "honeymoon-suite",
    name: "Honeymoon Suite",
    category: "suite",
    price: 350,
    description:
      "Celebrate love in our exquisite Honeymoon Suite, where romance meets luxury. Rose-petal turndown service, couples' spa treatments, and a private balcony overlooking the gardens create the perfect setting for an unforgettable romantic getaway.",
    shortDescription:
      "Romance meets luxury for an unforgettable experience.",
    capacity: 2,
    size: "65 sqm",
    bedType: "King Bed with Canopy",
    image: "/images/rooms/room-14/089.jpg",
    images: [
      "/images/rooms/room-14/089.jpg",
      "/images/rooms/room-14/090.jpg",
      "/images/rooms/room-14/091.jpg",
    ],
    amenities: [
      "Free Wi-Fi",
      "Climate Control",
      "65\" Smart TV",
      "Premium Mini Bar",
      "24/7 Room Service",
      "Luxury Bathrobe & Slippers",
      "Couples' Spa Access",
      "Jacuzzi",
      "Rose Petal Turndown",
      "Champagne Welcome",
      "Private Balcony",
    ],
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}

export function getFeaturedRooms(): Room[] {
  return rooms.filter((r) => r.featured);
}

export function getRoomsByCategory(category: string): Room[] {
  if (category === "all") return rooms;
  return rooms.filter((r) => r.category === category);
}

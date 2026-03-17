import {
  UtensilsCrossed,
  Users,
  Briefcase,
  Wifi,
  ConciergeBell,
  WashingMachine,
  Car,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  image: string;
  details: string[];
}

export const amenities: Amenity[] = [
  {
    id: "restaurant",
    name: "Restaurant & Bar",
    description:
      "Savor exquisite cuisine from our award-winning chefs, blending Ghanaian flavors with international fine dining.",
    icon: UtensilsCrossed,
    image: "/images/restaurant/027.jpg",
    details: [
      "Breakfast buffet 6:30 - 10:30 AM",
      "All-day dining restaurant",
      "Rooftop bar with cocktails",
      "Traditional Ghanaian cuisine",
      "International menu",
      "Private dining available",
    ],
  },
  {
    id: "conference",
    name: "Conference Rooms",
    description:
      "Host successful events in our versatile conference facilities equipped with the latest audiovisual technology.",
    icon: Users,
    image: "/images/conference/001.jpg",
    details: [
      "3 fully equipped meeting rooms",
      "Capacity up to 200 guests",
      "Projector and screen",
      "Video conferencing setup",
      "Catering services available",
      "Dedicated event coordinator",
    ],
  },
  {
    id: "business",
    name: "Business Center",
    description:
      "Stay productive with our fully equipped business center offering printing, faxing, and private workspaces.",
    icon: Briefcase,
    image: "/images/reception/024.jpg",
    details: [
      "High-speed internet",
      "Printing and scanning",
      "Private meeting pods",
      "Administrative assistance",
      "Available 24/7",
      "Complimentary coffee and tea",
    ],
  },
  {
    id: "wifi",
    name: "Free High-Speed Wi-Fi",
    description:
      "Stay connected throughout your stay with complimentary high-speed wireless internet access in all areas.",
    icon: Wifi,
    image: "/images/reception/025.jpg",
    details: [
      "Complimentary for all guests",
      "Available in all rooms and public areas",
      "High-speed fiber connection",
      "Streaming-ready speeds",
      "Secure network",
      "Technical support available",
    ],
  },
  {
    id: "concierge",
    name: "Concierge Service",
    description:
      "Our dedicated concierge team is available around the clock to assist with dining reservations, tours, and local experiences.",
    icon: ConciergeBell,
    image: "/images/reception/023.jpg",
    details: [
      "24/7 availability",
      "Restaurant reservations",
      "Tour and activity booking",
      "Transportation arrangements",
      "Special occasion planning",
      "Local area expertise",
    ],
  },
  {
    id: "laundry",
    name: "Laundry Service",
    description:
      "Keep your wardrobe fresh with our professional same-day laundry and dry-cleaning service.",
    icon: WashingMachine,
    image: "/images/mart/017.jpg",
    details: [
      "Same-day service",
      "Dry cleaning available",
      "Express service",
      "Ironing and pressing",
      "Pickup from room",
      "Eco-friendly detergents",
    ],
  },
  {
    id: "parking",
    name: "Valet Parking",
    description:
      "Enjoy hassle-free parking with our secure valet service, available for all hotel guests.",
    icon: Car,
    image: "/images/environs/008.jpg",
    details: [
      "Complimentary for guests",
      "Secure underground parking",
      "24/7 valet service",
      "EV charging stations",
      "CCTV monitored",
      "Easy access to lobby",
    ],
  },
  {
    id: "security",
    name: "24/7 Security",
    description:
      "Your safety is our priority. Our professional security team ensures a safe and secure environment at all times.",
    icon: ShieldCheck,
    image: "/images/environs/007.jpg",
    details: [
      "Round-the-clock security personnel",
      "CCTV surveillance",
      "Electronic key card access",
      "In-room safe boxes",
      "Fire safety systems",
      "Emergency response team",
    ],
  },
];

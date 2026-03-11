import {
  Waves,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  Users,
  Briefcase,
  Plane,
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
    id: "pool",
    name: "Swimming Pool",
    description:
      "Dive into relaxation at our stunning outdoor infinity pool overlooking the cityscape. Open from 6 AM to 10 PM daily.",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    details: [
      "Outdoor infinity pool",
      "Poolside bar and snacks",
      "Sun loungers and cabanas",
      "Towel service",
      "Children's splash area",
      "Open daily 6 AM - 10 PM",
    ],
  },
  {
    id: "spa",
    name: "Spa & Wellness",
    description:
      "Rejuvenate body and mind at our world-class spa, offering traditional Ghanaian treatments alongside modern wellness therapies.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    details: [
      "Full-body massage treatments",
      "Facial and skin care",
      "Traditional shea butter therapy",
      "Steam room and sauna",
      "Couples' treatment rooms",
      "Yoga and meditation classes",
    ],
  },
  {
    id: "gym",
    name: "Fitness Center",
    description:
      "Stay active during your stay with state-of-the-art equipment and professional trainers available upon request.",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    details: [
      "Modern cardio equipment",
      "Free weights area",
      "Personal trainer available",
      "Yoga mats and equipment",
      "24/7 access for guests",
      "Fresh towels and water",
    ],
  },
  {
    id: "restaurant",
    name: "Restaurant & Bar",
    description:
      "Savor exquisite cuisine from our award-winning chefs, blending Ghanaian flavors with international fine dining.",
    icon: UtensilsCrossed,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
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
    id: "shuttle",
    name: "Airport Shuttle",
    description:
      "Enjoy seamless transfers to and from Kotoka International Airport in our comfortable shuttle service.",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1449965408869-ebd13bc7d0e6?w=800&q=80",
    details: [
      "Kotoka Airport transfers",
      "Luxury vehicle fleet",
      "Professional drivers",
      "Pre-booking available",
      "City tour arrangements",
      "24/7 availability",
    ],
  },
  {
    id: "wifi",
    name: "Free High-Speed Wi-Fi",
    description:
      "Stay connected throughout your stay with complimentary high-speed wireless internet access in all areas.",
    icon: Wifi,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amenities",
  description:
    "Discover amenities at LIZGAT Hotel in Accra, Ghana. Restaurant & bar, conference rooms, business center, valet parking, concierge service, laundry, free high-speed Wi-Fi, and 24/7 security.",
  openGraph: {
    title: "Amenities | LIZGAT Hotel",
    description:
      "World-class amenities at LIZGAT Hotel, Accra. Restaurant, conference rooms, business center, and more.",
  },
  alternates: {
    canonical: "https://lizgathotel.com/amenities",
  },
};

export default function AmenitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

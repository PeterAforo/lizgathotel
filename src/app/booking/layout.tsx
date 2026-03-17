import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Book your luxury stay at LIZGAT Hotel in Accra, Ghana. Choose from 6 room types starting at $120/night. Free cancellation up to 48 hours, breakfast included, and complimentary Wi-Fi.",
  openGraph: {
    title: "Book Your Stay | LIZGAT Hotel",
    description:
      "Book your luxury stay at LIZGAT Hotel in Accra. Rooms from $120/night with free cancellation.",
  },
  alternates: {
    canonical: "https://lizgathotel.com/booking",
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

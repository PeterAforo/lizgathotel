import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Explore luxury rooms and suites at LIZGAT Hotel in Accra, Ghana. From Standard Rooms at $120/night to the Presidential Suite at $450/night. Free Wi-Fi, breakfast included, and exceptional Ghanaian hospitality.",
  openGraph: {
    title: "Rooms & Suites | LIZGAT Hotel",
    description:
      "Explore luxury rooms and suites at LIZGAT Hotel in Accra. Standard, Deluxe, Executive, Family, Honeymoon, and Presidential suites available.",
  },
  alternates: {
    canonical: "https://lizgathotel.com/rooms",
  },
};

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

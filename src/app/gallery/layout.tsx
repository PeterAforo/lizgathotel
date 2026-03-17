import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of LIZGAT Hotel in Accra, Ghana. View our luxury rooms, restaurant, conference facilities, hotel environs, and more. See why guests love staying with us.",
  openGraph: {
    title: "Gallery | LIZGAT Hotel",
    description:
      "Browse photos of LIZGAT Hotel — luxury rooms, dining, and facilities in Accra, Ghana.",
  },
  alternates: {
    canonical: "https://lizgathotel.com/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

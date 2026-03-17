import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Enjoy world-class dining at LIZGAT Hotel in Accra, Ghana. Traditional Ghanaian cuisine and international fine dining. Breakfast buffet, rooftop bar, 24/7 room service, and private dining available.",
  openGraph: {
    title: "Dining | LIZGAT Hotel",
    description:
      "Traditional Ghanaian cuisine and international fine dining at LIZGAT Hotel, Accra.",
  },
  alternates: {
    canonical: "https://lizgathotel.com/dining",
  },
};

export default function DiningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

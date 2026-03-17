import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about LIZGAT Hotel — a luxury boutique hotel founded in 2020 in Airport Residential Area, Accra, Ghana. Discover our story, values, and commitment to exceptional Ghanaian hospitality.",
  openGraph: {
    title: "About Us | LIZGAT Hotel",
    description:
      "The story behind LIZGAT Hotel — luxury Ghanaian hospitality since 2020.",
  },
  alternates: {
    canonical: "https://lizgathotel.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

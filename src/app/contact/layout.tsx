import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact LIZGAT Hotel in Accra, Ghana. Call +233 24 548 2078, email info@lizgathotel.com, or visit us at 12 Liberation Road, Airport Residential Area. We're available 24/7.",
  openGraph: {
    title: "Contact Us | LIZGAT Hotel",
    description:
      "Get in touch with LIZGAT Hotel. Call, email, or visit us in Airport Residential Area, Accra.",
  },
  alternates: {
    canonical: "https://lizgathotel.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

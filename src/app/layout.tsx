import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { headers } from "next/headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LIZGAT Hotel | Luxury Accommodation in Accra, Ghana",
    template: "%s | LIZGAT Hotel",
  },
  description:
    "Experience luxury at LIZGAT Hotel in Accra, Ghana. Premium rooms, world-class dining, spa & wellness, and exceptional hospitality in the heart of Airport Residential Area.",
  keywords: [
    "luxury hotel",
    "Accra hotel",
    "Ghana hotel",
    "LIZGAT Hotel",
    "Airport Residential Area",
    "5-star hotel",
    "Accra accommodation",
  ],
  openGraph: {
    title: "LIZGAT Hotel | Luxury Accommodation in Accra, Ghana",
    description:
      "Experience luxury at LIZGAT Hotel in Accra, Ghana. Premium rooms, world-class dining, spa & wellness, and exceptional hospitality.",
    type: "website",
    locale: "en_GH",
    siteName: "LIZGAT Hotel",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {!isAdmin && <Navbar />}
        <main>{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <ChatbotWidget />}
      </body>
    </html>
  );
}

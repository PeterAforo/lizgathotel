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

const SITE_URL = "https://lizgathotel.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LIZGAT Hotel | Luxury Boutique Hotel in Accra, Ghana",
    template: "%s | LIZGAT Hotel",
  },
  description:
    "Experience luxury at LIZGAT Hotel in Airport Residential Area, Accra, Ghana. Premium rooms from $120/night, world-class dining, conference facilities, and exceptional Ghanaian hospitality. Book direct for best rates.",
  keywords: [
    "LIZGAT Hotel",
    "luxury hotel Accra",
    "hotel in Accra Ghana",
    "Airport Residential Area hotel",
    "boutique hotel Accra",
    "Accra accommodation",
    "Ghana hotel booking",
    "hotel near Kotoka airport",
    "conference hotel Accra",
    "best hotel in Accra",
    "Accra Ghana rooms",
    "Liberation Road hotel",
  ],
  authors: [{ name: "LIZGAT Hotel" }],
  creator: "McAforo",
  publisher: "LIZGAT Hotel",
  icons: {
    icon: "/images/logos/favicon.png",
    apple: "/images/logos/favicon.png",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "LIZGAT Hotel | Luxury Boutique Hotel in Accra, Ghana",
    description:
      "Premium rooms, world-class dining, conference facilities, and exceptional Ghanaian hospitality in the heart of Accra. Book direct for best rates.",
    url: SITE_URL,
    type: "website",
    locale: "en_GH",
    siteName: "LIZGAT Hotel",
    images: [
      {
        url: "/images/environs/009.jpg",
        width: 1200,
        height: 630,
        alt: "LIZGAT Hotel - Luxury Accommodation in Accra, Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LIZGAT Hotel | Luxury Boutique Hotel in Accra, Ghana",
    description:
      "Premium rooms, world-class dining, and exceptional Ghanaian hospitality. Book direct for best rates.",
    images: ["/images/environs/009.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "add-your-google-verification-code",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "LIZGAT Hotel",
    description:
      "Luxury boutique hotel in Airport Residential Area, Accra, Ghana offering premium rooms, world-class dining, and conference facilities.",
    url: SITE_URL,
    telephone: "+233245482078",
    email: "info@lizgathotel.com",
    image: `${SITE_URL}/images/environs/009.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "12 Liberation Road, Airport Residential Area",
      addressLocality: "Accra",
      addressRegion: "Greater Accra",
      addressCountry: "GH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 5.5913,
      longitude: -0.1743,
    },
    starRating: {
      "@type": "Rating",
      ratingValue: "4",
    },
    priceRange: "$120 - $450",
    checkinTime: "14:00",
    checkoutTime: "12:00",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "Conference Rooms", value: true },
      { "@type": "LocationFeatureSpecification", name: "Valet Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Concierge Service", value: true },
      { "@type": "LocationFeatureSpecification", name: "Laundry Service", value: true },
      { "@type": "LocationFeatureSpecification", name: "Room Service", value: true },
      { "@type": "LocationFeatureSpecification", name: "Business Center", value: true },
    ],
    numberOfRooms: 6,
    petsAllowed: false,
  };

  return (
    <html lang="en">
      <head>
        {!isAdmin && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </head>
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

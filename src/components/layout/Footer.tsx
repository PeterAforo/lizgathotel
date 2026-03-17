"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const quickLinks = [
  { href: "/rooms", label: "Rooms & Suites" },
  { href: "/dining", label: "Dining" },
  { href: "/amenities", label: "Amenities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Book Now" },
];

const services = [
  "Conference Rooms",
  "Restaurant & Bar",
  "Business Center",
  "Concierge Service",
  "Valet Parking",
  "Laundry Service",
  "Free High-Speed Wi-Fi",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      console.error("Newsletter subscribe error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-dark text-white">
      {/* Newsletter Bar */}
      <div className="border-b border-white/10 bg-dark-lighter">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
          <div>
            <h3 className="font-sans text-xl font-bold">
              Subscribe to Our Newsletter
            </h3>
            <p className="font-body text-sm text-gray">
              Get exclusive deals and updates delivered to your inbox.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-md gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-sm border border-white/20 bg-white/5 px-4 py-2.5 font-body text-sm text-white placeholder:text-gray focus:border-primary focus:outline-none"
              required
            />
            <button
              type="submit"
              className="rounded-sm bg-primary px-6 py-2.5 font-body text-sm font-semibold text-dark transition-colors hover:bg-primary-dark"
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary bg-primary/10">
                <span className="font-sans text-xl font-bold text-primary">
                  L
                </span>
              </div>
              <div>
                <h2 className="font-sans text-xl font-bold tracking-wider">
                  LIZGAT
                </h2>
                <p className="-mt-1 font-body text-[10px] uppercase tracking-[0.3em] text-primary">
                  Hotel
                </p>
              </div>
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-gray">
              Experience luxury and Ghanaian hospitality at its finest. LIZGAT
              Hotel offers world-class accommodations in the heart of Accra.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 text-gray transition-all hover:border-primary hover:bg-primary hover:text-dark"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-sans text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 font-body text-sm text-gray transition-colors hover:text-primary"
                  >
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-1"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 font-sans text-lg font-bold">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-2 font-body text-sm text-gray"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-sans text-lg font-bold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span className="font-body text-sm text-gray">
                  12 Liberation Road, Airport Residential Area, Accra, Ghana
                </span>
              </li>
              <li>
                <a
                  href="tel:+233302775500"
                  className="flex items-center gap-3 font-body text-sm text-gray transition-colors hover:text-primary"
                >
                  <Phone size={18} className="shrink-0 text-primary" />
                  +233 30 277 5500
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@lizgathotel.com"
                  className="flex items-center gap-3 font-body text-sm text-gray transition-colors hover:text-primary"
                >
                  <Mail size={18} className="shrink-0 text-primary" />
                  info@lizgathotel.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <p className="font-body text-sm text-gray">
            &copy; {new Date().getFullYear()} LIZGAT Hotel. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy-policy"
              className="font-body text-sm text-gray transition-colors hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="font-body text-sm text-gray transition-colors hover:text-primary"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/dining", label: "Dining" },
  { href: "/amenities", label: "Amenities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-dark/95 py-3 shadow-lg backdrop-blur-md"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary bg-primary/10">
            <span className="font-sans text-xl font-bold text-primary">L</span>
          </div>
          <div>
            <h1 className="font-sans text-xl font-bold tracking-wider text-white">
              LIZGAT
            </h1>
            <p className="-mt-1 font-body text-[10px] uppercase tracking-[0.3em] text-primary">
              Hotel
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-body text-sm font-medium uppercase tracking-wider transition-colors duration-300",
                pathname === link.href
                  ? "text-primary"
                  : "text-white/80 hover:text-primary"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="mt-1 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+233302775500"
            className="flex items-center gap-2 font-body text-sm text-white/80 transition-colors hover:text-primary"
          >
            <Phone size={14} />
            +233 30 277 5500
          </a>
          <Link
            href="/booking"
            className="rounded-sm bg-primary px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-wider text-dark transition-all duration-300 hover:bg-primary-dark"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-dark/95 backdrop-blur-md lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block font-body text-lg font-medium uppercase tracking-wider transition-colors",
                        pathname === link.href
                          ? "text-primary"
                          : "text-white/80 hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-4 border-t border-white/10 pt-4">
                  <Link
                    href="/booking"
                    className="block w-full rounded-sm bg-primary py-3 text-center font-body font-semibold uppercase tracking-wider text-dark"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

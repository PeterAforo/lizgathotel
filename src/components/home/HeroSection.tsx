"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const heroImages = [
  "/images/environs/005.jpg",
  "/images/environs/009.jpg",
  "/images/environs/011.jpg",
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;
    const tl = gsap.timeline();

    tl.from(textRef.current.querySelectorAll(".hero-line"), {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    });

    tl.from(
      textRef.current.querySelectorAll(".hero-fade"),
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="h-full w-full"
        >
          <img
            src={heroImages[0]}
            alt="LIZGAT Hotel"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark/80" />
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <div className="overflow-hidden">
          <p className="hero-line font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Welcome to
          </p>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line mt-4 font-sans text-5xl font-bold text-white md:text-7xl lg:text-8xl">
            LIZGAT Hotel
          </h1>
        </div>
        <div className="overflow-hidden">
          <p className="hero-line mt-2 font-sans text-xl text-primary-light md:text-2xl">
            Luxury &amp; Elegance in the Heart of Accra
          </p>
        </div>

        <div className="hero-fade mt-4 flex items-center gap-2">
          <div className="h-[1px] w-16 bg-primary/50" />
          <div className="h-2 w-2 rotate-45 border border-primary/50" />
          <div className="h-[1px] w-16 bg-primary/50" />
        </div>

        <p className="hero-fade mt-6 max-w-xl font-body text-base text-white/70 md:text-lg">
          Experience world-class hospitality, exquisite dining, and
          unforgettable moments in Ghana&apos;s premier luxury destination.
        </p>

        <div className="hero-fade mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/booking"
            className="rounded-sm bg-primary px-8 py-4 font-body text-sm font-bold uppercase tracking-wider text-dark transition-all duration-300 hover:bg-primary-dark"
          >
            Reserve Your Stay
          </Link>
          <Link
            href="/rooms"
            className="rounded-sm border-2 border-white/30 px-8 py-4 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-primary hover:text-primary"
          >
            Explore Rooms
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="text-primary" size={28} />
      </motion.div>

      {/* Side Text */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <p className="origin-bottom-right rotate-90 font-body text-xs uppercase tracking-[0.3em] text-white/40">
          Accra, Ghana &mdash; Est. 2020
        </p>
      </div>
    </section>
  );
}

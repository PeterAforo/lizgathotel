"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!bgRef.current || !sectionRef.current) return;

    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <img
        ref={bgRef}
        src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
        alt="LIZGAT Hotel pool"
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-dark/70" />
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <h2 className="font-sans text-3xl font-bold text-white md:text-5xl">
          Ready for an Unforgettable Stay?
        </h2>
        <p className="mt-4 max-w-xl font-body text-base text-white/70 md:text-lg">
          Book your luxury escape today and experience the finest hospitality
          Ghana has to offer.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/booking"
            className="rounded-sm bg-primary px-10 py-4 font-body text-sm font-bold uppercase tracking-wider text-dark transition-all duration-300 hover:bg-primary-dark"
          >
            Book Your Stay
          </Link>
          <Link
            href="/contact"
            className="rounded-sm border-2 border-white/30 px-10 py-4 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-primary hover:text-primary"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

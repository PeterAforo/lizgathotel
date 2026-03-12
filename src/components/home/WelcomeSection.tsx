"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!statsRef.current) return;

    const counters = statsRef.current.querySelectorAll(".stat-number");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0");
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section className="bg-cream py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image Side */}
          <AnimatedSection animation="fadeLeft">
            <div className="relative">
              <div className="relative z-10 overflow-hidden">
                <img
                  src="/images/environs/006.jpg"
                  alt="LIZGAT Hotel exterior"
                  className="h-[500px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 z-0 h-full w-full border-2 border-primary" />
              <div className="absolute -bottom-4 left-4 z-20 bg-dark p-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="mt-1 font-body text-xs text-white/70">
                  5-Star Luxury Hotel
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Text Side */}
          <AnimatedSection animation="fadeRight">
            <span className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Welcome to LIZGAT Hotel
            </span>
            <h2 className="mt-3 font-sans text-3xl font-bold text-dark md:text-4xl lg:text-5xl">
              A Legacy of Luxury in Ghana
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-[1px] w-12 bg-primary" />
              <div className="h-2 w-2 rotate-45 bg-primary" />
            </div>
            <p className="mt-6 font-body text-base leading-relaxed text-gray-dark">
              Nestled in the vibrant heart of Accra, LIZGAT Hotel stands as a
              beacon of luxury and Ghanaian hospitality. Since our founding, we
              have been dedicated to providing our guests with an unparalleled
              experience that blends world-class comfort with the warmth and
              richness of West African culture.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-gray-dark">
              From our elegantly appointed rooms to our award-winning restaurant,
              every detail at LIZGAT Hotel has been thoughtfully curated to
              ensure your stay is nothing short of extraordinary.
            </p>

            <div className="mt-8">
              <Button href="/about" variant="outline">
                Discover Our Story
              </Button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-cream-dark pt-8"
            >
              {[
                { number: 150, suffix: "+", label: "Luxury Rooms" },
                { number: 50, suffix: "K+", label: "Happy Guests" },
                { number: 15, suffix: "+", label: "Awards Won" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="stat-number font-sans text-3xl font-bold text-primary md:text-4xl"
                      data-target={stat.number}
                    >
                      0
                    </span>
                    <span className="font-sans text-xl text-primary">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="mt-1 font-body text-sm text-gray-dark">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

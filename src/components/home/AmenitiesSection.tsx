"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { getIcon } from "@/lib/icons";

gsap.registerPlugin(ScrollTrigger);

interface DBamenity {
  id: string;
  amenityId: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
  details: string[];
}

export default function AmenitiesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [amenities, setAmenities] = useState<DBamenity[]>([]);

  useEffect(() => {
    fetch("/api/amenities")
      .then((res) => res.json())
      .then((data) => setAmenities(data))
      .catch(console.error);
  }, []);

  useGSAP(() => {
    if (!gridRef.current || amenities.length === 0) return;
    const items = gridRef.current.querySelectorAll(".amenity-item");

    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
      },
    });
  }, [amenities]);

  const displayAmenities = amenities.slice(0, 8);

  return (
    <section className="bg-cream py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Hotel Facilities"
          title="World-Class Amenities"
          description="Everything you need for a perfect stay, from relaxation to productivity."
        />

        <div
          ref={gridRef}
          className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {displayAmenities.map((amenity) => {
            const Icon = getIcon(amenity.iconName);
            return (
              <div
                key={amenity.id}
                className="amenity-item group cursor-pointer rounded-sm border border-cream-dark bg-white p-6 text-center transition-all duration-300 hover:border-primary hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                  <Icon
                    size={24}
                    className="text-primary transition-colors group-hover:text-dark"
                  />
                </div>
                <h3 className="mt-4 font-sans text-sm font-bold text-dark">
                  {amenity.name}
                </h3>
                <p className="mt-1 font-body text-xs text-gray-dark">
                  {amenity.description.substring(0, 60)}...
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

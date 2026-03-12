"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { getIcon } from "@/lib/icons";

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
  const [amenities, setAmenities] = useState<DBamenity[]>([]);

  useEffect(() => {
    fetch("/api/amenities")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAmenities(data);
        }
      })
      .catch(console.error);
  }, []);

  const displayAmenities = amenities.slice(0, 8);

  return (
    <section className="bg-cream py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Hotel Facilities"
          title="World-Class Amenities"
          description="Everything you need for a perfect stay, from relaxation to productivity."
        />

        <div className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-4">
          {displayAmenities.map((amenity, index) => {
            const Icon = getIcon(amenity.iconName);
            return (
              <div
                key={amenity.id}
                className="group cursor-pointer rounded-sm border border-cream-dark bg-white p-6 text-center transition-all duration-300 hover:border-primary hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
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

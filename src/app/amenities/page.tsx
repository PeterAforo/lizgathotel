"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getIcon } from "@/lib/icons";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DBAmenity {
  id: string;
  amenityId: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
  details: string[];
}

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<DBAmenity[]>([]);
  const [activeAmenity, setActiveAmenity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/amenities")
      .then((res) => res.json())
      .then((data) => {
        setAmenities(data);
        if (data.length > 0) setActiveAmenity(data[0].id);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const active = amenities.find((a) => a.id === activeAmenity) || amenities[0];

  if (loading || !active) {
    return (
      <PageTransition>
        <section className="relative h-[40vh] min-h-[300px]">
          <img src="/images/environs/010.jpg" alt="Amenities" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-dark/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="font-sans text-4xl font-bold text-white md:text-6xl">Amenities</h1>
          </div>
        </section>
        <div className="flex h-64 items-center justify-center bg-cream">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img
          src="/images/environs/010.jpg"
          alt="Amenities"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-sans text-4xl font-bold text-white md:text-6xl">
            Amenities
          </h1>
          <p className="mt-2 font-body text-lg text-white/70">
            World-class facilities for every need
          </p>
        </div>
      </section>

      {/* Amenities Explorer */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Hotel Facilities"
            title="Everything You Need"
            description="Explore our comprehensive range of amenities designed to make your stay exceptional."
          />

          <div className="mt-4 grid gap-8 lg:grid-cols-3">
            {/* Sidebar */}
            <div className="space-y-2">
              {amenities.map((amenity) => {
                const Icon = getIcon(amenity.iconName);
                return (
                  <button
                    key={amenity.id}
                    onClick={() => setActiveAmenity(amenity.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-body text-sm transition-all",
                      activeAmenity === amenity.id
                        ? "bg-primary font-semibold text-dark"
                        : "bg-white text-gray-dark hover:bg-cream-dark"
                    )}
                  >
                    <Icon size={18} />
                    {amenity.name}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={active.image}
                      alt={active.name}
                      className="h-72 w-full object-cover md:h-80"
                    />
                  </div>
                  <div className="mt-6">
                    <h3 className="font-sans text-2xl font-bold text-dark">
                      {active.name}
                    </h3>
                    <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                      {active.description}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {active.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-center gap-2"
                        >
                          <Check
                            size={16}
                            className="shrink-0 text-primary"
                          />
                          <span className="font-body text-sm text-gray-dark">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* All Amenities Grid */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="At a Glance"
            title="All Our Facilities"
            light
          />
          <div className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {amenities.map((amenity, i) => {
              const Icon = getIcon(amenity.iconName);
              return (
                <AnimatedSection key={amenity.id} delay={i * 0.05}>
                  <div className="group rounded-sm border border-white/10 bg-dark-card p-6 text-center transition-all hover:border-primary/30">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                      <Icon
                        size={24}
                        className="text-primary transition-colors group-hover:text-dark"
                      />
                    </div>
                    <h3 className="mt-4 font-sans text-sm font-bold text-white">
                      {amenity.name}
                    </h3>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

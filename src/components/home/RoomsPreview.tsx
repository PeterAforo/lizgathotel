"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Maximize2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Room } from "@/data/rooms";
import { formatCurrency } from "@/lib/utils";

export default function RoomsPreview() {
  const [featured, setFeatured] = useState<Room[]>([]);

  useEffect(() => {
    fetch("/api/rooms?featured=true")
      .then((res) => res.json())
      .then((data) => setFeatured(data))
      .catch(console.error);
  }, []);

  return (
    <section className="bg-dark py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Accommodations"
          title="Rooms & Suites"
          description="Each room is a sanctuary of comfort, thoughtfully designed with elegant furnishings and modern amenities."
          light
        />

        <div className="mt-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((room, i) => (
            <AnimatedSection key={room.slug} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden bg-dark-card"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-sm bg-primary px-3 py-1 font-body text-xs font-bold uppercase text-dark">
                      {formatCurrency(room.price)}/night
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-sans text-xl font-bold text-white">
                    {room.name}
                  </h3>
                  <p className="mt-2 font-body text-sm text-gray">
                    {room.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-1.5 text-gray">
                      <Users size={14} />
                      <span className="font-body text-xs">
                        {room.capacity} Guests
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray">
                      <Maximize2 size={14} />
                      <span className="font-body text-xs">{room.size}</span>
                    </div>
                  </div>
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary transition-colors hover:text-primary-light"
                  >
                    View Details
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-primary px-8 py-3 font-body text-sm font-bold uppercase tracking-wider text-primary transition-all duration-300 hover:bg-primary hover:text-dark"
          >
            View All Rooms
            <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

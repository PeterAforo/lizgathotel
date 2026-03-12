"use client";

import { useState, useEffect } from "react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import RoomCard from "@/components/rooms/RoomCard";
import RoomFilter from "@/components/rooms/RoomFilter";
import type { Room } from "@/data/rooms";
import { AnimatePresence, motion } from "framer-motion";

export default function RoomsPage() {
  const [category, setCategory] = useState("all");
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        setAllRooms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const rooms = category === "all" ? allRooms : allRooms.filter((r) => r.category === category);

  return (
    <PageTransition>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img
          src="/images/rooms/room-11/080.jpg"
          alt="Rooms"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-sans text-4xl font-bold text-white md:text-6xl">
            Rooms & Suites
          </h1>
          <p className="mt-2 font-body text-lg text-white/70">
            Find your perfect retreat
          </p>
        </div>
      </section>

      {/* Rooms Listing */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Accommodations"
            title="Choose Your Room"
            description="From comfortable standard rooms to our opulent Presidential Suite, find the perfect space for your stay."
          />

          <div className="mb-12">
            <RoomFilter active={category} onChange={setCategory} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {rooms.map((room, i) => (
                <RoomCard key={room.slug} room={room} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}

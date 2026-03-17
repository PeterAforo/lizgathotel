"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Maximize2,
  Bed,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Room } from "@/data/rooms";
import { formatCurrency } from "@/lib/utils";

export default function RoomDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [room, setRoom] = useState<Room | null>(null);
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data: Room[]) => {
        setAllRooms(data);
        const found = data.find((r: Room) => r.slug === slug);
        setRoom(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <PageTransition>
        <div className="flex h-screen items-center justify-center bg-cream">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 font-body text-gray-dark">Loading room...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!room) {
    return (
      <PageTransition>
        <div className="flex h-screen items-center justify-center bg-cream">
          <div className="text-center">
            <h1 className="font-sans text-4xl font-bold text-dark">
              Room Not Found
            </h1>
            <p className="mt-2 font-body text-gray-dark">
              The room you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button href="/rooms" className="mt-6">
              View All Rooms
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const prevImage = () =>
    setCurrentImage((c) => (c - 1 + room.images.length) % room.images.length);
  const nextImage = () =>
    setCurrentImage((c) => (c + 1) % room.images.length);

  const otherRooms = allRooms.filter((r: Room) => r.slug !== slug).slice(0, 3);

  return (
    <PageTransition>
      {/* Hero Image Gallery */}
      <section className="relative h-[50vh] min-h-[400px] md:h-[60vh]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={room.images[currentImage]}
            alt={room.name}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/30" />

        {/* Navigation */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
          {room.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentImage ? "w-8 bg-primary" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-dark/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-primary hover:text-dark"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-dark/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-primary hover:text-dark"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>

        {/* Back */}
        <Link
          href="/rooms"
          className="absolute left-4 top-24 flex items-center gap-2 rounded-sm bg-dark/50 px-4 py-2 font-body text-sm text-white backdrop-blur-sm transition-colors hover:bg-primary hover:text-dark"
        >
          <ArrowLeft size={16} />
          All Rooms
        </Link>
      </section>

      {/* Room Details */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <span className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  {room.category}
                </span>
                <h1 className="mt-2 font-sans text-3xl font-bold text-dark md:text-5xl">
                  {room.name}
                </h1>
                <div className="mt-4 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-gray-dark">
                    <Users size={18} className="text-primary" />
                    <span className="font-body text-sm">
                      {room.capacity} Guests
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-dark">
                    <Maximize2 size={18} className="text-primary" />
                    <span className="font-body text-sm">{room.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-dark">
                    <Bed size={18} className="text-primary" />
                    <span className="font-body text-sm">{room.bedType}</span>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection className="mt-8" delay={0.1}>
                <h2 className="font-sans text-xl font-bold text-dark">
                  About This Room
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-gray-dark">
                  {room.description}
                </p>
              </AnimatedSection>

              <AnimatedSection className="mt-8" delay={0.2}>
                <h2 className="font-sans text-xl font-bold text-dark">
                  Room Amenities
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Check size={16} className="shrink-0 text-primary" />
                      <span className="font-body text-sm text-gray-dark">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <AnimatedSection animation="fadeLeft" delay={0.2}>
                <div className="sticky top-28 rounded-sm bg-white p-6 shadow-lg">
                  <div className="text-center">
                    <p className="font-body text-sm text-gray-dark">
                      Starting from
                    </p>
                    <p className="font-sans text-4xl font-bold text-primary">
                      {formatCurrency(room.price)}
                    </p>
                    <p className="font-body text-sm text-gray-dark">
                      per night
                    </p>
                  </div>
                  <div className="mt-6">
                    <Button href="/booking" size="lg" className="w-full">
                      Book This Room
                    </Button>
                  </div>
                  <div className="mt-4">
                    <Button
                      href="/contact"
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      Inquire Now
                    </Button>
                  </div>
                  <div className="mt-6 border-t border-cream-dark pt-4">
                    <ul className="space-y-2 font-body text-sm text-gray-dark">
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-primary" />
                        Free cancellation up to 48h
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-primary" />
                        Breakfast included
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-primary" />
                        Free Wi-Fi included
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Other Rooms */}
          <AnimatedSection className="mt-20">
            <h2 className="font-sans text-2xl font-bold text-dark">
              You Might Also Like
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {otherRooms.map((r) => (
                <Link
                  key={r.slug}
                  href={`/rooms/${r.slug}`}
                  className="group overflow-hidden rounded-sm bg-white shadow-md transition-shadow hover:shadow-xl"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-sans text-lg font-bold text-dark">
                      {r.name}
                    </h3>
                    <p className="font-body text-sm font-semibold text-primary">
                      {formatCurrency(r.price)}/night
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}

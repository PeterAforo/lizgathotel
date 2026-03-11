"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Maximize2, Bed } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Room } from "@/data/rooms";

interface RoomCardProps {
  room: Room;
  index: number;
}

export default function RoomCard({ room, index }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-sm bg-white shadow-md transition-shadow hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
        <div className="absolute left-4 top-4">
          <span className="rounded-sm bg-dark/80 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-primary">
            {room.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="rounded-sm bg-primary px-4 py-1.5 font-body text-sm font-bold text-dark">
            {formatCurrency(room.price)}/night
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-sans text-xl font-bold text-dark">{room.name}</h3>
        <p className="mt-2 font-body text-sm text-gray-dark">
          {room.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 border-t border-cream-dark pt-4">
          <div className="flex items-center gap-1.5 text-gray-dark">
            <Users size={14} className="text-primary" />
            <span className="font-body text-xs">{room.capacity} Guests</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-dark">
            <Maximize2 size={14} className="text-primary" />
            <span className="font-body text-xs">{room.size}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-dark">
            <Bed size={14} className="text-primary" />
            <span className="font-body text-xs">{room.bedType}</span>
          </div>
        </div>

        <Link
          href={`/rooms/${room.slug}`}
          className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          View Details
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "All Rooms" },
  { value: "standard", label: "Standard" },
  { value: "deluxe", label: "Deluxe" },
  { value: "suite", label: "Suites" },
  { value: "presidential", label: "Presidential" },
];

interface RoomFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function RoomFilter({ active, onChange }: RoomFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            "relative rounded-sm px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-wider transition-colors",
            active === cat.value
              ? "text-dark"
              : "text-gray-dark hover:text-primary"
          )}
        >
          {active === cat.value && (
            <motion.div
              layoutId="room-filter"
              className="absolute inset-0 rounded-sm bg-primary"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

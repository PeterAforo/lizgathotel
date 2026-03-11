"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

const categories = [
  { value: "all", label: "All" },
  { value: "rooms", label: "Rooms" },
  { value: "dining", label: "Dining" },
  { value: "pool", label: "Pool & Spa" },
  { value: "events", label: "Events" },
  { value: "exterior", label: "Exterior" },
];

export default function GalleryPage() {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [category, setCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setAllImages(data))
      .catch(console.error);
  }, []);

  const images = category === "all" ? allImages : allImages.filter((img) => img.category === category);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const prevImage = () =>
    setLightboxIndex((c) => (c - 1 + images.length) % images.length);
  const nextImage = () =>
    setLightboxIndex((c) => (c + 1) % images.length);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Gallery"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-sans text-4xl font-bold text-white md:text-6xl">
            Gallery
          </h1>
          <p className="mt-2 font-body text-lg text-white/70">
            Explore LIZGAT Hotel through our lens
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Photo Gallery"
            title="Visual Journey"
            description="Browse through our collection capturing the beauty and elegance of LIZGAT Hotel."
          />

          {/* Filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={cn(
                  "relative rounded-sm px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-wider transition-colors",
                  category === cat.value
                    ? "text-dark"
                    : "text-gray-dark hover:text-primary"
                )}
              >
                {category === cat.value && (
                  <motion.div
                    layoutId="gallery-filter"
                    className="absolute inset-0 rounded-sm bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            >
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(i)}
                  className="group relative cursor-pointer overflow-hidden rounded-sm"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-56"
                  />
                  <div className="absolute inset-0 bg-dark/0 transition-all duration-300 group-hover:bg-dark/40" />
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="font-body text-xs font-semibold text-white">
                      {img.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-dark/90 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Dialog.Title className="sr-only">Gallery Image</Dialog.Title>
            {images[lightboxIndex] && (
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                className="max-h-[80vh] max-w-[90vw] object-contain"
              />
            )}
            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </Dialog.Close>
            <button
              onClick={prevImage}
              className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-sm text-white/70">
              {lightboxIndex + 1} / {images.length}
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </PageTransition>
  );
}

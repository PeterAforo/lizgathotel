"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface GalleryImg {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export default function GalleryPreview() {
  const [allImages, setAllImages] = useState<GalleryImg[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setAllImages(data))
      .catch(console.error);
  }, []);

  const images = allImages.slice(0, 6);

  return (
    <section className="bg-cream py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Our Gallery"
          title="Captured Moments"
          description="Take a visual journey through the elegance and beauty of LIZGAT Hotel."
        />

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((img, i) => (
            <AnimatedSection key={img.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`group relative cursor-pointer overflow-hidden ${
                  i === 0 ? "row-span-2 h-full" : "h-52 md:h-60"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark/0 transition-all duration-300 group-hover:bg-dark/40" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-body text-sm font-semibold text-white">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:text-primary-dark"
          >
            View Full Gallery
            <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

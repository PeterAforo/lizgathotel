"use client";

import PageTransition from "@/components/layout/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import RoomsPreview from "@/components/home/RoomsPreview";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GalleryPreview from "@/components/home/GalleryPreview";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <WelcomeSection />
      <RoomsPreview />
      <AmenitiesSection />
      <TestimonialsSection />
      <GalleryPreview />
      <CTASection />
    </PageTransition>
  );
}

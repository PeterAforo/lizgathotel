"use client";

import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { Award, Heart, Globe, Shield } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Ghanaian Hospitality",
    description:
      "We embody the spirit of Akwaaba — a warm welcome that makes every guest feel at home.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We pursue perfection in every detail, from our rooms to our service to our cuisine.",
  },
  {
    icon: Globe,
    title: "Cultural Pride",
    description:
      "We celebrate Ghana's rich heritage and share it with guests from around the world.",
  },
  {
    icon: Shield,
    title: "Trust & Integrity",
    description:
      "We build lasting relationships through honesty, transparency, and genuine care.",
  },
];

const milestones = [
  { year: "2020", event: "LIZGAT Hotel founded in Accra" },
  { year: "2021", event: "Awarded Best New Hotel in Ghana" },
  { year: "2022", event: "Expanded with Presidential Suite wing" },
  { year: "2023", event: "Launched world-class Spa & Wellness center" },
  { year: "2024", event: "Hosted over 50,000 guests from 40+ countries" },
  { year: "2025", event: "Recognized among Top 10 Hotels in West Africa" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img
          src="/images/environs/012.jpg"
          alt="About LIZGAT Hotel"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-sans text-4xl font-bold text-white md:text-6xl">
            About Us
          </h1>
          <p className="mt-2 font-body text-lg text-white/70">
            Our story, our passion, our legacy
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection animation="fadeLeft">
              <div className="relative">
                <img
                  src="/images/environs/005.jpg"
                  alt="LIZGAT Hotel"
                  className="h-[450px] w-full object-cover"
                />
                <div className="absolute -bottom-4 -right-4 border-2 border-primary bg-dark px-6 py-4">
                  <p className="font-sans text-3xl font-bold text-primary">
                    Since 2020
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeRight">
              <span className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Our Story
              </span>
              <h2 className="mt-3 font-sans text-3xl font-bold text-dark md:text-4xl">
                A Vision of Luxury in the Heart of Ghana
              </h2>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-[1px] w-12 bg-primary" />
                <div className="h-2 w-2 rotate-45 bg-primary" />
              </div>
              <p className="mt-6 font-body text-base leading-relaxed text-gray-dark">
                LIZGAT Hotel was born from a vision to create a world-class
                hospitality destination that proudly celebrates Ghana&apos;s
                rich cultural heritage while offering the finest modern
                luxuries. Founded in 2020, our hotel has quickly become a
                landmark in Accra&apos;s vibrant hospitality landscape.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-gray-dark">
                Every corner of LIZGAT Hotel tells a story — from the
                handcrafted artwork by local artisans to the carefully curated
                menu that pays homage to Ghana&apos;s diverse culinary
                traditions. We believe that true luxury lies in the
                intersection of exceptional comfort and authentic cultural
                experience.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-gray-dark">
                Our dedicated team of hospitality professionals ensures that
                every guest receives personalized attention and care, creating
                memories that last a lifetime.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="What We Stand For"
            title="Our Core Values"
            light
          />
          <div className="mt-4 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} delay={i * 0.1}>
                  <div className="rounded-sm border border-white/10 bg-dark-card p-8 text-center transition-all hover:border-primary/30">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h3 className="mt-4 font-sans text-lg font-bold text-white">
                      {value.title}
                    </h3>
                    <p className="mt-2 font-body text-sm text-gray">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Journey"
            title="Milestones"
          />
          <div className="mt-4 space-y-0">
            {milestones.map((item, i) => (
              <AnimatedSection
                key={item.year}
                delay={i * 0.1}
                className="relative flex gap-6 pb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-sm font-bold text-dark">
                    {item.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="h-full w-[2px] bg-primary/20" />
                  )}
                </div>
                <div className="pb-4 pt-3">
                  <p className="font-body text-xs font-semibold uppercase tracking-wider text-primary">
                    {item.year}
                  </p>
                  <p className="mt-1 font-body text-base text-gray-dark">
                    {item.event}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark-lighter py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <AnimatedSection>
            <h2 className="font-sans text-3xl font-bold text-white md:text-4xl">
              Experience LIZGAT Hotel
            </h2>
            <p className="mt-4 font-body text-base text-gray">
              We invite you to be part of our story. Come and experience the
              warmth of Ghanaian hospitality at its finest.
            </p>
            <div className="mt-8">
              <Button href="/booking" size="lg">
                Book Your Stay
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}

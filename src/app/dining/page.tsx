"use client";

import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { Clock, UtensilsCrossed, Wine, Coffee } from "lucide-react";

const menuHighlights = [
  {
    category: "Breakfast",
    icon: Coffee,
    time: "6:30 AM - 10:30 AM",
    items: [
      "Continental & Full English Breakfast",
      "Traditional Ghanaian Breakfast (Waakye, Hausa Koko)",
      "Fresh Tropical Fruits & Juices",
      "Pastries & Freshly Baked Bread",
      "Eggs to Order",
    ],
  },
  {
    category: "Lunch",
    icon: UtensilsCrossed,
    time: "12:00 PM - 3:00 PM",
    items: [
      "Jollof Rice with Grilled Chicken",
      "Grilled Tilapia with Banku",
      "Caesar Salad with Prawns",
      "Gourmet Burgers & Sandwiches",
      "Chef's Special of the Day",
    ],
  },
  {
    category: "Dinner",
    icon: UtensilsCrossed,
    time: "6:30 PM - 10:30 PM",
    items: [
      "Pan-Seared Atlantic Salmon",
      "Grilled Lamb Chops with Herbs",
      "Fufu with Light Soup",
      "Lobster Thermidor",
      "Vegetarian Risotto",
    ],
  },
  {
    category: "Bar & Cocktails",
    icon: Wine,
    time: "4:00 PM - Midnight",
    items: [
      "Signature Cocktails",
      "Premium Wines & Champagne",
      "Craft Beers & Local Brews",
      "Mocktails & Fresh Juices",
      "Bar Snacks & Tapas",
    ],
  },
];

export default function DiningPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img
          src="/images/restaurant/033.jpg"
          alt="Dining"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-sans text-4xl font-bold text-white md:text-6xl">
            Dining
          </h1>
          <p className="mt-2 font-body text-lg text-white/70">
            A culinary journey through Ghana and beyond
          </p>
        </div>
      </section>

      {/* Restaurant Intro */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection animation="fadeLeft">
              <img
                src="/images/restaurant/028.jpg"
                alt="Restaurant interior"
                className="h-[400px] w-full object-cover"
              />
            </AnimatedSection>
            <AnimatedSection animation="fadeRight">
              <span className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                The LIZGAT Restaurant
              </span>
              <h2 className="mt-3 font-sans text-3xl font-bold text-dark md:text-4xl">
                Where Flavor Meets Elegance
              </h2>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-[1px] w-12 bg-primary" />
                <div className="h-2 w-2 rotate-45 bg-primary" />
              </div>
              <p className="mt-6 font-body text-base leading-relaxed text-gray-dark">
                Our award-winning restaurant brings together the rich flavors
                of Ghana with international culinary excellence. Led by
                our executive chef, every dish is crafted with locally
                sourced ingredients and a passion for perfection.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-gray-dark">
                Whether you&apos;re savoring a traditional Ghanaian feast or
                indulging in contemporary fine dining, our restaurant
                promises an unforgettable culinary experience.
              </p>
              <div className="mt-6 flex items-center gap-2 text-gray-dark">
                <Clock size={16} className="text-primary" />
                <span className="font-body text-sm">
                  Open daily | Breakfast, Lunch &amp; Dinner
                </span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Menu"
            title="Culinary Delights"
            description="From traditional Ghanaian cuisine to international favorites, our menu has something for every palate."
            light
          />

          <div className="mt-4 grid gap-8 md:grid-cols-2">
            {menuHighlights.map((menu, i) => {
              const Icon = menu.icon;
              return (
                <AnimatedSection key={menu.category} delay={i * 0.1}>
                  <div className="rounded-sm border border-white/10 bg-dark-card p-8 transition-all hover:border-primary/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Icon size={22} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-sans text-xl font-bold text-white">
                          {menu.category}
                        </h3>
                        <p className="font-body text-xs text-gray">
                          {menu.time}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {menu.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 border-b border-white/5 pb-2"
                        >
                          <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          <span className="font-body text-sm text-white/80">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <AnimatedSection>
            <h2 className="font-sans text-3xl font-bold text-dark md:text-4xl">
              Reserve Your Table
            </h2>
            <p className="mt-4 font-body text-base text-gray-dark">
              For reservations, special dietary requirements, or private
              dining inquiries, please contact our restaurant team.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/booking">Make a Reservation</Button>
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}

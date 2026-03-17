"use client";

import { useState } from "react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img
          src="/images/environs/016.jpg"
          alt="Contact"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-sans text-4xl font-bold text-white md:text-6xl">
            Contact Us
          </h1>
          <p className="mt-2 font-body text-lg text-white/70">
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Get in Touch"
            title="We're Here to Help"
            description="Have questions about your stay, need to make a reservation, or want to learn more? Reach out to us."
          />

          <div className="mt-4 grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <AnimatedSection animation="fadeLeft" delay={0}>
                <div className="rounded-sm bg-white p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-bold text-dark">
                        Our Location
                      </h3>
                      <p className="mt-1 font-body text-sm text-gray-dark">
                        12 Liberation Road, Airport Residential Area, Accra,
                        Greater Accra Region, Ghana
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeLeft" delay={0.1}>
                <div className="rounded-sm bg-white p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-bold text-dark">
                        Phone
                      </h3>
                      <p className="mt-1 font-body text-sm text-gray-dark">
                        +233 24 548 2078 (Primary)
                      </p>
                      <p className="font-body text-sm text-gray-dark">
                        +233 54 098 6101
                      </p>
                      <p className="font-body text-sm text-gray-dark">
                        +233 24 002 9429
                      </p>
                      <p className="font-body text-sm text-gray-dark">
                        +233 24 222 2481
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeLeft" delay={0.2}>
                <div className="rounded-sm bg-white p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-bold text-dark">
                        Email
                      </h3>
                      <p className="mt-1 font-body text-sm text-gray-dark">
                        info@lizgathotel.com
                      </p>
                      <p className="font-body text-sm text-gray-dark">
                        reservations@lizgathotel.com
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeLeft" delay={0.3}>
                <div className="rounded-sm bg-white p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-bold text-dark">
                        Front Desk Hours
                      </h3>
                      <p className="mt-1 font-body text-sm text-gray-dark">
                        24/7 — Always at your service
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeLeft" delay={0.4}>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, label: "Facebook" },
                    { icon: Instagram, label: "Instagram" },
                    { icon: Twitter, label: "Twitter" },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-12 w-12 items-center justify-center rounded-sm bg-dark text-white transition-all hover:bg-primary hover:text-dark"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <AnimatedSection
              animation="fadeRight"
              className="lg:col-span-2"
            >
              <div className="rounded-sm bg-white p-8 shadow-md">
                <h3 className="font-sans text-xl font-bold text-dark">
                  Send Us a Message
                </h3>
                <p className="mt-1 font-body text-sm text-gray-dark">
                  Fill out the form below and we&apos;ll get back to you
                  within 24 hours.
                </p>

                {submitted && (
                  <div className="mt-4 rounded-sm bg-green-50 p-4 text-center">
                    <p className="font-body text-sm font-semibold text-green-700">
                      Thank you! Your message has been sent successfully. We&apos;ll
                      get back to you soon.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mt-4 rounded-sm bg-red-50 p-4 text-center">
                    <p className="font-body text-sm font-semibold text-red-700">
                      {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-body text-sm font-semibold text-dark">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark placeholder:text-gray focus:border-primary focus:outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-body text-sm font-semibold text-dark">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark placeholder:text-gray focus:border-primary focus:outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-body text-sm font-semibold text-dark">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark placeholder:text-gray focus:border-primary focus:outline-none"
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-body text-sm font-semibold text-dark">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark focus:border-primary focus:outline-none"
                      >
                        <option value="">Select a subject</option>
                        <option value="reservation">Reservation Inquiry</option>
                        <option value="general">General Inquiry</option>
                        <option value="event">Event Booking</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block font-body text-sm font-semibold text-dark">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark placeholder:text-gray focus:border-primary focus:outline-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-sm bg-primary px-8 py-3 font-body text-sm font-bold uppercase tracking-wider text-dark transition-colors hover:bg-primary-dark disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-dark py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[300px] items-center justify-center rounded-sm bg-dark-card">
            <div className="text-center">
              <MapPin size={48} className="mx-auto text-primary" />
              <p className="mt-4 font-sans text-xl font-bold text-white">
                Find Us in Accra
              </p>
              <p className="mt-2 font-body text-sm text-gray">
                12 Liberation Road, Airport Residential Area, Accra, Ghana
              </p>
              <a
                href="https://maps.google.com/?q=5.5913,-0.1743"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-sm bg-primary px-6 py-2 font-body text-sm font-semibold text-dark transition-colors hover:bg-primary-dark"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

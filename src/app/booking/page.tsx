"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Users,
  Bed,
  User,
  Mail,
  Phone,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Room } from "@/data/rooms";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";

const steps = [
  { id: 1, label: "Dates & Guests" },
  { id: 2, label: "Select Room" },
  { id: 3, label: "Your Details" },
  { id: 4, label: "Confirmation" },
];

export default function BookingPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch(console.error);
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  const selectedRoomData = rooms.find((r) => r.slug === selectedRoom);
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;
  const total = selectedRoomData ? selectedRoomData.price * nights : 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return checkIn && checkOut && nights > 0;
      case 2:
        return selectedRoom !== "";
      case 3:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      default:
        return true;
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedRoomData || !checkIn || !checkOut) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: selectedRoomData.id ?? selectedRoomData.slug,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          guests,
          nights,
          totalPrice: total,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create booking");
      }
      const booking = await res.json();
      setBookingRef(booking.bookingRef);
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[35vh] min-h-[280px]">
        <img
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
          alt="Booking"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-sans text-4xl font-bold text-white md:text-6xl">
            Book Your Stay
          </h1>
          <p className="mt-2 font-body text-lg text-white/70">
            Reserve your luxury escape in Accra
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <AnimatedSection>
            <div className="mb-12 flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full font-body text-sm font-bold transition-all",
                        step >= s.id
                          ? "bg-primary text-dark"
                          : "bg-cream-dark text-gray-dark"
                      )}
                    >
                      {step > s.id ? <Check size={18} /> : s.id}
                    </div>
                    <span className="mt-2 hidden font-body text-xs font-semibold text-gray-dark md:block">
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        "mx-2 h-[2px] w-12 transition-colors md:w-24 lg:w-32",
                        step > s.id ? "bg-primary" : "bg-cream-dark"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-sm bg-white p-8 shadow-lg"
            >
              {/* Step 1: Dates */}
              {step === 1 && (
                <div>
                  <h2 className="font-sans text-2xl font-bold text-dark">
                    Select Your Dates
                  </h2>
                  <p className="mt-1 font-body text-sm text-gray-dark">
                    Choose your check-in and check-out dates.
                  </p>
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 flex items-center gap-2 font-body text-sm font-semibold text-dark">
                        <CalendarDays size={16} className="text-primary" />
                        Check-in Date
                      </label>
                      <DatePicker
                        selected={checkIn}
                        onChange={(date: Date | null) => {
                          setCheckIn(date);
                          if (date && checkOut && date >= checkOut) {
                            setCheckOut(addDays(date, 1));
                          }
                        }}
                        minDate={new Date()}
                        placeholderText="Select check-in"
                        className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark focus:border-primary focus:outline-none"
                        dateFormat="MMMM d, yyyy"
                      />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center gap-2 font-body text-sm font-semibold text-dark">
                        <CalendarDays size={16} className="text-primary" />
                        Check-out Date
                      </label>
                      <DatePicker
                        selected={checkOut}
                        onChange={(date: Date | null) => setCheckOut(date)}
                        minDate={checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1)}
                        placeholderText="Select check-out"
                        className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark focus:border-primary focus:outline-none"
                        dateFormat="MMMM d, yyyy"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="mb-2 flex items-center gap-2 font-body text-sm font-semibold text-dark">
                      <Users size={16} className="text-primary" />
                      Number of Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark focus:border-primary focus:outline-none md:w-1/2"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} Guest{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  {nights > 0 && (
                    <div className="mt-6 rounded-sm bg-primary/10 p-4">
                      <p className="font-body text-sm text-dark">
                        <span className="font-semibold">{nights} night{nights > 1 ? "s" : ""}</span> selected
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Room Selection */}
              {step === 2 && (
                <div>
                  <h2 className="font-sans text-2xl font-bold text-dark">
                    Choose Your Room
                  </h2>
                  <p className="mt-1 font-body text-sm text-gray-dark">
                    Select from our available rooms ({nights} night{nights > 1 ? "s" : ""}).
                  </p>
                  <div className="mt-6 space-y-4">
                    {rooms
                      .filter((r) => r.capacity >= guests)
                      .map((room) => (
                        <button
                          key={room.slug}
                          onClick={() => setSelectedRoom(room.slug)}
                          className={cn(
                            "flex w-full items-center gap-4 rounded-sm border-2 p-4 text-left transition-all",
                            selectedRoom === room.slug
                              ? "border-primary bg-primary/5"
                              : "border-cream-dark hover:border-primary/30"
                          )}
                        >
                          <img
                            src={room.image}
                            alt={room.name}
                            className="h-20 w-28 shrink-0 rounded-sm object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-sans text-lg font-bold text-dark">
                              {room.name}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-3">
                              <span className="flex items-center gap-1 font-body text-xs text-gray-dark">
                                <Users size={12} />
                                {room.capacity} guests
                              </span>
                              <span className="flex items-center gap-1 font-body text-xs text-gray-dark">
                                <Bed size={12} />
                                {room.bedType}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-sans text-xl font-bold text-primary">
                              {formatCurrency(room.price)}
                            </p>
                            <p className="font-body text-xs text-gray-dark">
                              per night
                            </p>
                            <p className="mt-1 font-body text-sm font-semibold text-dark">
                              Total: {formatCurrency(room.price * nights)}
                            </p>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Step 3: Guest Details */}
              {step === 3 && (
                <div>
                  <h2 className="font-sans text-2xl font-bold text-dark">
                    Your Details
                  </h2>
                  <p className="mt-1 font-body text-sm text-gray-dark">
                    Please provide your contact information.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 flex items-center gap-2 font-body text-sm font-semibold text-dark">
                          <User size={14} className="text-primary" />
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 flex items-center gap-2 font-body text-sm font-semibold text-dark">
                          <User size={14} className="text-primary" />
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 flex items-center gap-2 font-body text-sm font-semibold text-dark">
                          <Mail size={14} className="text-primary" />
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 flex items-center gap-2 font-body text-sm font-semibold text-dark">
                          <Phone size={14} className="text-primary" />
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block font-body text-sm font-semibold text-dark">
                        Special Requests
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-sm border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-dark focus:border-primary focus:outline-none"
                        placeholder="Any special requirements? (e.g., airport transfer, dietary needs)"
                      />
                    </div>
                  </div>

                  {/* Booking Summary */}
                  {selectedRoomData && (
                    <div className="mt-6 rounded-sm bg-cream p-4">
                      <h4 className="font-sans text-sm font-bold text-dark">
                        Booking Summary
                      </h4>
                      <div className="mt-2 space-y-1 font-body text-sm text-gray-dark">
                        <p>Room: {selectedRoomData.name}</p>
                        <p>
                          Dates: {checkIn?.toLocaleDateString()} -{" "}
                          {checkOut?.toLocaleDateString()}
                        </p>
                        <p>Nights: {nights}</p>
                        <p>Guests: {guests}</p>
                        <p className="pt-2 font-sans text-lg font-bold text-primary">
                          Total: {formatCurrency(total)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <Check size={40} className="text-green-600" />
                  </div>
                  <h2 className="mt-6 font-sans text-3xl font-bold text-dark">
                    Booking Confirmed!
                  </h2>
                  {bookingRef && (
                    <p className="mt-2 font-body text-lg text-primary font-bold">
                      Reference: {bookingRef}
                    </p>
                  )}
                  <p className="mt-3 font-body text-base text-gray-dark">
                    Thank you, {formData.firstName}! Your booking for
                    the{" "}
                    <span className="font-semibold">
                      {selectedRoomData?.name}
                    </span>{" "}
                    has been received.
                  </p>
                  <div className="mx-auto mt-6 max-w-sm rounded-sm bg-cream p-6 text-left">
                    <h4 className="font-sans text-sm font-bold text-dark">
                      Booking Details
                    </h4>
                    <div className="mt-2 space-y-1 font-body text-sm text-gray-dark">
                      <p>Room: {selectedRoomData?.name}</p>
                      <p>
                        Check-in: {checkIn?.toLocaleDateString()}
                      </p>
                      <p>
                        Check-out: {checkOut?.toLocaleDateString()}
                      </p>
                      <p>
                        {nights} night{nights > 1 ? "s" : ""}, {guests} guest
                        {guests > 1 ? "s" : ""}
                      </p>
                      <p className="pt-2 font-sans text-xl font-bold text-primary">
                        Total: {formatCurrency(total)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 font-body text-sm text-gray-dark">
                    A confirmation email will be sent to{" "}
                    <span className="font-semibold">{formData.email}</span>.
                    Our team will contact you shortly to confirm your
                    reservation.
                  </p>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="mt-4 rounded-sm bg-red-50 p-4 text-center">
                  <p className="font-body text-sm font-semibold text-red-700">{error}</p>
                </div>
              )}

              {/* Navigation Buttons */}
              {step < 4 && (
                <div className="mt-8 flex justify-between">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep(step - 1)}
                      disabled={loading}
                      className="flex items-center gap-2 rounded-sm border-2 border-cream-dark px-6 py-3 font-body text-sm font-semibold text-gray-dark transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={() => step === 3 ? handleConfirmBooking() : setStep(step + 1)}
                    disabled={!canProceed() || loading}
                    className={cn(
                      "flex items-center gap-2 rounded-sm px-8 py-3 font-body text-sm font-bold uppercase tracking-wider transition-all",
                      canProceed() && !loading
                        ? "bg-primary text-dark hover:bg-primary-dark"
                        : "cursor-not-allowed bg-cream-dark text-gray"
                    )}
                  >
                    {loading ? "Processing..." : step === 3 ? "Confirm Booking" : "Continue"}
                    {!loading && <ArrowRight size={16} />}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}

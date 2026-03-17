"use client";

import PageTransition from "@/components/layout/PageTransition";

export default function TermsOfServicePage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[30vh] min-h-[220px] bg-dark">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-sans text-4xl font-bold text-white md:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-2 font-body text-lg text-white/70">
            Last updated: March 2026
          </p>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose-custom space-y-8">
            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">1. Agreement to Terms</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                By accessing and using the LIZGAT Hotel website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">2. Reservations and Bookings</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                All reservations made through our website are subject to availability and confirmation. By making a reservation, you agree to provide accurate and complete information. LIZGAT Hotel reserves the right to cancel or modify reservations in case of inaccurate information or suspected fraudulent activity.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 font-body text-base text-gray-dark">
                <li>Check-in time is 2:00 PM and check-out time is 12:00 PM</li>
                <li>Early check-in and late check-out are subject to availability</li>
                <li>A valid form of identification is required at check-in</li>
                <li>Guests must be at least 18 years of age to make a reservation</li>
              </ul>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">3. Cancellation Policy</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                Free cancellation is available up to 48 hours before the scheduled check-in date. Cancellations made within 48 hours of check-in may be subject to a charge equivalent to one night&apos;s stay. No-shows will be charged the full amount of the reservation.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">4. Pricing and Payment</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                All prices displayed on our website are in US Dollars (USD) and are inclusive of applicable taxes unless otherwise stated. LIZGAT Hotel reserves the right to modify pricing at any time. Payment is required at the time of check-in unless otherwise arranged. We accept major credit cards, bank transfers, and mobile money payments.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">5. Guest Conduct</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                Guests are expected to conduct themselves in a respectful and lawful manner during their stay. LIZGAT Hotel reserves the right to refuse service or evict any guest who:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 font-body text-base text-gray-dark">
                <li>Engages in disruptive, dangerous, or illegal behavior</li>
                <li>Causes damage to hotel property</li>
                <li>Violates hotel policies or local laws</li>
                <li>Disturbs other guests or staff</li>
              </ul>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">6. Hotel Property and Damages</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                Guests are responsible for any damage caused to hotel property during their stay. LIZGAT Hotel reserves the right to charge the guest&apos;s payment method for the cost of repairs or replacement of damaged items.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">7. Liability</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                LIZGAT Hotel shall not be liable for any loss, damage, or injury to guests or their belongings, except where caused by our negligence. Guests are advised to use the in-room safe for valuables. The hotel is not responsible for items left behind after check-out.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">8. Intellectual Property</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                All content on the LIZGAT Hotel website, including text, images, logos, and design elements, is the property of LIZGAT Hotel and is protected by copyright and trademark laws. You may not reproduce, distribute, or use our content without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">9. Website Use</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                Our website is provided on an &ldquo;as is&rdquo; basis. While we strive to keep information accurate and up-to-date, we make no warranties regarding the completeness, reliability, or accuracy of the content. We reserve the right to modify or discontinue any aspect of our website at any time.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">10. Governing Law</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Ghana.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">11. Changes to Terms</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                LIZGAT Hotel reserves the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after any changes constitutes acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">12. Contact Us</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-3 rounded-sm bg-white p-6 font-body text-base text-gray-dark shadow-sm">
                <p className="font-semibold text-dark">LIZGAT Hotel</p>
                <p>12 Liberation Road, Airport Residential Area</p>
                <p>Accra, Ghana</p>
                <p className="mt-2">Email: info@lizgathotel.com</p>
                <p>Phone: +233 24 548 2078</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

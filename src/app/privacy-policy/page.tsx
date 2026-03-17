"use client";

import PageTransition from "@/components/layout/PageTransition";

export default function PrivacyPolicyPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[30vh] min-h-[220px] bg-dark">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-sans text-4xl font-bold text-white md:text-6xl">
            Privacy Policy
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
              <h2 className="font-sans text-2xl font-bold text-dark">1. Introduction</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                LIZGAT Hotel (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or stay at our hotel located at 12 Liberation Road, Airport Residential Area, Accra, Ghana.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">2. Information We Collect</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 font-body text-base text-gray-dark">
                <li>Make a reservation or booking through our website</li>
                <li>Register for our newsletter</li>
                <li>Submit a contact form or inquiry</li>
                <li>Check in or check out of our hotel</li>
                <li>Use our hotel amenities and services</li>
              </ul>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                This information may include your name, email address, phone number, postal address, payment information, and any special requests or preferences you share with us.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">3. How We Use Your Information</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                We use the information we collect to:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 font-body text-base text-gray-dark">
                <li>Process and manage your reservations</li>
                <li>Provide and improve our hotel services</li>
                <li>Send booking confirmations and updates</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Comply with legal obligations</li>
                <li>Ensure the safety and security of our guests and property</li>
              </ul>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">4. Information Sharing</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and hotel services, provided they agree to keep your information confidential. We may also disclose your information when required by law or to protect our rights and safety.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">5. Data Security</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">6. Cookies</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but some features of our website may not function properly without them.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">7. Your Rights</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                You have the right to access, correct, update, or request deletion of your personal information. You may also opt out of receiving marketing communications from us at any time. To exercise these rights, please contact us using the information provided below.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">8. Data Retention</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">9. Changes to This Policy</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
              </p>
            </div>

            <div>
              <h2 className="font-sans text-2xl font-bold text-dark">10. Contact Us</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-gray-dark">
                If you have questions about this Privacy Policy, please contact us at:
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

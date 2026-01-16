import React from "react";
import Navbar from "@/components/home/Navbar";

/* ----------------------------------
   SEO METADATA
---------------------------------- */
export const metadata = {
  title: "Terms of Service | KwikStays",
  description:
    "Read KwikStays' terms of service regarding bookings, cancellations, user conduct, and liability.",
  robots: {
    index: true,
    follow: true,
  },
};

/* ----------------------------------
   TERMS OF SERVICE PAGE (SSG)
---------------------------------- */
export default function TermsOfServicePage() {
  return (
    <main className="bg-white font-sans min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg text-gray-600">
          <p className="mb-6">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing or using KwikStays, you agree to be bound by these
              Terms of Service and all applicable laws and regulations. If you
              do not agree with any of these terms, you are prohibited from
              using or accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Booking Policies
            </h2>
            <p className="mb-4">
              All bookings made through KwikStays are subject to availability
              and the specific terms of the hotel property. We act as an
              intermediary for the booking but do not operate the hotels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. User Responsibilities
            </h2>
            <p className="mb-4">
              You agree to provide accurate, current, and complete information
              during the booking process. You are responsible for maintaining
              the confidentiality of your account and password.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Limitation of Liability
            </h2>
            <p className="mb-4">
              KwikStays shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              access to or use of, or inability to access or use, the services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law
              provisions.
            </p>
          </section>
        </div>
      </div>
      <footer className="bg-gray-900 text-gray-400 py-12 text-center border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm md:text-base">
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
        <p>&copy; {new Date().getFullYear()} KwikStays. All rights reserved.</p>
      </footer>
    </main>
  );
}

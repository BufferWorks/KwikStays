import React from "react";
import Navbar from "@/components/home/Navbar";

/* ----------------------------------
   SEO METADATA
---------------------------------- */
export const metadata = {
  title: "Privacy Policy | KwikStays",
  description:
    "Read KwikStays' privacy policy to understand how we collect, use, and protect your personal information.",
  robots: {
    index: true,
    follow: true,
  },
};

/* ----------------------------------
   PRIVACY POLICY PAGE (SSG)
---------------------------------- */
export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white font-sans min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
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
              1. Information We Collect
            </h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when
              you create an account, make a booking, or contact customer
              support. This may include your name, email address, phone number,
              and payment information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and
              improve our services, including processing transactions, sending
              you booking confirmations, and communicating with you about your
              account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Information Sharing
            </h2>
            <p className="mb-4">
              We may share your information with hotel partners to facilitate
              your booking. We do not sell your personal information to third
              parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Security
            </h2>
            <p className="mb-4">
              We take reasonable measures to help protect information about you
              from loss, theft, misuse and unauthorized access, disclosure,
              alteration and destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:info@goatourwala.in"
                className="text-[#f8a11e] hover:underline"
              >
                info@goatourwala.in
              </a>
              .
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

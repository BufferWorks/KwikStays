import React from "react";
import Navbar from "@/components/home/Navbar";
import { ChevronDown, HelpCircle } from "lucide-react";

/* ----------------------------------
   SEO METADATA
---------------------------------- */
export const metadata = {
  title: "Frequently Asked Questions | KwikStays Help Center",
  description:
    "Find answers to common questions about booking hotels, cancellations, payments, and account management on KwikStays.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "KwikStays FAQ",
    description:
      "Your questions answered. Learn how to book, pay, and stay with KwikStays.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/faq`,
  },
  twitter: {
    card: "summary_large_image",
    title: "KwikStays FAQ",
    description: "Get help with your KwikStays bookings.",
  },
};

/* ----------------------------------
   FAQ PAGE (SSG)
---------------------------------- */
export default function FaqPage() {
  const faqs = [
    {
      question: "How do I book a hotel on KwikStays?",
      answer:
        "Booking is easy! Simply search for your destination, select your dates and guest count, browse the available hotels, and click 'Book Now'. You can pay securely online or choose to pay at the hotel.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking through the 'My Bookings' section. Cancellation policies vary by hotel, so please check the specific policy for your booking before cancelling.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit and debit cards, UPI, Net Banking, and wallet payments. Some hotels also offer a 'Pay at Hotel' option.",
    },
    {
      question: "Do I need an ID proof to check in?",
      answer:
        "Yes, a valid government-issued ID proof (Aadhar Card, Driving License, Voter ID, or Passport) is mandatory for all guests age 18 and above at the time of check-in.",
    },
    {
      question: "Are your hotels couple-friendly?",
      answer:
        "Many of our hotels are couple-friendly. You can filter for 'Couple Friendly' hotels on the search results page. Local IDs might not be accepted, so please check the hotel policy.",
    },
  ];

  return (
    <main className="bg-gray-50 font-sans min-h-screen">
      <Navbar />

      {/* HEADER */}
      <div className="bg-gray-900 text-white pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Got questions? We've got answers. Browsing our most common questions
          below.
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-3xl mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <h3 className="flex items-start gap-3 font-bold text-gray-900 text-lg mb-2">
                <HelpCircle
                  className="text-[#f8a11e] shrink-0 mt-1"
                  size={20}
                />
                {faq.question}
              </h3>
              <p className="text-gray-600 pl-8 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-gray-900 text-gray-400 py-12 text-center border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm md:text-base">
            <a href="/about" className="hover:text-white transition-colors">
              About Us
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </a>
            <a
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a href="/faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </div>
        </div>
        <p>&copy; {new Date().getFullYear()} KwikStays. All rights reserved.</p>
      </footer>
    </main>
  );
}

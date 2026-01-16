import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";
import Navbar from "@/components/home/Navbar";

/* ----------------------------------
   SEO METADATA
---------------------------------- */
export async function generateMetadata() {
  return {
    title: "Contact KwikStays | Get in Touch With Our Support Team",
    description:
      "Contact KwikStays for booking help, support issues, or partnership opportunities. We're here to help you 7 days a week.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
    },
    openGraph: {
      title: "Contact KwikStays",
      description:
        "Have questions or feedback? Reach out to KwikStays support team today.",
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact KwikStays",
      description: "Get help with bookings, support & partnerships.",
    },
  };
}

/* ----------------------------------
   CONTACT PAGE (SSG)
---------------------------------- */
export default function ContactPage() {
  return (
    <>
      <Navbar />
      {/* HERO */}
      <div className="bg-gray-900 text-white pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Our team is
          here to help.
        </p>
      </div>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CONTACT INFO */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                <p className="text-sm text-gray-500 mb-2">
                  For general support & queries
                </p>
                <a
                  href="mailto:info@goatourwala.in"
                  className="text-[#f8a11e] font-medium hover:underline"
                >
                  info@goatourwala.in
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-green-50 p-3 rounded-lg text-green-600">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Mon–Fri from 9am to 6pm
                </p>
                <a
                  href="tel:+917709475075"
                  className="text-[#f8a11e] font-medium hover:underline"
                >
                  +91 77094 75075
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Our corporate office
                </p>
                <address className="not-italic text-gray-700 text-sm leading-relaxed">
                  Semi-Basement, Shop no. 5 , KH No. 147
                  <br />
                  Mauza kehrai , Agra
                  <br />
                  Agra , Uttar Pradesh- 282001
                </address>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-2">
            <ContactForm />
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
          <p>
            &copy; {new Date().getFullYear()} KwikStays. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}

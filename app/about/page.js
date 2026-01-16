import Link from "next/link";
import { Users, CheckCircle2, Building2, Globe } from "lucide-react";
import Navbar from "@/components/home/Navbar";

/* ----------------------------------
   SEO METADATA (Static)
---------------------------------- */
export const metadata = {
  title: "About KwikStays | Trusted Hotel Booking Platform in India",
  description:
    "Learn about KwikStays – our mission to deliver affordable, quality, and secure hotel stays across India with seamless booking experiences.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About KwikStays",
    description:
      "Reimagining hotel stays with trusted properties, transparent pricing, and seamless bookings across India.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About KwikStays",
    description: "Affordable, secure, and quality hotel stays across India.",
  },
};

/* ----------------------------------
   ABOUT US PAGE (SSG)
---------------------------------- */
export default function AboutPage() {
  return (
    <main className="bg-white font-sans">
      <Navbar />
      {/* HERO SECTION */}
      <section className="bg-gray-900 text-white pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Reimagining How You <span className="text-[#f8a11e]">Stay</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            KwikStays is India's fastest-growing hotel network, committed to
            providing quality, affordable, and secure stays for every traveler.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#f8a11e] font-semibold text-sm mb-4">
              Our Story
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              From a Simple Idea to a Travel Revolution
            </h2>

            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded in 2025, KwikStays started with a simple mission: to
                make finding a great place to stay as easy as ordering a cab. We
                saw travelers forced to compromise between affordability and
                quality—and decided to change that.
              </p>

              <p>
                By partnering with trusted local hotels and upgrading them to
                consistent quality standards, we’ve built a reliable network for
                business travelers, families, and solo explorers alike.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2670&auto=format&fit=crop"
                alt="KwikStays Hotel Room"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-full text-green-600">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Happy Guests</p>
                  <p className="text-xl font-bold text-gray-900">5,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose KwikStays?
            </h2>
            <p className="text-gray-500">
              We don’t just book rooms—we curate reliable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle2 size={32} />,
                title: "Quality Assured",
                desc: "Every property is verified for cleanliness, safety, and amenities.",
              },
              {
                icon: <Building2 size={32} />,
                title: "Prime Locations",
                desc: "Hotels close to business hubs, landmarks, and transport.",
              },
              {
                icon: <Globe size={32} />,
                title: "Seamless Booking",
                desc: "Transparent pricing with instant confirmation—no surprises.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-[#f8a11e] mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-[#f8a11e] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Comfort?
          </h2>
          <p className="text-orange-50 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of travelers who trust KwikStays for their journeys.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#f8a11e] px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gray-50 transition shadow"
          >
            Book a Stay Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
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

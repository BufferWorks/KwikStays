import { notFound } from "next/navigation";

import HotelClientShell from "./HotelClientShell";
import { fetchHotelBySlug, fetchSimilarHotels } from "@/lib/hotel";

/* ---------------- SEO METADATA ---------------- */

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const hotel = await fetchHotelBySlug(slug);

  if (!hotel || !hotel.isActive) {
    return {
      robots: { index: false, follow: false },
    };
  }

  const title =
    hotel.seo?.title ||
    `${hotel.name} Hotel in ${hotel.locality?.name}, ${hotel.city?.name} | Best Price`;

  const description =
    hotel.seo?.description ||
    `Book ${hotel.name} hotel in ${hotel.locality?.name}, ${hotel.city?.name}. Check photos, amenities, location and best prices.`;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    other: {
      "last-modified": hotel.updatedAt || new Date().toISOString(),
    },

    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: hotel.heroImage
        ? [
            {
              url: hotel.heroImage,
              alt: `${hotel.name} hotel in ${hotel.locality?.name}, ${hotel.city?.name}`,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: hotel.heroImage ? [hotel.heroImage] : [],
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function HotelDetailsPage({ params }) {
  const { slug } = await params;

  const hotel = await fetchHotelBySlug(slug);

  if (!hotel || !hotel.isActive) {
    return notFound();
  }

  /* ---------------- BREADCRUMB SCHEMA ---------------- */

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "India",
        item: process.env.NEXT_PUBLIC_BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${hotel.city.name} Hotels`,
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${hotel.city.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${hotel.locality.name} Hotels`,
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${hotel.city.slug}/${hotel.locality.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: hotel.name,
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.slug}`,
      },
    ],
  };

  /* ---------------- HOTEL SCHEMA (SAFE VERSION) ---------------- */

  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.slug}`,

    name: hotel.name,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.slug}`,

    description: hotel.description,

    image: [
      ...(hotel.heroImage ? [hotel.heroImage] : []),
      ...(hotel.gallery || []),
    ],

    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.address || "",
      addressLocality: hotel.locality.name,
      addressRegion: hotel.city.name,
      addressCountry: "IN",
      postalCode: hotel.pincode || "",
    },

    geo:
      hotel.geo?.lat && hotel.geo?.lng
        ? {
            "@type": "GeoCoordinates",
            latitude: hotel.geo.lat,
            longitude: hotel.geo.lng,
          }
        : undefined,

    priceRange: `₹${hotel.priceStartingFrom}+`,

    makesOffer: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: hotel.priceStartingFrom,
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.slug}`,
    },
  };

  /* ---------------- FAQ SCHEMA (OPTIONAL) ---------------- */

  const faqSchema =
    hotel.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: hotel.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  /* ---------------- SIMILAR HOTELS ---------------- */

  const similarHotels = await fetchSimilarHotels({
    cityId: hotel.city._id,
    price: hotel.priceStartingFrom,
    excludeId: hotel._id,
    categories: hotel.categories,
    localityId: hotel.locality._id,
  });

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hotel Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelSchema),
        }}
      />

      {/* FAQ Structured Data */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <HotelClientShell hotel={hotel} similarHotels={similarHotels} />
    </>
  );
}

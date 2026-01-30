import { NextResponse } from "next/server";

// ===== DATA FETCHERS =====

// Cities
async function getCities() {
  const res = await fetch("https://kwikstays.in/api/cities", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json(); // [{ slug }]
}

// Hotels
async function getHotels() {
  const res = await fetch("https://kwikstays.in/api/hotels", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json(); // [{ slug, updatedAt }]
}

// ===== SITEMAP =====

export async function GET() {
  const baseUrl = "https://kwikstays.in";

  // 1️⃣ Static pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-of-service",
    "/search-properties",
  ];

  const staticUrls = staticPages.map(
    (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
  );

  // 2️⃣ City pages
  const cities = await getCities();

  const cityUrls = cities.map(
    (city) => `
  <url>
    <loc>${baseUrl}/hotels/${city.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
  );

  // 3️⃣ Hotel pages (🔥 MONEY PAGES)
  const hotels = (await getHotels()).filter((h) => h.isActive);

  const hotelUrls = hotels.map(
    (hotel) => `
  <url>
    <loc>${baseUrl}/hotel/${hotel.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...cityUrls, ...hotelUrls].join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

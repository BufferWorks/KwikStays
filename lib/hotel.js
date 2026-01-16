export async function fetchHotelBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hotels/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function fetchSimilarHotels({
  cityId,
  price,
  excludeId,
  categories,
  localityId,
}) {
  try {
    const params = new URLSearchParams({
      cityId,
      price: price.toString(),
      excludeId,
    });

    if (categories?.length) {
      params.append("categories", categories.join(","));
    }
    if (localityId) {
      params.append("localityId", localityId);
    }

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/hotels/similar?${params.toString()}`,
      { cache: "no-store" } // Ensure fresh results
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.success ? data.hotels : [];
  } catch (error) {
    console.error("Fetch similar hotels failed:", error);
    return [];
  }
}

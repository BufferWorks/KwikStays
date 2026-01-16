import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Hotel from "@/models/Hotel";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const cityId = searchParams.get("cityId");
    const priceStr = searchParams.get("price");
    const excludeId = searchParams.get("excludeId");
    const localityId = searchParams.get("localityId");
    const categoriesStr = searchParams.get("categories");

    if (!cityId || !priceStr) {
      return NextResponse.json({ success: false, hotels: [] }, { status: 400 });
    }

    const price = Number(priceStr);
    const priceMin = Math.floor(price * 0.7);
    const priceMax = Math.ceil(price * 1.3);
    const currentCategories = categoriesStr ? categoriesStr.split(",") : [];

    // Query Strategy:
    // 1. Mandatory: Same City
    // 2. Exclude current hotel
    // 3. Price Range: +/- 30%
    const query = {
      city: cityId,
      _id: { $ne: excludeId },
      priceStartingFrom: { $gte: priceMin, $lte: priceMax },
      isActive: true,
    };

    let hotels = await Hotel.find(query)
      .populate("locality")
      .select(
        "name heroImage priceStartingFrom rating locality categories slug"
      )
      .lean();

    // Scoring & Sorting Strategy
    hotels = hotels.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // 1. Category Match (High Priority)
      const catsA = a.categories?.map((c) => c.toString()) || [];
      const catsB = b.categories?.map((c) => c.toString()) || [];

      const hasCatA = catsA.some((c) => currentCategories.includes(c));
      const hasCatB = catsB.some((c) => currentCategories.includes(c));

      if (hasCatA) scoreA += 10;
      if (hasCatB) scoreB += 10;

      // 2. Locality Match (Bonus)
      if (localityId) {
        if (a.locality?._id?.toString() === localityId) scoreA += 5;
        if (b.locality?._id?.toString() === localityId) scoreB += 5;
      }

      // Secondary Sort: Rating (if scores equal)
      if (scoreA === scoreB) {
        return (b.rating || 0) - (a.rating || 0);
      }

      return scoreB - scoreA;
    });

    // Limit to 4
    const result = hotels.slice(0, 4);

    return NextResponse.json({ success: true, hotels: result });
  } catch (error) {
    console.error("Error fetching similar hotels:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

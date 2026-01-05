import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import City from "@/models/City";
import Locality from "@/models/Locality";
import Hotel from "@/models/Hotel";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    if (!q || q.length < 2) {
      return NextResponse.json({ cities: [], localities: [] });
    }

    /* -------- Cities -------- */
    const cities = await City.find({
      name: { $regex: q, $options: "i" },
      isActive: true,
    })
      .limit(5)
      .lean();

    const cityResults = await Promise.all(
      cities.map(async (city) => {
        const hotelCount = await Hotel.countDocuments({
          city: city._id,
          isActive: true,
        });

        return {
          _id: city._id,
          name: city.name,
          slug: city.slug,
          hotelCount,
        };
      })
    );

    /* -------- Localities (2 SOURCES) -------- */

    /**
     * A) Localities matching query directly
     */
    const matchingLocalities = await Locality.find({
      name: { $regex: q, $options: "i" },
      isActive: true,
    })
      .populate("city", "name slug")
      .limit(8)
      .lean();

    /**
     * B) Localities belonging to matched cities
     */
    const cityLocalities = await Locality.find({
      city: { $in: cityResults.map((c) => c._id) },
      isActive: true,
    })
      .populate("city", "name slug")
      .limit(8)
      .lean();

    /**
     * Merge + Deduplicate
     */
    const localityMap = new Map();

    [...matchingLocalities, ...cityLocalities].forEach((loc) => {
      localityMap.set(loc._id.toString(), loc);
    });

    const localities = Array.from(localityMap.values());

    const localityResults = await Promise.all(
      localities.slice(0, 8).map(async (loc) => {
        const hotelCount = await Hotel.countDocuments({
          locality: loc._id,
          isActive: true,
        });

        return {
          name: loc.name,
          slug: loc.slug,
          cityName: loc.city.name,
          citySlug: loc.city.slug,
          hotelCount,
        };
      })
    );

    return NextResponse.json({
      cities: cityResults.map(({ _id, ...rest }) => rest),
      localities: localityResults,
    });
  } catch (err) {
    console.error("Search suggestion error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import City from "@/models/City";
import Locality from "@/models/Locality";
import Hotel from "@/models/Hotel";
import Category from "@/models/Category";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const citySlug = searchParams.get("city");
    const localitySlug = searchParams.get("locality");
    const categorySlug = searchParams.get("category");

    if (!citySlug) {
      return NextResponse.json(
        { message: "city is required" },
        { status: 400 }
      );
    }

    const city = await City.findOne({ slug: citySlug }).lean();
    if (!city) {
      return NextResponse.json({ message: "City not found" }, { status: 404 });
    }

    let locality = null;
    if (localitySlug) {
      locality = await Locality.findOne({
        slug: localitySlug,
        city: city._id,
      }).lean();
    }

    let category = null;
    if (categorySlug) {
      category = await Category.findOne({
        slug: categorySlug,
        isActive: true,
      }).lean();
    }

    const query = {
      city: city._id,
      isActive: true,
    };

    if (locality) query.locality = locality._id;
    if (category) query.categories = category._id;

    const hotels = await Hotel.find(query)
      .populate("city", "name slug")
      .populate("locality", "name slug")
      .select(
        "name slug heroImage rating reviewCount priceStartingFrom hotelAmenities locality city"
      )
      .lean();

    const localities = await Locality.find({ city: city._id })
      .select("name slug")
      .lean();

    return NextResponse.json({
      city: {
        name: city.name,
        slug: city.slug,
      },
      locality: locality ? { name: locality.name, slug: locality.slug } : null,
      category: category ? { name: category.name, slug: category.slug } : null,
      hotels,
      localities,
    });
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

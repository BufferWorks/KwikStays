import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Hotel from "@/models/Hotel";
import City from "@/models/City"; // Populate dependency
import Locality from "@/models/Locality"; // Populate dependency
import Category from "@/models/Category"; // Populate dependency
import cloudinary from "@/lib/cloudinary";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const hotel = await Hotel.findById(id)
      .populate("city")
      .populate("locality")
      .populate("categories");

    if (!hotel) {
      return NextResponse.json({ message: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("GET /api/hotels/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch hotel details" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    // We support both JSON (for simple status toggles) and FormData (for full edits)
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      const updatedHotel = await Hotel.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true },
      );
      if (!updatedHotel) {
        return NextResponse.json(
          { message: "Hotel not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(updatedHotel);
    }

    // Handle FormData for full hotel edit
    const formData = await request.formData();

    /* ---------------- Basic Fields ---------------- */
    const updateData = {};

    const name = formData.get("name");
    if (name) updateData.name = name;

    const slug = formData.get("slug");
    if (slug) updateData.slug = slug;

    const citySlug = formData.get("citySlug");
    if (citySlug) {
      const city = await City.findOne({ slug: citySlug });
      if (city) updateData.city = city._id;
    }

    const localitySlug = formData.get("localitySlug");
    if (localitySlug && updateData.city) {
      const locality = await Locality.findOne({
        slug: localitySlug,
        city: updateData.city,
      });
      if (locality) updateData.locality = locality._id;
    }

    const categoriesParam = formData.get("categories");
    if (categoriesParam) {
      const categoriesSlugs = JSON.parse(categoriesParam);
      if (Array.isArray(categoriesSlugs)) {
        const foundCategories = await Category.find({
          slug: { $in: categoriesSlugs },
        }).select("_id");
        updateData.categories = foundCategories.map((c) => c._id);
      }
    }

    const addressParam = formData.get("address");
    if (addressParam) updateData.address = JSON.parse(addressParam);

    const geoParam = formData.get("geo");
    if (geoParam) updateData.geo = JSON.parse(geoParam);

    const rating = formData.get("rating");
    if (rating) updateData.rating = Number(rating);

    const reviewCount = formData.get("reviewCount");
    if (reviewCount) updateData.reviewCount = Number(reviewCount);

    const priceStartingFrom = formData.get("priceStartingFrom");
    if (priceStartingFrom)
      updateData.priceStartingFrom = Number(priceStartingFrom);

    const originalPrice = formData.get("originalPrice");
    if (originalPrice) updateData.originalPrice = Number(originalPrice);

    const taxes = formData.get("taxes");
    if (taxes) updateData.taxes = Number(taxes);

    const currency = formData.get("currency");
    if (currency) updateData.currency = currency;

    const hotelAmenitiesParam = formData.get("hotelAmenities");
    if (hotelAmenitiesParam)
      updateData.hotelAmenities = JSON.parse(hotelAmenitiesParam);

    const description = formData.get("description");
    if (description !== null) updateData.description = description;

    const policiesParam = formData.get("policies");
    if (policiesParam) updateData.policies = JSON.parse(policiesParam);

    const nearbyPlacesParam = formData.get("nearbyPlaces");
    if (nearbyPlacesParam)
      updateData.nearbyPlaces = JSON.parse(nearbyPlacesParam);

    const faqsParam = formData.get("faqs");
    if (faqsParam) updateData.faqs = JSON.parse(faqsParam);

    const seoParam = formData.get("seo");
    if (seoParam) updateData.seo = JSON.parse(seoParam);

    const isHomeFeatured = formData.get("isHomeFeatured");
    if (isHomeFeatured) updateData.isHomeFeatured = isHomeFeatured === "true";

    const isActive = formData.get("isActive");
    if (isActive) updateData.isActive = isActive === "true";

    /* ---------------- Upload Hero Image ---------------- */
    const heroImageFile = formData.get("heroImage");
    if (
      heroImageFile &&
      heroImageFile.size > 0 &&
      typeof heroImageFile !== "string"
    ) {
      const buffer = Buffer.from(await heroImageFile.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "KWIK-STAYS" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      updateData.heroImage = uploadResult.secure_url;
    } else if (
      typeof heroImageFile === "string" &&
      heroImageFile.startsWith("http")
    ) {
      updateData.heroImage = heroImageFile;
    }

    /* ---------------- Upload Gallery Images ---------------- */
    const galleryFiles = formData.getAll("gallery");
    if (galleryFiles && galleryFiles.length > 0) {
      const newGallery = [];
      for (const file of galleryFiles) {
        if (typeof file === "string" && file.startsWith("http")) {
          newGallery.push(file); // Keep existing URLs
        } else if (file && file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream({ folder: "KWIK-STAYS" }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
              })
              .end(buffer);
          });
          newGallery.push(uploadResult.secure_url);
        }
      }
      updateData.gallery = newGallery;
    }

    /* ---------------- Process Room Types ---------------- */
    const roomTypesParam = formData.get("roomTypes");
    if (roomTypesParam) {
      const roomTypes = JSON.parse(roomTypesParam);
      for (let i = 0; i < roomTypes.length; i++) {
        const file = formData.get(`roomTypeImage_${i}`);
        if (file && typeof file !== "string" && file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream({ folder: "KWIK-STAYS" }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
              })
              .end(buffer);
          });
          roomTypes[i].image = uploadResult.secure_url;
        }
      }
      updateData.roomTypes = roomTypes;
    }

    /* ---------------- Duplicate Hotel Check (if slug changed) ---------------- */
    if (updateData.slug) {
      const existingHotel = await Hotel.findOne({
        slug: updateData.slug,
        _id: { $ne: id },
      });
      if (existingHotel) {
        return NextResponse.json(
          { message: "Another hotel with this slug already exists" },
          { status: 409 },
        );
      }
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    );

    if (!updatedHotel) {
      return NextResponse.json({ message: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json(updatedHotel);
  } catch (error) {
    console.error("PATCH /api/hotels/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update hotel" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Hotel from "@/models/Hotel";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.userId)
      .populate({
        path: "wishlist",
        select: "name slug heroImage priceStartingFrom hotelAmenities",
        model: Hotel,
      })
      .lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      wishlist: user.wishlist || [],
    });
  } catch (err) {
    console.error("Wishlist fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    // Auth Check
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userId;
    try {
      const decoded = verifyToken(token);
      userId = decoded.userId;
    } catch (err) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse Body
    const body = await req.json();
    const { hotelId } = body;

    if (!hotelId) {
      return NextResponse.json({ error: "Hotel ID required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Initialize wishlist if undefined
    if (!user.wishlist) user.wishlist = [];

    const index = user.wishlist.indexOf(hotelId);
    let isWishlisted = false;

    if (index > -1) {
      // Remove
      user.wishlist.splice(index, 1);
      isWishlisted = false;
    } else {
      // Add
      user.wishlist.push(hotelId);
      isWishlisted = true;
    }

    await user.save();

    return NextResponse.json({
      success: true,
      wishlist: user.wishlist,
      isWishlisted,
    });
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

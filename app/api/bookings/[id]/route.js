import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Payment from "@/models/Payment";
import Hotel from "@/models/Hotel";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Booking ID required" },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(id).populate("paymentId").lean();

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    // Include hotel image if possible. Since we only store basic details in booking,
    // we might want to fetch the live Hotel document for images.
    const hotel = await Hotel.findById(booking.hotel.id)
      .select("images")
      .lean();

    const enrichedBooking = {
      ...booking,
      hotel: {
        ...booking.hotel,
        image: hotel?.images?.[0] || null,
      },
    };

    return NextResponse.json({
      success: true,
      booking: enrichedBooking,
    });
  } catch (error) {
    console.error("Fetch Booking Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

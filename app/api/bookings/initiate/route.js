// app/api/bookings/initiate/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Hotel from "@/models/Hotel";
import Booking from "@/models/Booking";
import Payment from "@/models/Payment";

import { calculateBookingPrice } from "@/lib/booking/calculateBookingPrice";
import { initiatePhonePePayment } from "@/lib/payments/initiate";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      hotelId,
      roomTypeSlug,
      stay,
      rooms,
      pricingSnapshot,
      guestDetails,
      userId,
    } = body;

    /* ---------------- VALIDATIONS ---------------- */

    if (!hotelId || !roomTypeSlug || !stay || !rooms?.length) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!guestDetails?.fullName || !guestDetails?.mobile) {
      return NextResponse.json(
        { success: false, message: "Guest details incomplete" },
        { status: 400 }
      );
    }

    /* ---------------- FETCH HOTEL ---------------- */

    const hotel = await Hotel.findById(hotelId);
    if (!hotel || !hotel.isActive) {
      return NextResponse.json(
        { success: false, message: "Hotel not available" },
        { status: 404 }
      );
    }

    const roomType = hotel.roomTypes.find((r) => r.slug === roomTypeSlug);

    if (!roomType) {
      return NextResponse.json(
        { success: false, message: "Room type not found" },
        { status: 404 }
      );
    }

    /* ---------------- PRICE RE-CALCULATION ---------------- */

    const serverPricing = calculateBookingPrice({
      roomType,
      checkIn: stay.checkIn,
      checkOut: stay.checkOut,
      rooms,
    });

    if (!serverPricing.valid) {
      return NextResponse.json(
        { success: false, message: "Invalid booking configuration" },
        { status: 400 }
      );
    }

    // 🔒 Price mismatch protection
    if (serverPricing.pricing.totalPrice !== pricingSnapshot.totalPrice) {
      return NextResponse.json(
        { success: false, message: "Price mismatch detected" },
        { status: 409 }
      );
    }

    /* ---------------- CREATE BOOKING ---------------- */

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    const booking = await Booking.create({
      bookingCode: `KS-${Date.now()}`,
      userId: userId || null, // Optional if guest checkout is allowed
      hotel: {
        id: hotel._id,
        name: hotel.name,
        city: hotel.city?.name,
        address: hotel.address?.full,
      },
      roomType: {
        slug: roomType.slug,
        name: roomType.name,
        basePrice: roomType.basePrice,
      },
      stay: {
        checkIn: stay.checkIn,
        checkOut: stay.checkOut,
        nights: serverPricing.nights,
      },
      rooms,
      guestDetails,
      pricing: {
        basePriceTotal: serverPricing.pricing.basePriceTotal,
        totalExtraGuestCost: serverPricing.pricing.totalExtraGuestCost,
        totalPrice: serverPricing.pricing.totalPrice,
        currency: "INR",
      },
      status: "PENDING_PAYMENT",
      expiresAt,
    });

    /* ---------------- CREATE PAYMENT ---------------- */

    const payment = await Payment.create({
      bookingId: booking._id,
      merchantOrderId: booking._id.toString(),
      amount: booking.pricing.totalPrice,
      status: "INITIATED",
    });

    booking.paymentId = payment._id;
    await booking.save();

    /* ---------------- PHONEPE INIT ---------------- */
    const phonepeResponse = await initiatePhonePePayment({
      merchantOrderId: payment.merchantOrderId,
      amount: payment.amount,
      mobile: guestDetails.mobile,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/status?bookingId=${booking._id}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/webhook`,
    });

    if (!phonepeResponse?.redirectUrl) {
      return NextResponse.json(
        { success: false, message: "Payment initiation failed" },
        { status: 500 }
      );
    }

    /* ---------------- SUCCESS RESPONSE ---------------- */

    return NextResponse.json({
      success: true,
      bookingId: booking._id,
      merchantOrderId: payment.merchantOrderId,
      redirectUrl: phonepeResponse.redirectUrl,
    });
  } catch (err) {
    console.error("Booking Initiate Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

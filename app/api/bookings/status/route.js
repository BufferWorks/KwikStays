import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Booking from "@/models/Booking";
import Payment from "@/models/Payment";

import checkPaymentStatus from "@/lib/phonepe/checkPaymentStatus";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: "bookingId is required" },
        { status: 400 }
      );
    }

    /* ---------------- FETCH BOOKING ---------------- */

    const booking = await Booking.findById(bookingId).populate("paymentId");

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    const payment = booking.paymentId;

    /* ---------------- FINAL STATES (NO CHECK) ---------------- */

    if (
      booking.status === "CONFIRMED" ||
      booking.status === "PAYMENT_FAILED" ||
      booking.status === "EXPIRED"
    ) {
      return NextResponse.json({
        success: true,
        booking: {
          id: booking._id,
          status: booking.status,
          paymentStatus: payment?.status,
          amount: booking.pricing.totalPrice,
          hotelName: booking.hotel.name,
        },
      });
    }

    /* ---------------- EXPIRED CHECK ---------------- */

    if (booking.expiresAt && booking.expiresAt < new Date()) {
      booking.status = "EXPIRED";
      await booking.save();

      if (payment && payment.status === "INITIATED") {
        payment.status = "EXPIRED";
        await payment.save();
      }

      return NextResponse.json({
        success: true,
        booking: {
          id: booking._id,
          status: "EXPIRED",
          paymentStatus: payment?.status,
          amount: booking.pricing.totalPrice,
          hotelName: booking.hotel.name,
        },
      });
    }

    /* ---------------- PHONEPE STATUS CHECK ---------------- */

    if (booking.status === "PENDING_PAYMENT") {
      const {
        state: phonepeStatus,
        transactionId,
        gatewayResponse,
      } = await checkPaymentStatus(payment.merchantOrderId);

      /**
       * EXPECTED phonepeStatus values (example):
       * - COMPLETED
       * - FAILED
       * - PENDING
       */

      if (transactionId) payment.transactionId = transactionId;
      if (gatewayResponse) payment.gatewayResponse = gatewayResponse;

      if (phonepeStatus === "COMPLETED") {
        booking.status = "CONFIRMED";
        payment.status = "SUCCESS";
        payment.paidAt = new Date();

        await booking.save();
        await payment.save();
      }

      if (phonepeStatus === "FAILED") {
        booking.status = "PAYMENT_FAILED";
        payment.status = "FAILED";

        await booking.save();
        await payment.save();
      }

      return NextResponse.json({
        success: true,
        booking: {
          id: booking._id,
          status: booking.status,
          paymentStatus: payment.status,
          amount: booking.pricing.totalPrice,
          hotelName: booking.hotel.name,
        },
      });
    }

    /* ---------------- FALLBACK ---------------- */

    return NextResponse.json({
      success: true,
      booking: {
        id: booking._id,
        status: booking.status,
        paymentStatus: payment?.status,
        amount: booking.pricing.totalPrice,
        hotelName: booking.hotel.name,
      },
    });
  } catch (err) {
    console.error("Booking Status Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

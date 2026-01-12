import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    bookingCode: {
      type: String,
      unique: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    hotel: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
      },
      name: String,
      city: String,
      address: String,
    },

    roomType: {
      slug: String,
      name: String,
      basePrice: Number,
    },

    stay: {
      checkIn: Date,
      checkOut: Date,
      nights: Number,
    },

    rooms: [
      {
        guests: Number,
        extras: Number,
      },
    ],

    guestDetails: {
      fullName: String,
      email: String,
      mobile: String,
    },

    pricing: {
      basePriceTotal: Number,
      totalExtraGuestCost: Number,
      totalPrice: Number,
      currency: { type: String, default: "INR" },
    },

    status: {
      type: String,
      enum: [
        "PENDING_PAYMENT",
        "CONFIRMED",
        "PAYMENT_FAILED",
        "CANCELLED",
        "EXPIRED",
        "CHECKED_IN",
        "COMPLETED",
      ],
      default: "PENDING_PAYMENT",
    },

    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    expiresAt: {
      type: Date,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);

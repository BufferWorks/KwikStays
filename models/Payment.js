// models/Payment.js
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },

    provider: {
      type: String,
      enum: ["PHONEPE"],
      default: "PHONEPE",
    },

    merchantOrderId: {
      type: String,
      unique: true,
      index: true,
    },

    transactionId: String,

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["INITIATED", "SUCCESS", "FAILED", "CANCELLED"],
      default: "INITIATED",
    },

    gatewayResponse: {
      type: Object,
    },

    paidAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);

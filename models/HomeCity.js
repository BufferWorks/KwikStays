import mongoose from "mongoose";

const HomeCitySchema = new mongoose.Schema(
  {
    /* ---------------- CORE REFERENCE ---------------- */

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
      unique: true,
      index: true,
    },

    displayName: {
      type: String,
      trim: true,
    },

    heroImage: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ---------------- SAFETY INDEX ---------------- */
// Prevent duplicate priority clashes accidentally
HomeCitySchema.index({ order: 1 }, { unique: true });

export default mongoose.models.HomeCity ||
  mongoose.model("HomeCity", HomeCitySchema);

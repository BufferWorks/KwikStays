import React, { useState } from "react";
import { Star } from "lucide-react";
import { calculateBookingPrice } from "@/lib/booking/calculateBookingPrice";

export default function BookingCard({ hotel, selectedRoom }) {
  // Helper to get local date string YYYY-MM-DD
  const getLocalDateString = (addDays = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + addDays);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [checkIn, setCheckIn] = useState(getLocalDateString(0));
  const [checkOut, setCheckOut] = useState(getLocalDateString(1));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);



  // const pricingResult =
  //   checkIn && checkOut
  //     ? calculateBookingPrice({
  //       roomType: selectedRoom,
  //       checkIn,
  //       checkOut,
  //       adults,
  //       children,
  //       rooms: 1,
  //     })
  //     : null;

  // const isValid = pricingResult?.valid;

  let pricingResult = null;
  let suggestion = null;

  if (checkIn && checkOut) {
    const initialResult = calculateBookingPrice({
      roomType: selectedRoom,
      checkIn,
      checkOut,
      adults,
      children,
      rooms: 1,
    });

    if (!initialResult.valid && initialResult.reason === "EXCEEDS_MAX_CAPACITY") {
      const suggestedRooms = initialResult.suggestedRooms;

      pricingResult = calculateBookingPrice({
        roomType: selectedRoom,
        checkIn,
        checkOut,
        adults,
        children,
        rooms: suggestedRooms,
      });

      suggestion = {
        type: "ROOM_UPGRADE",
        rooms: suggestedRooms,
      };
    } else {
      pricingResult = initialResult;
    }
  }




  return (
    <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-6 w-80">
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-red-600">₹{pricingResult?.pricing?.totalPrice.toLocaleString()}</span>
            <span className="text-gray-600">/night</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star size={16} className="text-[#f8a11e] fill-[#f8a11e]" />
            <span className="font-semibold">{hotel.rating}</span>
            <span>・</span>
            <span>{hotel.reviewCount.toLocaleString()} reviews</span>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none"
            />
          </div>

          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Adults</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="px-3 py-1 rounded-lg border"
                >
                  −
                </button>
                <span className="w-6 text-center">{adults}</span>
                <button
                  type="button"
                  onClick={() => setAdults(adults + 1)}
                  className="px-3 py-1 rounded-lg border"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Children</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="px-3 py-1 rounded-lg border"
                >
                  −
                </button>
                <span className="w-6 text-center">{children}</span>
                <button
                  type="button"
                  onClick={() => setChildren(children + 1)}
                  className="px-3 py-1 rounded-lg border"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {suggestion && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-sm">
              For {adults + children} guests, we’ve added{" "}
              <strong>{suggestion.rooms} rooms</strong> for a comfortable stay.
            </div>
          )}


          <button
            disabled={!pricingResult || !pricingResult.valid}
            className={`w-full py-4 rounded-xl font-bold text-lg ${pricingResult?.valid
              ? "bg-[#f8a11e] hover:bg-[#ffb649]"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Book Now
          </button>

        </form>
        {/* {pricingResult && pricingResult.valid && (
          <div className="mt-6 pt-6 border-t border-gray-200 text-sm">
            <div className="flex justify-between">
              <span>
                ₹{pricingResult.pricing.basePricePerNight} ×{" "}
                {pricingResult.nights} night(s)
              </span>
              <span>₹{pricingResult.pricing.basePriceTotal}</span>
            </div>

            {pricingResult.pricing.extraGuests.adults > 0 && (
              <div className="flex justify-between text-orange-600">
                <span>
                  Extra adults × {pricingResult.pricing.extraGuests.adults}
                </span>
                <span>
                  ₹{pricingResult.pricing.extraGuestCharges.totalExtraGuestCost}
                </span>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total</span>
              <span>₹{pricingResult.pricing.totalPrice}</span>
            </div>
          </div>
        )} */}

        {pricingResult && !pricingResult.valid && (
          <p className="text-red-600 text-sm mt-3">
            Maximum guests exceeded. Suggested rooms:{" "}
            {pricingResult.suggestedRooms}
          </p>
        )}

        {pricingResult && (
          <div className="mt-6 pt-6 border-t border-gray-200 text-sm space-y-2">
            <div className="flex justify-between">
              <span>
                ₹{pricingResult.pricing.basePricePerNight.toLocaleString()} ×{" "}
                {pricingResult.nights} night(s) × {pricingResult.rooms} room(s)
              </span>
              <span>₹{pricingResult.pricing.basePriceTotal.toLocaleString()}</span>
            </div>

            {pricingResult.pricing.extraGuestCharges.totalExtraGuestCost > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Extra guest charges</span>
                <span>
                  ₹{pricingResult.pricing.extraGuestCharges.totalExtraGuestCost.toLocaleString()}
                </span>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{pricingResult.pricing.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}



      </div>
    </div>
  );
}


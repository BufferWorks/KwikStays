import React from "react";
import { BadgePercent } from "lucide-react";
export default function MobilePricingDetails({ hotel, pricingRef, selectedRoom }) {
  const price = selectedRoom ? selectedRoom.price : hotel.priceStartingFrom;
  const originalPrice = selectedRoom ? selectedRoom.originalPrice : hotel.priceStartingFrom;
  return (
    <section ref={pricingRef} className="my-8 md:hidden">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Pricing details</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Price to pay</span>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
                <span className="text-lg font-bold text-gray-900">₹{price.toLocaleString()}</span>
              </div>
              <span className="text-[10px] text-gray-500">Inclusive of all taxes</span>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-blue-600">
            <BadgePercent size={18} />
            Apply coupon
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Your booking details</h2>
        <form className="space-y-5">
          <div>
            <label htmlFor="full-name" className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
            <input
              type="text"
              id="full-name"
              placeholder="First name and last name"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label htmlFor="mobile-number" className="block text-sm font-bold text-gray-700 mb-1.5">Mobile Number</label>
            <div className="flex rounded-lg shadow-sm">
              <span className="inline-flex items-center px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-600 font-medium text-sm">
                +91
              </span>
              <input
                type="tel"
                id="mobile-number"
                placeholder="Enter mobile number"
                className="flex-1 min-w-0 block w-full px-4 py-3 bg-white border border-gray-300 rounded-r-lg text-gray-900 text-sm focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="abc@xyz.com"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-[#f8a11e] focus:border-[#f8a11e] outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] mt-2"
          >
            Book Now
          </button>
        </form>
      </div>
    </section>
  );
}

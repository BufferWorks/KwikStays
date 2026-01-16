import React from "react";
import { Check, User, Bed, CheckCircle2, Ban, Info } from "lucide-react";
import { getAmenityIcon } from "@/components/hotel/amenityUtils";

export default function RoomTypes({ roomTypes, selectedRoom, setSelectedRoom }) {
  return (
    <section className="my-8 md:my-12">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 md:px-0">
        Choose your room
      </h2>

      {/* MOBILE VIEW: Horizontal Scroll & Compact Cards */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 scrollbar-hide -mx-4 md:mx-0">
        {roomTypes.map((room) => {
          const isSelected = selectedRoom.name === room.name;
          // Mocking original price for demo if not present, usually it's higher
          const originalPrice = Math.round(room.basePrice * 1.4);

          return (
            <div
              key={room.name}
              className={`
                min-w-[85%] snap-center bg-white rounded-xl border p-3 flex flex-col justify-between
                ${isSelected ? "border-blue-500 shadow-sm" : "border-gray-200"}
              `}
            >
              <div className="flex justify-between gap-3">
                {/* Left: Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base leading-tight">{room.name}</h3>
                  <div className="text-xs text-gray-500 mt-1">{room.area || "120 sq.ft"}</div>

                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span>{room.beds}</span> • <span>{room.occupancy || room.maxGuests} Guests</span>
                  </div>

                  <div className="mt-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">₹{room.basePrice.toLocaleString()}</span>
                      <span className="text-sm text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                      <span className="text-xs font-bold text-green-600">{Math.round(((originalPrice - room.basePrice) / originalPrice) * 100)}% off</span>
                    </div>
                    <div className="text-[10px] text-gray-400">Inclusive of taxes & fees</div>
                  </div>
                </div>

                {/* Right: Image */}
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 box-content">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Amenities & Refundable (Minimal) */}
              <div className="mt-3 flex flex-col gap-1.5 mb-3">
                {room.refundable && (
                  <div className="flex">
                    <span className="text-[10px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 size={10} /> Free Cancellation
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {room.amenities.slice(0, 2).map((am) => {
                    const Icon = getAmenityIcon(am);
                    return (
                      <span key={am} className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 truncate max-w-[100px] flex items-center gap-1">
                        <Icon size={10} />
                        {am}
                      </span>
                    );
                  })}
                  {room.amenities.length > 2 && <span className="text-[10px] text-gray-400">+{room.amenities.length - 2} more</span>}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => setSelectedRoom(room)}
                className={`
                  w-full py-2.5 rounded-lg font-bold text-sm transition-all
                  ${isSelected
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "bg-white border text-blue-600 border-blue-600 active:bg-blue-50"
                  }
                `}
              >
                {isSelected ? "Selected" : "Select"}
              </button>
            </div>
          );
        })}
      </div>

      {/* DESKTOP VIEW: Vertical List (Existing) */}
      <div className="hidden md:flex flex-col gap-6 px-4 md:px-0">
        {roomTypes.map((room) => {
          const isSelected = selectedRoom.name === room.name;

          return (
            <div
              key={room.name}
              className={`
                relative bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden flex flex-col md:flex-row
                ${isSelected
                  ? "border-[#f8a11e] ring-1 ring-[#f8a11e] shadow-md"
                  : "border-gray-200 hover:shadow-md hover:border-gray-300"
                }
              `}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-0 right-0 bg-[#f8a11e] text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-20 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  SELECTED
                </div>
              )}

              {/* IMAGE SECTION */}
              <div className="w-full md:w-[35%] h-48 md:h-auto relative shrink-0">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
                <div className="absolute bottom-3 left-3 text-white font-bold text-lg md:hidden shadow-sm">
                  {room.name}
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="flex-1 p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6">

                {/* DETAILS (Middle on Desktop) */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="hidden md:block">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{room.name}</h3>
                  </div>

                  {/* Capacity Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Bed size={16} className="text-gray-400" />
                      <span>{room.beds}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={16} className="text-gray-400" />
                      <span>Max {room.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Info size={16} className="text-gray-400" />
                      <span>{room.area || "180 sq.ft"}</span>
                    </div>
                  </div>

                  {/* Amenities List */}
                  <div className="mt-2 space-y-1">
                    {room.amenities.slice(0, 4).map((amenity, idx) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <Icon size={14} className="text-green-600 shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                    {room.amenities.length > 4 && (
                      <div className="text-xs text-blue-600 font-medium pl-6 pt-1">
                        +{room.amenities.length - 4} more amenities
                      </div>
                    )}
                  </div>
                </div>

                {/* PRICING & ACTION (Right on Desktop) */}
                <div className="md:w-[28%] md:border-l md:border-gray-100 md:pl-6 flex flex-col justify-between shrink-0">
                  <div className="flex flex-row md:flex-col justify-between items-end md:items-start mb-4 md:mb-0">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900">₹{room.basePrice.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">/ night</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Excludes taxes & fees</div>
                    </div>

                    <div className="mt-2 md:mt-4">
                      {room.refundable ? (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                          <CheckCircle2 size={12} /> Free Cancellation
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 px-2 py-1 rounded">
                          <Ban size={12} /> Non-Refundable
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRoom(room)}
                    className={`
                      w-full py-3 md:py-2.5 rounded-lg font-bold text-sm transition-all duration-200
                      ${isSelected
                        ? "bg-green-600 text-white shadow-sm ring-2 ring-offset-2 ring-green-600"
                        : "bg-white border-2 border-[#f8a11e] text-[#f8a11e] hover:bg-[#fff8ec]"
                      }
                    `}
                  >
                    {isSelected ? "Selected" : "Select Room"}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

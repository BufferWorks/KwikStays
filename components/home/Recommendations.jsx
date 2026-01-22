import React from "react";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { getAmenityIcon } from "@/components/hotel/amenityUtils";

const HotelCard = ({ hotel }) => {
    // Determine location string safely
    const locationName = hotel.city?.name || hotel.locality?.name || "KwikStays";

    return (
        <a
            href={`/hotel/${hotel.slug}`}
            className="group relative flex flex-col bg-white rounded-3xl overflow-hidden hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 hover:border-orange-100/50"
        >
            {/* Image Container - Using 3/2 Aspect Ratio for compact look */}
            <div className="relative aspect-[3/2] overflow-hidden">
                <img
                    src={hotel.heroImage || "/placeholder-hotel.jpg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Floating Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-lg">
                    <Star size={10} className="text-orange-500 fill-orange-500" />
                    <span className="text-[10px] font-bold text-gray-900">
                        {hotel.rating || "New"}
                    </span>
                </div>
            </div>

            {/* Content Container - Compact Spacing */}
            <div className="p-3 flex flex-col flex-1 relative">

                {/* Location Tag */}
                <div className="flex items-center gap-1 text-[10px] font-semibold text-orange-600 uppercase tracking-wider mb-1">
                    <MapPin size={10} />
                    {locationName}
                </div>

                <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1 mb-1 group-hover:text-orange-600 transition-colors">
                    {hotel.name}
                </h3>

                <p className="text-[10px] text-gray-500 line-clamp-1 mb-3">
                    {hotel.address?.area || hotel.locality?.name}, {hotel.city?.name}
                </p>

                {/* Amenities - Tiny & Compact */}
                <div className="flex items-center gap-2 mb-3">
                    {hotel.hotelAmenities && hotel.hotelAmenities.slice(0, 4).map((amenity, index) => {
                        const Icon = getAmenityIcon(amenity);
                        return (
                            <div key={index} className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors" title={amenity}>
                                <Icon size={12} strokeWidth={2.5} />
                            </div>
                        );
                    })}
                </div>

                <div className="mt-auto pt-2 border-t border-gray-50 flex items-end justify-between">
                    <div>
                        <span className="text-[10px] text-gray-400 line-through decoration-red-400 block leading-none mb-0.5">
                            {hotel.originalPrice ? `₹${hotel.originalPrice.toLocaleString("en-IN")}` : ""}
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-extrabold text-gray-900 leading-none">
                                ₹{hotel.priceStartingFrom?.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] font-medium text-gray-400">/night</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

const Recommendations = ({ hotels }) => {
    if (!hotels || hotels.length === 0) return null;

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
                            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Handpicked</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            Recommended Stays
                        </h2>
                    </div>
                </div>

                {/* Mobile Scroll / Desktop Grid */}
                <div className="md:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 flex overflow-x-auto pb-4 md:pb-0 snap-x -mx-4 px-4 scrollbar-hide">
                    {hotels.map((hotel) => (
                        <div key={hotel._id || hotel.id} className="min-w-[240px] max-w-[240px] md:min-w-0 md:max-w-none snap-center">
                            <HotelCard hotel={hotel} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;

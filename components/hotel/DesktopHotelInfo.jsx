import { MapPin, Star, Building2, ChevronRight } from "lucide-react";
import CategoryBadge from "./CategoryBadge";

export default function DesktopHotelInfo({ hotel }) {
    return (
        <div className="hidden md:block pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-start gap-8">
                {/* LEFT SIDE: Info */}
                <div className="w-[60%]">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{hotel.name}</h1>

                    <div className="text-gray-500 text-sm mb-3 truncate">
                        {hotel.address.full}
                    </div>

                    {/* Badges Row */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-700 uppercase tracking-wide border border-gray-200">
                            <Building2 size={12} className="text-gray-500" />
                            Verified Property
                        </div>
                        <CategoryBadge categories={hotel.categories} />
                    </div>

                    {/* Sub-rating Text */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-800 font-medium">
                        <span>{hotel.rating}</span>
                        <span>•</span>
                        <span className="text-gray-600">Check-in rating</span>
                        <ChevronRight size={14} className="text-gray-400" />
                        <span className="text-gray-900">Delightful experience</span>
                    </div>
                </div>

                {/* RIGHT SIDE: Rating Box */}
                <div className="flex flex-col items-start">
                    <div className="bg-[#4caf50] text-white px-4 py-1.5 rounded-md flex items-center gap-1 shadow-sm">
                        <span className="text-xl font-bold">{hotel.rating}</span>
                        <Star size={16} fill="currentColor" strokeWidth={0} />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-medium">
                        {hotel.reviewCount.toLocaleString()} Ratings
                    </div>
                </div>
            </div>
        </div>
    );
}

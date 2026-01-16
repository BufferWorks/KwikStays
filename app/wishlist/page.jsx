"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Heart, MapPin, Wifi, Star, ChevronLeft } from "lucide-react";

export default function WishlistPage() {
    const router = useRouter();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await fetch("/api/user/wishlist");

                if (res.status === 401) {
                    router.push("/api/auth/login");
                    return;
                }

                const data = await res.json();

                if (data.success) {
                    setWishlist(data.wishlist);
                } else {
                    setError(data.message || "Failed to fetch wishlist");
                }
            } catch (err) {
                console.error("Wishlist error:", err);
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-red-500 font-bold hover:underline"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center relative justify-center">
                    <button
                        onClick={() => router.back()}
                        className="absolute left-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Go back"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <div className="flex items-center">
                        <Heart className="w-6 h-6 text-red-500 fill-current mr-3" />
                        <h1 className="text-xl font-bold text-gray-900">My Wishlist</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {wishlist.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Your wishlist is empty
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Save properties you like and come back to them later.
                        </p>
                        <Link
                            href="/"
                            className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-600 transition-colors"
                        >
                            Start Exploring
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {wishlist.map((hotel) => (
                            <Link
                                href={`/hotel/${hotel.slug}`}
                                key={hotel._id || hotel.slug}
                                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative aspect-square bg-gray-200">
                                    {hotel.heroImage ? (
                                        <img
                                            src={hotel.heroImage}
                                            alt={hotel.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                                        <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-3 flex-1 flex flex-col">
                                    <div className="mb-1">
                                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">
                                            {hotel.name}
                                        </h3>
                                    </div>

                                    {/* Amenities - Minimal */}
                                    <div className="flex flex-wrap gap-1 mb-2 max-h-6 overflow-hidden">
                                        {(hotel.hotelAmenities || []).slice(0, 2).map((amenity, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[9px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded border border-gray-100"
                                            >
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Price */}
                                    <div className="mt-auto pt-2 flex flex-col">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-[10px] text-gray-500">₹</span>
                                            <span className="text-base font-bold text-gray-900">
                                                {hotel.priceStartingFrom?.toLocaleString()}
                                            </span>
                                        </div>
                                        {hotel.originalPrice && (
                                            <span className="text-[10px] text-gray-400 line-through">
                                                M.R.P: ₹{hotel.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

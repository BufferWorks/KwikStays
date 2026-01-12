"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
    Calendar,
    MapPin,
    ChevronRight,
    Loader2,
    Clock,
    CheckCircle,
    XCircle,
    Hotel,
} from "lucide-react";

export default function MyBookingsPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch("/api/bookings/my-bookings");

                if (res.status === 401) {
                    router.push("/auth/login");
                    return;
                }

                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.message || "Failed to load bookings");
                }

                setBookings(data.bookings);
            } catch (err) {
                console.error(err);
                setError("Could not load your bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 font-bold text-xl tracking-tight"
                    >
                        <span className="text-[#f8a11e]">Kwik</span>Stayz
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Hotel size={16} className="text-gray-600" />
                    </div>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    My Bookings <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full ml-auto">{bookings.length}</span>
                </h1>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-[#f8a11e] animate-spin mb-4" />
                        <p className="text-gray-500">Loading your trips...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-3 text-sm font-bold underline"
                        >
                            Try Again
                        </button>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="text-gray-300" size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h2>
                        <p className="text-gray-500 mb-6">
                            You haven't made any bookings. Start your journey today!
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="px-6 py-3 bg-[#f8a11e] text-white rounded-xl font-bold hover:bg-[#ffa726] transition-colors"
                        >
                            Explore Hotels
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <BookingCard key={booking._id} booking={booking} router={router} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

function BookingCard({ booking, router }) {
    const { hotel, stay, status, bookingCode } = booking;

    const statusConfig = {
        CONFIRMED: { color: "text-green-600 bg-green-50", icon: CheckCircle, label: "Confirmed" },
        PENDING_PAYMENT: { color: "text-orange-600 bg-orange-50", icon: Clock, label: "Pending" },
        PAYMENT_FAILED: { color: "text-red-600 bg-red-50", icon: XCircle, label: "Failed" },
        EXPIRED: { color: "text-gray-600 bg-gray-50", icon: XCircle, label: "Expired" },
    };

    const config = statusConfig[status] || statusConfig.EXPIRED;
    const StatusIcon = config.icon;

    return (
        <div
            onClick={() => router.push(`/booking/${booking._id}`)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#f8a11e] transition-colors">
                        {hotel?.name || "Hotel Name Unavailable"}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin size={14} /> {hotel?.city || "Unknown City"}
                    </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${config.color}`}>
                    <StatusIcon size={12} />
                    {config.label}
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between text-sm">
                <div>
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Check-in</p>
                    <p className="font-bold text-gray-900">
                        {format(new Date(stay.checkIn), "dd MMM yy")}
                    </p>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div>
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Check-out</p>
                    <p className="font-bold text-gray-900">
                        {format(new Date(stay.checkOut), "dd MMM yy")}
                    </p>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Total</p>
                    <p className="font-bold text-gray-900">₹{booking.pricing.totalPrice.toLocaleString()}</p>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>ID: {bookingCode}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-gray-900 font-medium">
                    View Details <ChevronRight size={14} />
                </span>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
    Loader2,
    MapPin,
    HelpCircle,
    RotateCcw,
    Hotel,
    Calendar,
    Navigation,
    ChevronRight,
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
    console.log(bookings);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-center">
                    <h1 className="text-lg font-bold text-gray-900">
                        My Bookings
                    </h1>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-0 md:px-4 py-4 md:py-6">
                {/* PREVIOUS BOOKINGS HEADER */}
                <div className="px-4 md:px-0 mb-4">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Your Bookings ({bookings.length})
                    </h2>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-3" />
                        <p className="text-gray-500 text-sm font-medium">Loading...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 m-4 rounded-md text-center">
                        <p className="text-sm">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-2 text-sm font-semibold underline"
                        >
                            Retry
                        </button>
                    </div>
                ) : bookings.length === 0 ? (
                    <EmptyState router={router} />
                ) : (
                    <div className="flex flex-col gap-3">
                        {bookings.map((booking) => (
                            <BookingCard key={booking._id} booking={booking} router={router} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

function EmptyState({ router }) {
    return (
        <div className="bg-white p-10 text-center mt-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hotel className="text-gray-300" size={32} />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">No bookings yet</h2>
            <p className="text-sm text-gray-500 mb-6">
                Start your journey with KwikStayz today.
            </p>
            <button
                onClick={() => router.push("/")}
                className="px-8 py-2.5 bg-red-600 text-white text-sm font-bold rounded shadow-sm hover:bg-red-700 transition-colors"
            >
                Book Now
            </button>
        </div>
    );
}

function BookingCard({ booking, router }) {
    const { hotel, stay, status, bookingCode } = booking;
    const heroImage = hotel?.id?.heroImage || "/placeholder-hotel.jpg";

    // Derived values
    const city = hotel?.id?.address?.city || "Unknown City";
    const hotelName = hotel?.name || "Hotel Name";
    const checkIn = format(new Date(stay.checkIn), "dd MMM");
    const checkOut = format(new Date(stay.checkOut), "dd MMM");
    const guestCount = booking.rooms?.reduce((acc, room) => acc + room.guests, 0) || 1;

    // Status Badge Logic
    const StatusBadge = () => {
        switch (status) {
            case "CONFIRMED":
                return <span className="text-[10px] font-bold bg-green-600 text-white px-2 py-0.5 rounded">Confirmed</span>;
            case "CANCELLED":
                return <span className="text-[10px] font-bold bg-gray-500 text-white px-2 py-0.5 rounded">Cancelled</span>;
            case "PAYMENT_FAILED":
                return <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded">Payment Failed</span>;
            case "EXPIRED":
                return <span className="text-[10px] font-bold bg-gray-400 text-white px-2 py-0.5 rounded">Expired</span>;
            case "PENDING_PAYMENT":
                return <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded">Pending Payment</span>;
            default:
                return <span className="text-[10px] font-bold bg-gray-400 text-white px-2 py-0.5 rounded">{status?.replace('_', ' ')}</span>;
        }
    };


    return (
        <div className="bg-white w-full border-b md:border md:rounded-lg border-gray-200 shadow-sm overflow-hidden">
            {/* Top Section: clickable to details */}
            <div
                onClick={() => router.push(`/booking/${booking._id}`)}
                className="p-4 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
                {/* Image */}
                <div className="w-16 h-16 shrink-0 relative">
                    <img
                        src={heroImage}
                        alt={hotelName}
                        className="w-full h-full object-cover rounded-md"
                    />
                    {/* Brand logo overlay if needed */}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h3 className="text-base font-bold text-gray-800 leading-tight mb-1 truncate">
                            {city}
                        </h3>
                        <StatusBadge />
                    </div>

                    <p className="text-sm text-gray-500 mb-1">
                        {checkIn} - {checkOut} • {guestCount} Guests
                    </p>

                    <p className="text-xs text-gray-400 font-medium truncate">
                        {hotelName} • {bookingCode}
                    </p>
                </div>
            </div>

            {/* Bottom Actions Divider */}
            <div className="h-px bg-gray-100 w-full" />

            {/* Actions Bar */}
            <div className="flex items-center text-sm font-medium text-gray-600">
                {/* Action 1 */}
                <button
                    onClick={() => {
                        if (status === "CONFIRMED" || status === "PENDING_PAYMENT") {
                            router.push(`/booking/${booking._id}`);
                        } else {
                            if (hotel?.id?.slug) {
                                router.push(`/hotel/${hotel.id.slug}`);
                            } else {
                                router.push("/");
                            }
                        }
                    }}
                    className="flex-1 py-3 hover:bg-gray-50 hover:text-red-600 flex items-center justify-center gap-2 border-r border-gray-100 transition-colors"
                >
                    {status === "CONFIRMED" || status === "PENDING_PAYMENT" ? (
                        <><Navigation size={16} /> Directions</>
                    ) : (
                        <><RotateCcw size={16} /> Book Again</>
                    )}
                </button>

                {/* Action 2 */}
                <button
                    onClick={() => router.push("/support")}
                    className="flex-1 py-3 hover:bg-gray-50 hover:text-red-600 flex items-center justify-center gap-2 transition-colors"
                >
                    <HelpCircle size={16} /> Need Help?
                </button>
            </div>
        </div>
    );
}


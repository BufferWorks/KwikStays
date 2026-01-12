"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Loader2,
  CheckCircle,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  Phone,
  Mail,
  Home,
  ChevronRight,
  Printer,
  Share2,
} from "lucide-react";

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load booking");
        }

        setBooking(data.booking);
      } catch (err) {
        console.error(err);
        setError("Could not load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) return <LoadingState />;
  if (error)
    return <ErrorState message={error} onHome={() => router.push("/")} />;
  if (!booking) return null;

  const {
    bookingCode,
    hotel,
    stay,
    guestDetails,
    pricing,
    status,
    paymentId,
    createdAt,
  } = booking;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Success Banner */}
        <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg mb-6 relative overflow-visible">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="text-green-200" size={24} />
                <h1 className="text-2xl font-bold">Booking Confirmed</h1>
              </div>
              <p className="text-green-100">
                Your booking ID is{" "}
                <span className="font-mono font-bold bg-green-700/50 px-2 py-0.5 rounded">
                  {bookingCode}
                </span>
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-2 text-right">
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                  title="Print Booking"
                >
                  <Printer size={18} />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white">
                  <Share2 size={18} />
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                  title="Home"
                >
                  <Home size={18} />
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-200">Booked on</p>
                <p className="font-medium">
                  {format(new Date(createdAt), "dd MMM yyyy, hh:mm a")}
                </p>
              </div>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-32 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-2xl pointer-events-none"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT COLUMN - MAIN DETAILS */}
          <div className="md:col-span-2 space-y-6">
            {/* Hotel Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {hotel.image && (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h2>
                <div className="flex items-start gap-2 text-gray-600 text-sm mb-4">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <p>
                    {hotel.address}, {hotel.city}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-medium text-sm bg-blue-50 px-3 py-2 rounded-lg w-fit">
                  <Home size={16} />
                  {booking.roomType.name}
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="text-[#f8a11e]" size={20} />
                Stay Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Check-in
                  </p>
                  <p className="font-bold text-gray-900 text-lg">
                    {format(new Date(stay.checkIn), "dd MMM")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(stay.checkIn), "yyyy")}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">12:00 PM</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Check-out
                  </p>
                  <p className="font-bold text-gray-900 text-lg">
                    {format(new Date(stay.checkOut), "dd MMM")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(stay.checkOut), "yyyy")}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">11:00 AM</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{stay.nights} Night(s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {booking.rooms.length} Room(s)
                  </span>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="text-[#f8a11e]" size={20} />
                Guest Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {guestDetails.fullName}
                    </p>
                    <p className="text-xs text-gray-500">Primary Guest</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {guestDetails.email}
                    </p>
                    <p className="text-xs text-gray-500">Email Address</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      +91 {guestDetails.mobile}
                    </p>
                    <p className="text-xs text-gray-500">Mobile Number</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - PRICE & PAYMENT */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="text-[#f8a11e]" size={20} />
                Payment Summary
              </h3>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Base Price</span>
                  <span>₹{pricing.basePriceTotal.toLocaleString()}</span>
                </div>
                {pricing.totalExtraGuestCost > 0 && (
                  <div className="flex justify-between">
                    <span>Extra Guest Charges</span>
                    <span>₹{pricing.totalExtraGuestCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium text-green-600">
                  <span>Taxes & Fees</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-dashed border-gray-200 my-2"></div>
                <div className="flex justify-between items-center text-gray-900 text-lg font-bold">
                  <span>Total Paid</span>
                  <span>₹{pricing.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Payment Status</span>
                  <span
                    className={`font-bold ${
                      status === "CONFIRMED"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {status === "CONFIRMED" ? "PAID" : status}
                  </span>
                </div>
                {paymentId?.transactionId && (
                  <div className="flex flex-col gap-1 text-xs text-gray-500">
                    <span>Transaction ID</span>
                    <span className="font-mono text-gray-900 break-all">
                      {paymentId.transactionId}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Payment Method</span>
                  <span className="font-medium text-gray-900">
                    PhonePe / UPI
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => router.push("/")}
                  className="text-[#f8a11e] font-bold text-sm hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  Book Another Stay <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-sm text-blue-700 mb-4">
                If you have any issues with your booking, feel free to contact
                our support team.
              </p>
              <button className="w-full bg-white text-blue-600 font-bold py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-[#f8a11e] animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading details...</p>
      </div>
    </div>
  );
}

function ErrorState({ message, onHome }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Error Loading Booking
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onHome}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

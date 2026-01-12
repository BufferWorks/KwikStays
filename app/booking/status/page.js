"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle, Clock, Hotel } from "lucide-react";

import { Suspense } from "react";

export default function BookingStatusPage() {
  return (
    <Suspense
      fallback={
        <CenteredLayout>
          <LoadingState />
        </CenteredLayout>
      }
    >
      <BookingStatusContent />
    </Suspense>
  );
}

function BookingStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookingId = searchParams.get("bookingId");

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [redirectTimer, setRedirectTimer] = useState(3);

  /* ---------------- POLLING CONFIG ---------------- */

  const POLL_INTERVAL = 3000; // 3 sec
  const MAX_ATTEMPTS = 20; // ~1 minute
  let attempts = 0;

  useEffect(() => {
    if (!bookingId) {
      router.replace("/");
      return;
    }

    let intervalId;

    const fetchStatus = async () => {
      try {
        attempts++;

        const res = await fetch(`/api/bookings/status?bookingId=${bookingId}`);
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch status");
        }

        setStatus(data.booking);
        console.log(data);

        /* -------- STOP POLLING ON FINAL STATE -------- */

        if (
          data.booking.status === "CONFIRMED" ||
          data.booking.status === "PAYMENT_FAILED" ||
          data.booking.status === "EXPIRED"
        ) {
          clearInterval(intervalId);
          setLoading(false);

          if (data.booking.status === "CONFIRMED") {
            const redirectInterval = setInterval(() => {
              setRedirectTimer((prev) => {
                if (prev <= 1) {
                  clearInterval(redirectInterval);
                  router.push(`/booking/${data.booking.id}`);
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          }
        }

        if (attempts >= MAX_ATTEMPTS) {
          clearInterval(intervalId);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to verify booking status");
        setLoading(false);
        clearInterval(intervalId);
      }
    };

    fetchStatus();
    intervalId = setInterval(fetchStatus, POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [bookingId, router]);

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <CenteredLayout>
        <LoadingState />
      </CenteredLayout>
    );
  }

  if (error) {
    return (
      <CenteredLayout>
        <ErrorState message={error} onHome={() => router.push("/")} />
      </CenteredLayout>
    );
  }

  if (!status) return null;

  switch (status.status) {
    case "CONFIRMED":
      return (
        <CenteredLayout>
          <SuccessState status={status} timer={redirectTimer} />
        </CenteredLayout>
      );

    case "PAYMENT_FAILED":
      return (
        <CenteredLayout>
          <FailedState status={status} retry={() => router.back()} />
        </CenteredLayout>
      );

    case "EXPIRED":
      return (
        <CenteredLayout>
          <ExpiredState onHome={() => router.push("/")} />
        </CenteredLayout>
      );

    default:
      return (
        <CenteredLayout>
          <PendingState />
        </CenteredLayout>
      );
  }
}

/* ================================================= */
/* ================= UI COMPONENTS ================= */
/* ================================================= */

function CenteredLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center border border-gray-100 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="py-8">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#f8a11e] rounded-full border-t-transparent animate-spin"></div>
        <Hotel className="absolute inset-0 m-auto text-gray-400 w-6 h-6 animate-pulse" />
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Verifying Payment
      </h2>
      <p className="text-sm text-gray-500 max-w-[260px] mx-auto">
        Please verify the payment in your UPI app. Do not refresh or close this
        page.
      </p>
    </div>
  );
}

function PendingState() {
  return (
    <div className="py-8">
      <div className="w-16 h-16 mx-auto bg-amber-50 rounded-full flex items-center justify-center mb-6 ring-4 ring-amber-100">
        <Clock className="w-8 h-8 text-amber-500 animate-pulse" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Pending</h2>
      <p className="text-sm text-gray-500">
        We are waiting for confirmation from your bank...
      </p>
    </div>
  );
}

function SuccessState({ status, timer }) {
  return (
    <div className="py-6">
      <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-100 animate-bounce-slow">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Booking Confirmed!
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Your stay is securely booked.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-left space-y-3 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Hotel
          </span>
          <span className="text-sm font-bold text-gray-900 text-right truncate max-w-[180px]">
            {status.hotelName}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Amount Paid
          </span>
          <div className="flex items-center gap-1.5 bg-green-100 px-2 py-0.5 rounded text-green-700">
            <CheckCircle size={12} />
            <span className="text-sm font-bold">
              ₹{status.amount?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => (window.location.href = `/booking/${status.id}`)}
        className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-all shadow-lg hover:shadow-gray-300 flex items-center justify-center gap-2"
      >
        <span>View Booking Details</span>
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <Loader2 size={12} className="animate-spin" />
        <span>Redirecting in {timer} seconds...</span>
      </div>
    </div>
  );
}

function FailedState({ retry }) {
  return (
    <div className="py-6">
      <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-100">
        <XCircle className="w-10 h-10 text-red-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
      <p className="text-sm text-gray-500 mb-8 max-w-[280px] mx-auto">
        We couldn't process your payment. If money was deducted, it will be
        refunded within 3-5 days.
      </p>

      <button
        onClick={retry}
        className="w-full py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200"
      >
        Retry Payment
      </button>
    </div>
  );
}

function ExpiredState({ onHome }) {
  return (
    <div className="py-6">
      <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-gray-100">
        <Clock className="w-10 h-10 text-gray-400" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Expired</h2>
      <p className="text-sm text-gray-500 mb-8">
        The payment session time has run out.
      </p>

      <button
        onClick={onHome}
        className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-all"
      >
        Back to Home
      </button>
    </div>
  );
}

function ErrorState({ message, onHome }) {
  return (
    <div className="py-6">
      <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-100">
        <XCircle className="w-10 h-10 text-red-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-gray-500 mb-8">{message}</p>

      <button
        onClick={onHome}
        className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-bold"
      >
        Go Home
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, ArrowRight, Loader2, Calendar, FileText } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getApiUrl } from "@/lib/api-config";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("booking_id");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !bookingId) {
        setLoading(false);
        setErrorMessage("Missing payment session parameters.");
        return;
      }

      try {
        const apiUrl = getApiUrl();
        const res = await fetch(`${apiUrl}/api/payments/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ sessionId, bookingId }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setSuccess(true);
          setBooking(data.booking);
        } else {
          setErrorMessage(data.message || "Could not verify payment session.");
        }
      } catch (err: any) {
        setErrorMessage(err.message || "Network error verifying payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, bookingId]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
        {loading ? (
          <div className="space-y-4 py-8">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto" />
            <h2 className="text-xl font-black text-slate-800">
              Verifying Your Rental Payment...
            </h2>
            <p className="text-xs text-slate-500">
              Please wait while we confirm your transaction with Stripe and prepare your rental contract.
            </p>
          </div>
        ) : success ? (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">
                Payment Confirmed
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-1">
                Equipment Booked Successfully!
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Your reservation has been confirmed and registered with the equipment owner.
              </p>
            </div>

            {booking && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs space-y-2">
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Equipment:</span>
                  <span className="text-slate-900 font-bold">{booking.equipmentName}</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Total Paid:</span>
                  <span className="text-emerald-600 font-black">${booking.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Booking Reference:</span>
                  <span className="font-mono text-slate-500">{booking._id?.slice(-8)}</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Rental Period:</span>
                  <span>
                    {booking.rentalStartDate || booking.startDate ? new Date(booking.rentalStartDate || booking.startDate).toLocaleDateString() : 'N/A'} - {booking.rentalEndDate || booking.endDate ? new Date(booking.rentalEndDate || booking.endDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <Link
                href="/dashboard/customer/my-rentals"
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                Go to My Rentals Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/all-equipment"
                className="block text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Continue Browsing Marketplace
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-9 h-9" />
            </div>

            <div>
              <h1 className="text-xl font-black text-slate-900">
                Payment Verification Notice
              </h1>
              <p className="text-xs text-slate-500 mt-2">
                {errorMessage || "We encountered an issue verifying the payment status."}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard/customer/my-rentals"
                className="inline-block px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                View My Rentals
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}

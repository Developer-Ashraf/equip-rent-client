export const dynamic = "force-dynamic";

import { authFetch } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Link from "next/link";
import { Booking } from "@/types";
import { CalendarCheck, ArrowRight, ExternalLink, Clock, AlertCircle } from "lucide-react";

export default async function CustomerRentalsPage() {
  let rentals: Booking[] = [];

  try {
    const res = await authFetch("/api/customer/my-rentals");
    if (res.ok) {
      const data = await res.json();
      rentals = Array.isArray(data) ? data : (data.rentals || data.items || []);
    }
  } catch (error) {
    console.error("Failed to load customer rentals:", error);
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="My Equipment Rentals"
        subtitle="Track your active equipment leases, booking schedules, and payment receipts."
        action={
          <Link
            href="/all-equipment"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            Browse New Equipment
          </Link>
        }
      />

      {/* Rentals Table */}
      {rentals.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                  <th className="py-4 px-6">Equipment</th>
                  <th className="py-4 px-6">Rental Duration</th>
                  <th className="py-4 px-6">Quantity</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {rentals.map((rental) => (
                  <tr key={rental._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">
                          {rental.equipmentName}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Ref: {rental._id?.slice(-8)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-slate-800">
                        {new Date(rental.startDate || (rental as any).rentalStartDate).toLocaleDateString()} -{" "}
                        {new Date(rental.endDate || (rental as any).rentalEndDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {rental.quantity || (rental as any).requiredQuantity || 1} unit{(rental.quantity || (rental as any).requiredQuantity || 1) > 1 ? "s" : ""}
                    </td>
                    <td className="py-4 px-6 font-extrabold text-slate-900">
                      ${rental.totalAmount?.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                          rental.paymentStatus === "paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {rental.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                          rental.bookingStatus === "confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : rental.bookingStatus === "completed"
                            ? "bg-slate-100 text-slate-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {rental.bookingStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/equipment/${rental.equipmentId}`}
                        className="inline-flex items-center gap-1 font-bold text-orange-600 hover:text-orange-700"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            You haven't rented any equipment yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our catalog of high-grade construction, photography, and event equipment and book with secure checkout.
          </p>
          <div className="pt-2">
            <Link
              href="/all-equipment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              Explore Equipment Catalog
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

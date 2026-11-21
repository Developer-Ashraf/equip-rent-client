import { authFetch } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Booking } from "@/types";
import { CalendarCheck, DollarSign, Package } from "lucide-react";

export default async function AdminAllRentalsPage() {
  let rentals: Booking[] = [];

  try {
    const res = await authFetch("/api/admin/all-rentals");
    if (res.ok) {
      const data = await res.json();
      rentals = data.rentals || [];
    }
  } catch (error) {
    console.error("Failed to load admin all rentals:", error);
  }

  const totalGMV = rentals
    .filter((r) => r.paymentStatus === "paid")
    .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Global Platform Rental Transactions"
        subtitle="Real-time ledger of all equipment booking reservations and Stripe settlements."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">
              Total Settled Volume
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              ${totalGMV.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">
              Total Contracts
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              {rentals.length}
            </h3>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">
              Completed Deals
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              {rentals.filter((r) => r.paymentStatus === "paid").length}
            </h3>
          </div>
        </div>
      </div>

      {rentals.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                  <th className="py-4 px-6">Equipment</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Owner</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {rentals.map((rental) => (
                  <tr key={rental._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-900 text-sm block">
                        {rental.equipmentName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ID: {rental._id?.slice(-8)}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      {rental.customerEmail}
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {rental.ownerEmail || "EquipRent Depot"}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-slate-800">
                      {new Date(rental.startDate).toLocaleDateString()} -{" "}
                      {new Date(rental.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 font-black text-slate-900">
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
            No platform rental orders recorded
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Bookings created by customers will appear in this administrative ledger once submitted.
          </p>
        </div>
      )}
    </div>
  );
}

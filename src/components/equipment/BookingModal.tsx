"use client";

import { useState } from "react";
import { Equipment } from "@/types";
import { X, Calendar, MapPin, Phone, FileText, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { getApiUrl } from "@/lib/api-config";

interface BookingModalProps {
  equipment: Equipment;
  isOpen: boolean;
  onClose: () => void;
  userToken?: string;
}

export default function BookingModal({
  equipment,
  isOpen,
  onClose,
  userToken,
}: BookingModalProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Calculate duration
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  let duration = 1;

  if (start && end && end >= start) {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    if (equipment.rentalType === "Weekly") {
      duration = Math.ceil(diffDays / 7) || 1;
    } else if (equipment.rentalType === "Monthly") {
      duration = Math.ceil(diffDays / 30) || 1;
    } else {
      duration = diffDays;
    }
  }

  const totalAmount = duration * equipment.price * quantity;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Please select both start and end rental dates");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast.error("Rental end date cannot be before start date");
      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error("Please enter delivery / pickup address");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please provide a contact phone number");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/bookings/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken || ""}`,
        },
        credentials: "include",
        body: JSON.stringify({
          equipmentId: equipment._id,
          equipmentName: equipment.name,
          equipmentImage: equipment.image,
          rentalPrice: equipment.price ?? equipment.rentalPrice ?? 0,
          rentalType: equipment.rentalType,
          startDate,
          endDate,
          rentalStartDate: startDate,
          rentalEndDate: endDate,
          quantity: Number(quantity),
          requiredQuantity: Number(quantity),
          deliveryAddress,
          phone,
          contactNumber: phone,
          notes,
          additionalNotes: notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create checkout session");
      }

      if (data.url) {
        toast.success("Redirecting to secure payment checkout...");
        window.location.href = data.url;
      } else {
        toast.success("Booking submitted successfully!");
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong creating booking");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Rent Equipment
            </h2>
            <p className="text-xs text-slate-500 font-medium line-clamp-1">
              {equipment.name} • ${equipment.price}/{equipment.rentalType.toLowerCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleBooking} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                End Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  required
                  min={startDate || new Date().toISOString().split("T")[0]}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Quantity (Max: {equipment.quantity})
            </label>
            <input
              type="number"
              min={1}
              max={equipment.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(equipment.quantity, Math.max(1, Number(e.target.value))))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Delivery / Site Location Address
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <textarea
                required
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Street address, city, site delivery note..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Contact Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>
          </div>

          {/* Special notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Special Notes / Operator Requests (Optional)
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special handling, delivery instructions, or certification..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>
          </div>

          {/* Price Calculation Summary Box */}
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Rental Rate:</span>
              <span>${equipment.price} / {equipment.rentalType.toLowerCase()}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Duration:</span>
              <span>{duration} {equipment.rentalType === "Daily" ? "Day(s)" : equipment.rentalType === "Weekly" ? "Week(s)" : "Month(s)"}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Units:</span>
              <span>{quantity}</span>
            </div>
            <div className="pt-2 border-t border-orange-200 flex justify-between items-center">
              <span className="text-sm font-extrabold text-slate-900">Total Rental Cost:</span>
              <span className="text-xl font-black text-orange-600">${totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Notice */}
          <div className="flex items-start gap-2 text-[11px] text-slate-500">
            <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>
              By proceeding to checkout, you agree to the equipment rental terms and condition guidelines. Security deposit handling is subject to owner inspection upon return.
            </span>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Checkout...
                </>
              ) : (
                `Proceed to Checkout • $${totalAmount.toLocaleString()}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

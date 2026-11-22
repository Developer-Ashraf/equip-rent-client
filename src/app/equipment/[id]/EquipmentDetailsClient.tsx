"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Equipment } from "@/types";
import BookingModal from "@/components/equipment/BookingModal";
import {
  Heart,
  Calendar,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Truck,
  Layers,
  Sparkles,
  Share2,
  ArrowLeft,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

interface EquipmentDetailsClientProps {
  equipment: Equipment;
  user: any | null;
  userToken?: string;
}

export default function EquipmentDetailsClient({
  equipment,
  user,
  userToken,
}: EquipmentDetailsClientProps) {
  const router = useRouter();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const handleFavorite = async () => {
    if (!user) {
      toast.error("Please log in to save items to your favorites");
      router.push(`/login?callbackUrl=/equipment/${equipment._id}`);
      return;
    }

    setIsFavoriteLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ equipmentId: equipment._id }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update favorites");
      }

      setIsFavorited(true);
      toast.success(data.message || "Added to favorites!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const handleBookClick = () => {
    if (!user) {
      toast.error("Please log in to book this equipment");
      router.push(`/login?callbackUrl=/equipment/${equipment._id}`);
      return;
    }
    setIsBookingOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const isAvailable = equipment.status === "approved" && equipment.quantity > 0;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/all-equipment"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
              title="Share Equipment"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleFavorite}
              disabled={isFavoriteLoading}
              className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-sm font-bold ${
                isFavorited
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-white border-slate-200 text-slate-600 hover:text-rose-600"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${isFavorited ? "fill-rose-500 text-rose-500" : ""}`}
              />
              <span className="hidden sm:inline">
                {isFavorited ? "Saved" : "Save Favorite"}
              </span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image and Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm group">
              <Image
                src={equipment.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200"}
                alt={equipment.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-orange-600 text-white shadow-md">
                  {equipment.category}
                </span>
                <span
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md ${
                    isAvailable
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

            {/* Specifications Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Machine Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Brand
                  </span>
                  <span className="text-sm font-black text-slate-800">
                    {equipment.brand || "Industrial Standard"}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Model
                  </span>
                  <span className="text-sm font-black text-slate-800">
                    {equipment.model || "Commercial Pro"}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Condition
                  </span>
                  <span className="text-sm font-black text-emerald-600">
                    {equipment.condition || "Excellent"}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    In Stock
                  </span>
                  <span className="text-sm font-black text-slate-800">
                    {equipment.quantity} units
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                Detailed Equipment Description
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {equipment.description}
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-600" />
                Rental Policy & Insurance Coverage
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {equipment.rentalTerms ||
                  "Standard rental protocol applies. Equipment must be operated by qualified personnel and returned in the same structural condition. A refundable security deposit is held during the active lease period."}
              </p>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              {/* Header */}
              <div>
                <span className="text-xs font-extrabold uppercase text-orange-600 tracking-wider">
                  {equipment.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {equipment.name}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>{equipment.location || "Central Equipment Depot, Hub"}</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black text-slate-900">
                    ${equipment.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 ml-1">
                    /{equipment.rentalType.toLowerCase()}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200">
                  {equipment.rentalType} Rate
                </span>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Fully serviced, certified & inspected prior to dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <span>Flexible on-site delivery or local facility pickup</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Protected with equipment operational damage warranty</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleBookClick}
                  disabled={!isAvailable}
                  className="w-full py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base transition-all shadow-lg hover:shadow-orange-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  {isAvailable ? "Book This Equipment Now" : "Currently Unavailable"}
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  Instant reservation confirmation with secure checkout processing
                </p>
              </div>

              {/* Owner Info Card */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-black">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block">
                    Listed By Verified Partner
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {equipment.ownerName || "EquipRent Commercial Partner"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        equipment={equipment}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        userToken={userToken}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ExternalLink, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

interface FavoritesClientProps {
  initialFavorites: any[];
}

export default function FavoritesClient({ initialFavorites }: FavoritesClientProps) {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (equipmentId: string) => {
    setRemovingId(equipmentId);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://equip-rent-server-sepia.vercel.app";
      const res = await fetch(`${apiUrl}/api/favorites/${equipmentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to remove favorite");
      }

      setFavorites((prev) => prev.filter((item) => (item.equipment?._id || item.equipmentId) !== equipmentId));
      toast.success("Removed from saved favorites");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove favorite");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => {
            const item = fav.equipment || fav;
            const itemId = item._id || fav.equipmentId;

            return (
              <div
                key={fav._id || itemId}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-video w-full bg-slate-900">
                  <Image
                    src={item.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"}
                    alt={item.name || "Equipment"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleRemove(itemId)}
                      disabled={removingId === itemId}
                      className="p-2 rounded-full bg-white/90 hover:bg-rose-50 text-rose-600 shadow-sm transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase text-orange-600 tracking-wider">
                      {item.category || "General"}
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-slate-900">
                        ${item.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        /{item.rentalType?.toLowerCase() || "day"}
                      </span>
                    </div>

                    <Link
                      href={`/equipment/${itemId}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      <span>Rent Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            No saved favorites yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You can bookmark industrial machines, tools, and cameras while browsing to compare and book later.
          </p>
          <div className="pt-2">
            <Link
              href="/all-equipment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              Browse Equipment
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

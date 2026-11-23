"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ExternalLink, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { getApiUrl } from "@/lib/api-config";
import { authClient } from "@/lib/auth-client";

interface FavoritesClientProps {
  initialFavorites: any[];
}

export default function FavoritesClient({ initialFavorites }: FavoritesClientProps) {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (initialFavorites && initialFavorites.length > 0) {
      setFavorites(initialFavorites);
    } else {
      const fetchFavorites = async () => {
        try {
          const sessionRes = await (authClient as any).getSession();
          const token = sessionRes?.data?.session?.token;
          const userEmail = sessionRes?.data?.user?.email;

          const apiUrl = getApiUrl();
          const res = await fetch(`${apiUrl}/api/favorites`, {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
              ...(userEmail ? { "x-user-email": userEmail } : {}),
            },
            credentials: "include",
          });

          if (res.ok) {
            const data = await res.json();
            const list = Array.isArray(data) ? data : (data.favorites || data.items || []);
            setFavorites(list);
          }
        } catch {}
      };
      fetchFavorites();
    }
  }, [initialFavorites]);

  const handleRemove = async (favId: string, eqId: string) => {
    const targetId = favId || eqId;
    setRemovingId(targetId);

    // Optimistically update state immediately without page reload
    setFavorites((prev) =>
      prev.filter((f) => {
        const fFavId = f._id ? f._id.toString() : "";
        const fEqId = (f.equipmentId || f.equipment?._id || f._id)?.toString();
        return fFavId !== favId && fEqId !== eqId && fFavId !== targetId && fEqId !== targetId;
      })
    );

    try {
      let token = "";
      let userEmail = "";
      try {
        const sessionRes = await (authClient as any).getSession();
        token = sessionRes?.data?.session?.token || "";
        userEmail = sessionRes?.data?.user?.email || "";
      } catch {}

      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/favorites/${targetId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(userEmail ? { "x-user-email": userEmail } : {}),
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to remove favorite");
      }

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
            const favId = fav._id ? fav._id.toString() : "";
            const eqId = (fav.equipmentId || fav.equipment?._id || favId)?.toString();

            return (
              <div
                key={favId || eqId}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-video w-full bg-slate-900">
                  <Image
                    src={item.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"}
                    alt={item.name || item.equipmentName || "Equipment"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleRemove(favId, eqId)}
                      disabled={removingId === favId || removingId === eqId}
                      className="p-2 rounded-xl bg-white/90 backdrop-blur-md text-red-500 hover:bg-white hover:text-red-600 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-orange-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                      {item.category || "General"}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base line-clamp-1">
                      {item.name || item.equipmentName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {item.location ? `Located in ${item.location}` : "High quality industrial equipment ready for rent."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold block">Rate</span>
                      <span className="text-lg font-black text-slate-900">
                        ${item.price || item.rentalPrice}
                        <span className="text-xs font-semibold text-slate-500">/{item.rentalType || "Day"}</span>
                      </span>
                    </div>

                    <Link
                      href={`/equipment/${item.equipmentId || eqId}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      Book Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">No saved favorites yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You can bookmark industrial machines, tools, and cameras while browsing to compare and book later.
            </p>
          </div>
          <Link
            href="/all-equipment"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            Browse Equipment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

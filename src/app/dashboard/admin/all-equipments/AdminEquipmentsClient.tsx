"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Equipment } from "@/types";
import { Check, X, Trash2, ExternalLink, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface AdminEquipmentsClientProps {
  initialEquipments: Equipment[];
}

export default function AdminEquipmentsClient({
  initialEquipments,
}: AdminEquipmentsClientProps) {
  const [equipments, setEquipments] = useState(initialEquipments);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setProcessingId(id);
    try {
      const sessionRes = await (authClient as any).getSession();
      const token = sessionRes?.data?.session?.token;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://equip-rent-server-sepia.vercel.app";
      const res = await fetch(`${apiUrl}/api/equipments/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setEquipments((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus as any } : e))
      );
      toast.success(`Equipment marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this listing?")) {
      return;
    }

    setProcessingId(id);
    try {
      const sessionRes = await (authClient as any).getSession();
      const token = sessionRes?.data?.session?.token;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://equip-rent-server-sepia.vercel.app";
      const res = await fetch(`${apiUrl}/api/equipments/${id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete equipment");
      }

      setEquipments((prev) => prev.filter((e) => e._id !== id));
      toast.success("Equipment listing deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete equipment");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
              <th className="py-4 px-6">Equipment</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Rate</th>
              <th className="py-4 px-6">Owner</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {equipments.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={item.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {item.brand || "Industrial"} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-slate-600">
                  {item.category}
                </td>
                <td className="py-4 px-6 font-black text-slate-900">
                  ${item.price}
                  <span className="text-[10px] text-slate-400 font-normal">
                    /{item.rentalType?.toLowerCase()}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-semibold text-slate-800 block">
                    {item.ownerName || "Owner"}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.ownerEmail}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      item.status === "approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : item.status === "rejected"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status || "pending"}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/equipment/${item._id}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      title="Inspect Listing"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {item.status !== "approved" && (
                      <button
                        onClick={() => handleStatusUpdate(item._id, "approved")}
                        disabled={processingId === item._id}
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer"
                        title="Approve Equipment"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}

                    {item.status !== "rejected" && (
                      <button
                        onClick={() => handleStatusUpdate(item._id, "rejected")}
                        disabled={processingId === item._id}
                        className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors cursor-pointer"
                        title="Reject Listing"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={processingId === item._id}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                      title="Permanently Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

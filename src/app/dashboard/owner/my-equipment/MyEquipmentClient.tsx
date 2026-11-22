"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Equipment } from "@/types";
import { Edit2, Trash2, ExternalLink, PlusCircle, Package } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface MyEquipmentClientProps {
  initialEquipments: Equipment[];
}

export default function MyEquipmentClient({
  initialEquipments,
}: MyEquipmentClientProps) {
  const [equipments, setEquipments] = useState(initialEquipments);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this equipment listing?")) {
      return;
    }

    setDeletingId(id);
    try {
      const sessionRes = await (authClient as any).getSession();
      const token = sessionRes?.data?.session?.token;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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

      setEquipments((prev) => prev.filter((item) => item._id !== id));
      toast.success("Equipment deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong deleting equipment");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {equipments.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                  <th className="py-4 px-6">Equipment</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Rental Rate</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
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
                            {item.brand || "Industrial"} • {item.model || "Standard"}
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
                        /{item.rentalType.toLowerCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {item.quantity} units
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
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/equipment/${item._id}`}
                          className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          title="View on site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/dashboard/owner/my-equipment/edit/${item._id}`}
                          className="p-2 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                          title="Edit Equipment"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={deletingId === item._id}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Listing"
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
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            No equipment listings yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Add your industrial and professional tools to start receiving rental requests and earning recurring revenue.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/owner/add-equipment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Add Equipment Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

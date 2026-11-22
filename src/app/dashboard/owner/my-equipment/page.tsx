import { authFetch } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import MyEquipmentClient from "./MyEquipmentClient";
import { Equipment } from "@/types";

export default async function OwnerMyEquipmentPage() {
  let equipments: Equipment[] = [];

  try {
    const res = await authFetch("/api/owner/my-equipment");
    if (res.ok) {
      const data = await res.json();
      equipments = Array.isArray(data) ? data : (data.equipments || data.items || []);
    }
  } catch (error) {
    console.error("Failed to load owner equipment:", error);
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="My Equipment Catalog"
        subtitle="Manage your inventory, update pricing rates, and track approval status."
        action={
          <Link
            href="/dashboard/owner/add-equipment"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Equipment</span>
          </Link>
        }
      />

      <MyEquipmentClient initialEquipments={equipments} />
    </div>
  );
}

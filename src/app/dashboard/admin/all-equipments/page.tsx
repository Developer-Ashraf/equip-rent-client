import { authFetch } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AdminEquipmentsClient from "./AdminEquipmentsClient";
import { Equipment } from "@/types";

export default async function AdminAllEquipmentsPage() {
  let equipments: Equipment[] = [];

  try {
    const res = await authFetch("/api/equipments?status=all&limit=100");
    if (res.ok) {
      const data = await res.json();
      equipments = Array.isArray(data) ? data : (data.equipments || data.items || []);
    }
  } catch (error) {
    console.error("Failed to load all equipment for admin:", error);
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Equipment Moderation & Approvals"
        subtitle="Review, approve, or reject submissions from equipment partners across the network."
      />
      <AdminEquipmentsClient initialEquipments={equipments} />
    </div>
  );
}

import { authFetch } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AdminAnalyticsClient from "./AdminAnalyticsClient";

export default async function AdminAnalyticsPage() {
  let stats = {
    totalUsers: 0,
    totalEquipments: 0,
    totalBookings: 0,
    totalRevenue: 0,
    monthlyData: [],
    roleDistribution: [],
  };

  try {
    const res = await authFetch("/api/admin/analytics");
    if (res.ok) {
      const data = await res.json();
      const payload = data.analytics || data;
      stats = {
        totalUsers: payload.totalUsers ?? 0,
        totalEquipments: payload.totalEquipments ?? 0,
        totalBookings: payload.totalBookings ?? 0,
        totalRevenue: payload.totalRevenue ?? 0,
        monthlyData: payload.monthlyData || payload.monthlyStats || [],
        roleDistribution: payload.roleDistribution || [],
      };
    }
  } catch (error) {
    console.error("Failed to load admin analytics:", error);
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Platform Administration & Analytics"
        subtitle="Global transaction monitoring, inventory health, and user metrics."
      />
      <AdminAnalyticsClient stats={stats} />
    </div>
  );
}

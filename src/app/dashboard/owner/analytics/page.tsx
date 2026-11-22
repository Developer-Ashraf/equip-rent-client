import { authFetch } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OwnerAnalyticsClient from "./OwnerAnalyticsClient";

export default async function OwnerAnalyticsPage() {
  let stats = {
    totalRevenue: 0,
    totalListings: 0,
    completedRentals: 0,
    totalBookings: 0,
    monthlyData: [],
    categoryDistribution: [],
  };

  try {
    const res = await authFetch("/api/owner/analytics");
    if (res.ok) {
      const data = await res.json();
      const payload = data.analytics || data;
      stats = {
        totalRevenue: payload.totalRevenue ?? payload.totalEarnings ?? 0,
        totalListings: payload.totalListings ?? payload.totalListed ?? 0,
        completedRentals: payload.completedRentals ?? 0,
        totalBookings: payload.totalBookings ?? payload.totalOwnerBookings ?? 0,
        monthlyData: payload.monthlyData || [],
        categoryDistribution: payload.categoryDistribution || [],
      };
    }
  } catch (error) {
    console.error("Failed to load owner analytics:", error);
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Owner Analytics & Revenue"
        subtitle="Live performance metrics, utilization trends, and financial breakdown."
      />
      <OwnerAnalyticsClient stats={stats} />
    </div>
  );
}

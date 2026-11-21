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
      stats = data.analytics || stats;
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

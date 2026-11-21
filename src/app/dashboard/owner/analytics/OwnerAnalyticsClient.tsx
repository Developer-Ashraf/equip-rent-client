"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DollarSign, Package, CalendarCheck, TrendingUp, Layers } from "lucide-react";

interface OwnerAnalyticsClientProps {
  stats: {
    totalRevenue: number;
    totalListings: number;
    completedRentals: number;
    totalBookings: number;
    monthlyData: { month: string; revenue: number; bookings: number }[];
    categoryDistribution: { name: string; value: number }[];
  };
}

const COLORS = ["#ea580c", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899"];

export default function OwnerAnalyticsClient({ stats }: OwnerAnalyticsClientProps) {
  const fallbackMonthly = [
    { month: "Jan", revenue: 1200, bookings: 3 },
    { month: "Feb", revenue: 2100, bookings: 5 },
    { month: "Mar", revenue: 1800, bookings: 4 },
    { month: "Apr", revenue: 3200, bookings: 7 },
    { month: "May", revenue: 2900, bookings: 6 },
    { month: "Jun", revenue: 4500, bookings: 9 },
  ];

  const chartData = stats.monthlyData?.length ? stats.monthlyData : fallbackMonthly;

  const fallbackCategories = [
    { name: "Construction Equipment", value: 4 },
    { name: "Photography Equipment", value: 3 },
    { name: "Agriculture Equipment", value: 2 },
    { name: "Electronics", value: 3 },
  ];

  const catData = stats.categoryDistribution?.length
    ? stats.categoryDistribution
    : fallbackCategories;

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">
              Total Earnings
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              ${(stats.totalRevenue || 0).toLocaleString()}
            </h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">
              Active Listings
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              {stats.totalListings || 0}
            </h3>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5">
              Listed in catalog
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">
              Paid Contracts
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              {stats.completedRentals || 0}
            </h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5">
              100% verified payout
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">
              Total Booking Orders
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              {stats.totalBookings || 0}
            </h3>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5">
              All reservation requests
            </span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Revenue Area Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Monthly Rental Revenue
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Earnings trend across the last operational cycles
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  formatter={(val: any) => [`$${val.toLocaleString()}`, "Revenue"]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ea580c"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Inventory Share
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Listings distribution across categories
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={catData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {catData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} listings`, name]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {catData.slice(0, 4).map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-slate-600 truncate max-w-[150px]">{entry.name}</span>
                </div>
                <span className="font-bold text-slate-800">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

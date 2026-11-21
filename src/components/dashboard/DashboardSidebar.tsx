"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  PlusCircle,
  Package,
  Users,
  CheckSquare,
  BarChart3,
  User,
  Shield,
  Briefcase,
  Sliders,
  LogOut,
  Boxes,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface DashboardSidebarProps {
  role: "customer" | "owner" | "admin";
  user: any;
}

export default function DashboardSidebar({ role, user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await (signOut as any)();
    router.push("/login");
  };

  const customerLinks = [
    {
      name: "My Rentals",
      href: "/dashboard/customer/my-rentals",
      icon: CalendarCheck,
    },
    {
      name: "Saved Favorites",
      href: "/dashboard/customer/favorites",
      icon: Heart,
    },
    {
      name: "My Profile",
      href: "/dashboard/customer/profile",
      icon: User,
    },
  ];

  const ownerLinks = [
    {
      name: "Performance Analytics",
      href: "/dashboard/owner/analytics",
      icon: BarChart3,
    },
    {
      name: "My Equipment Listings",
      href: "/dashboard/owner/my-equipment",
      icon: Package,
    },
    {
      name: "Add New Equipment",
      href: "/dashboard/owner/add-equipment",
      icon: PlusCircle,
    },
    {
      name: "Rented Out Items",
      href: "/dashboard/owner/rentals",
      icon: CalendarCheck,
    },
    {
      name: "Owner Profile",
      href: "/dashboard/owner/profile",
      icon: User,
    },
  ];

  const adminLinks = [
    {
      name: "Platform Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Approve Equipment",
      href: "/dashboard/admin/all-equipments",
      icon: CheckSquare,
    },
    {
      name: "All Platform Rentals",
      href: "/dashboard/admin/all-rentals",
      icon: CalendarCheck,
    },
    {
      name: "Admin Profile",
      href: "/dashboard/admin/profile",
      icon: User,
    },
  ];

  const links =
    role === "admin"
      ? adminLinks
      : role === "owner"
      ? ownerLinks
      : customerLinks;

  const roleLabel =
    role === "admin"
      ? "Admin Console"
      : role === "owner"
      ? "Owner Portal"
      : "Customer Hub";

  const badgeColor =
    role === "admin"
      ? "bg-rose-100 text-rose-700"
      : role === "owner"
      ? "bg-purple-100 text-purple-700"
      : "bg-blue-100 text-blue-700";

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col min-h-screen">
      {/* Brand & Role Header */}
      <div className="p-6 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
            E
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900">
            Equip<span className="text-orange-600">Rent</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${badgeColor}`}
          >
            {roleLabel}
          </span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isActive
                  ? "bg-orange-50 text-orange-600 border border-orange-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? "text-orange-600" : "text-slate-400"
                }`}
              />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User profile & Logout */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-700 text-xs">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

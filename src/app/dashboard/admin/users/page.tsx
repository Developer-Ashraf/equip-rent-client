export const dynamic = "force-dynamic";

import { authFetch } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AdminUsersClient from "./AdminUsersClient";

export default async function AdminUsersPage() {
  let users = [];

  try {
    const res = await authFetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      users = Array.isArray(data) ? data : (data.users || data.items || []);
    }
  } catch (error) {
    console.error("Failed to load users:", error);
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="User Role Management"
        subtitle="Manage platform permissions, assign owner capabilities, and designate administrator access."
      />
      <AdminUsersClient initialUsers={users} />
    </div>
  );
}

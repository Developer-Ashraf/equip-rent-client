import { authFetch } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AdminUsersClient from "./AdminUsersClient";

export default async function AdminUsersPage() {
  let users = [];

  try {
    const res = await authFetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      users = data.users || [];
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

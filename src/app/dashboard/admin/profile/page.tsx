export const dynamic = "force-dynamic";

import { getSession } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProfileClient from "@/components/dashboard/ProfileClient";

export default async function AdminProfilePage() {
  const session = await getSession();

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Super Admin Profile"
        subtitle="Manage administrator credentials, operational base, and system preferences."
      />
      <ProfileClient user={session?.user} />
    </div>
  );
}

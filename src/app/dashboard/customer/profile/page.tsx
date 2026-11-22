export const dynamic = "force-dynamic";

import { getSession } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProfileClient from "@/components/dashboard/ProfileClient";

export default async function CustomerProfilePage() {
  const session = await getSession();

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Account Profile"
        subtitle="Manage your contact coordinates, delivery addresses, and customer account settings."
      />
      <ProfileClient user={session?.user} />
    </div>
  );
}

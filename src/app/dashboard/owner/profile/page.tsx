export const dynamic = "force-dynamic";

import { getSession } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProfileClient from "@/components/dashboard/ProfileClient";

export default async function OwnerProfilePage() {
  const session = await getSession();

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Owner Partner Profile"
        subtitle="Manage business address, dispatch depot contact, and account credentials."
      />
      <ProfileClient user={session?.user} />
    </div>
  );
}

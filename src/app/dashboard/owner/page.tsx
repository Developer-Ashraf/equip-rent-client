export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

export default function OwnerDashboardPage() {
  redirect("/dashboard/owner/analytics");
}

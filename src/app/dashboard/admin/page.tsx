export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

export default function AdminDashboardPage() {
  redirect("/dashboard/admin/analytics");
}

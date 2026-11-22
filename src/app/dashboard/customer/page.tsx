export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

export default function CustomerDashboardPage() {
  redirect("/dashboard/customer/my-rentals");
}

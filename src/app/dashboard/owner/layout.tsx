export const dynamic = "force-dynamic";

import { getSession } from "@/lib/server";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/owner");
  }

  // Allow owner and admin access
  const role = (session.user as any).role || "customer";
  if (role !== "owner" && role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <DashboardSidebar role="owner" user={session.user} />
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}

export const dynamic = "force-dynamic";

import { getSession } from "@/lib/server";
import { redirect, notFound } from "next/navigation";
import EquipmentDetailsClient from "./EquipmentDetailsClient";
import { Equipment } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EquipmentDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://equip-rent-server-sepia.vercel.app";
  let equipment: Equipment | null = null;

  try {
    const res = await fetch(`${apiUrl}/api/equipments/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      equipment = data.equipment || data;
    }
  } catch (error) {
    console.error("Failed to load equipment details:", error);
  }

  if (!equipment) {
    notFound();
  }

  const session = await getSession();

  if (!session?.user) {
    redirect(`/login?callbackUrl=/equipment/${id}`);
  }

  return (
    <EquipmentDetailsClient
      equipment={equipment}
      user={session.user}
      userToken={session.session?.token}
    />
  );
}

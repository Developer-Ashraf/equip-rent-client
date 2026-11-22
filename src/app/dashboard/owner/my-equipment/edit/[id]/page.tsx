export const dynamic = "force-dynamic";

import { authFetch } from "@/lib/server";
import { notFound } from "next/navigation";
import EditEquipmentClient from "./EditEquipmentClient";
import { Equipment } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEquipmentPage({ params }: PageProps) {
  const { id } = await params;
  let equipment: Equipment | null = null;

  try {
    const res = await authFetch(`/api/equipments/${id}`);
    if (res.ok) {
      const data = await res.json();
      equipment = data.equipment;
    }
  } catch (error) {
    console.error("Failed to load equipment:", error);
  }

  if (!equipment) {
    notFound();
  }

  return <EditEquipmentClient equipment={equipment} />;
}

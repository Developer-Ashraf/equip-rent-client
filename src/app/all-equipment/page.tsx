import AllEquipmentClient from "./AllEquipmentClient";
import { Equipment } from "@/types";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    rentalType?: string;
    availability?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function AllEquipmentPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const queryParams = new URLSearchParams();
  if (resolvedParams.search) queryParams.set("search", resolvedParams.search);
  if (resolvedParams.category && resolvedParams.category !== "all") queryParams.set("category", resolvedParams.category);
  if (resolvedParams.rentalType && resolvedParams.rentalType !== "all") queryParams.set("rentalType", resolvedParams.rentalType);
  if (resolvedParams.availability && resolvedParams.availability !== "all") queryParams.set("availability", resolvedParams.availability);
  if (resolvedParams.sort) queryParams.set("sort", resolvedParams.sort);
  if (resolvedParams.page) queryParams.set("page", resolvedParams.page);

  let equipments: Equipment[] = [];
  let total = 0;
  let page = 1;
  let totalPages = 1;

  try {
    const res = await fetch(`${apiUrl}/api/equipments?${queryParams.toString()}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      equipments = data.items || data.equipments || [];
      total = data.total || 0;
      page = data.page || 1;
      totalPages = data.totalPages || 1;
    }
  } catch (error) {
    console.error("Failed to fetch equipment:", error);
  }

  return (
    <AllEquipmentClient
      initialEquipments={equipments}
      total={total}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}

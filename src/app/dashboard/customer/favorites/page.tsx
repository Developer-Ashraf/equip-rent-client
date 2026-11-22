export const dynamic = "force-dynamic";

import { authFetch } from "@/lib/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FavoritesClient from "./FavoritesClient";

export default async function CustomerFavoritesPage() {
  let favorites = [];

  try {
    const res = await authFetch("/api/favorites");
    if (res.ok) {
      const data = await res.json();
      favorites = data.favorites || [];
    }
  } catch (error) {
    console.error("Failed to load customer favorites:", error);
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Saved Favorites"
        subtitle="Manage your shortlisted equipment and book whenever your project requires."
      />
      <FavoritesClient initialFavorites={favorites} />
    </div>
  );
}

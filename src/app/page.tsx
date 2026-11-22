import Hero from "@/components/home/Hero";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import CustomerReviewsSection from "@/components/home/CustomerReviewsSection";
import ExtraSections from "@/components/home/ExtraSections";
import { publicFetch } from "@/lib/server";
import { Equipment } from "@/types";

export default async function HomePage() {
  let featuredEquipments: Equipment[] = [];

  try {
    const res = await publicFetch("/api/equipments/featured");
    if (res.ok) {
      const data = await res.json();
      featuredEquipments = Array.isArray(data) ? data : (data.equipments || []);
    }
  } catch (error) {
    console.error("Failed to load featured equipments:", error);
  }

  return (
    <div className="space-y-0">
      {/* 1. Hero / Banner */}
      <Hero />

      {/* 2. Featured Equipment (Top 6 MongoDB Limit) */}
      <FeaturedSection equipments={featuredEquipments} />

      {/* 3. Categories Section */}
      <CategoriesSection />

      {/* 4. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 5. Customer Reviews Section (4+ Reviews) */}
      <CustomerReviewsSection />

      {/* 6. Extra Sections (How it works & Owner CTA) */}
      <ExtraSections />
    </div>
  );
}

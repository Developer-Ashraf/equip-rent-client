"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Equipment } from "@/types";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface AllEquipmentClientProps {
  initialEquipments: Equipment[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export default function AllEquipmentClient({
  initialEquipments,
  total,
  currentPage,
  totalPages,
}: AllEquipmentClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedRentalType, setSelectedRentalType] = useState(searchParams.get("rentalType") || "all");
  const [selectedAvailability, setSelectedAvailability] = useState(searchParams.get("availability") || "all");
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "recent");

  const categories = [
    "All Categories",
    "Construction Equipment",
    "Photography Equipment",
    "Agriculture Equipment",
    "Vehicles & Transportation",
    "Electronics",
    "Event Equipment",
  ];

  const updateFilters = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, val]) => {
      if (!val || val === "all") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`/all-equipment?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchTerm });
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold uppercase text-orange-600 tracking-wider">
            Equipment Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Browse All Available Equipment
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Showing {total} approved industrial and creative machines
          </p>
        </div>

        {/* Filter and Search Bar (Challenge 1) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by equipment name, location, or brand..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  updateFilters({ category: e.target.value });
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Rental Type Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Rental Type
              </label>
              <select
                value={selectedRentalType}
                onChange={(e) => {
                  setSelectedRentalType(e.target.value);
                  updateFilters({ rentalType: e.target.value });
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white"
              >
                <option value="all">All Durations</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Availability
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => {
                  setSelectedAvailability(e.target.value);
                  updateFilters({ availability: e.target.value });
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available Now</option>
                <option value="unavailable">Rented Out</option>
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Sort By
              </label>
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  updateFilters({ sort: e.target.value });
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white"
              >
                <option value="recent">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3-Column Responsive Grid as specified in Requirements */}
        {initialEquipments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialEquipments.map((equipment) => (
              <EquipmentCard key={equipment._id} equipment={equipment} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No equipment matches your filters</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Try adjusting your category, search keywords, or availability filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

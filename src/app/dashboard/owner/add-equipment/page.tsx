"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  PackagePlus,
  Image as ImageIcon,
  DollarSign,
  Layers,
  MapPin,
  ShieldCheck,
  FileText,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AddEquipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Construction Equipment",
    description: "",
    price: "",
    rentalType: "Daily",
    quantity: "1",
    condition: "Good",
    brand: "",
    model: "",
    location: "",
    image: "",
    rentalTerms: "",
  });

  const categories = [
    "Construction Equipment",
    "Photography Equipment",
    "Agriculture Equipment",
    "Vehicles & Transportation",
    "Electronics",
    "Event Equipment",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !formData.image.trim()) {
      toast.error("Please fill in the equipment name, price, and image URL");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/equipments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to add equipment");
      }

      toast.success("Equipment listed successfully! Awaiting admin verification.");
      router.push("/dashboard/owner/my-equipment");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong adding equipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Add New Equipment"
        subtitle="List your commercial machine or production gear to start generating rental revenue."
      />

      <div className="max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Equipment Title / Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Caterpillar 320 Hydraulic Excavator"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Industry Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing, Quantity, Rental Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Rental Price ($) *
              </label>
              <input
                type="number"
                name="price"
                required
                min={1}
                value={formData.price}
                onChange={handleChange}
                placeholder="250"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Billing Cycle *
              </label>
              <select
                name="rentalType"
                value={formData.rentalType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white"
              >
                <option value="Daily">Daily Rate</option>
                <option value="Weekly">Weekly Rate</option>
                <option value="Monthly">Monthly Rate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Available Stock Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                required
                min={1}
                value={formData.quantity}
                onChange={handleChange}
                placeholder="1"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>
          </div>

          {/* Specifications: Brand, Model, Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Brand / Manufacturer
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Caterpillar, Sony, John Deere"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Model Number / Series
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. 320 GC, FX3, 8R 410"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Machine Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white"
              >
                <option value="New">Brand New / Like New</option>
                <option value="Good">Good / Field Inspected</option>
                <option value="Fair">Fair / Functional Operational</option>
              </select>
            </div>
          </div>

          {/* Location and Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Depot Location / City *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Chicago Logistics Yard, IL"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Equipment Image URL *
              </label>
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
              Comprehensive Machine Description *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Highlight capabilities, horsepower, attachments included, transport weight..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          {/* Rental Terms */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
              Rental Terms & Security Deposit Policy
            </label>
            <textarea
              name="rentalTerms"
              rows={3}
              value={formData.rentalTerms}
              onChange={handleChange}
              placeholder="Minimum rental days, operator requirement, fuel policy, liability deposit..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Listing...
                </>
              ) : (
                <>
                  <PackagePlus className="w-4 h-4" />
                  Publish Equipment Listing
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  HardHat,
  Camera,
  Truck,
  Tractor,
  Cpu,
  PartyPopper,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Construction Equipment",
    icon: HardHat,
    count: "24+ items",
    description: "Excavators, loaders, concrete mixers & heavy lifting.",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Photography Equipment",
    icon: Camera,
    count: "35+ items",
    description: "Cinema cameras, prime lenses, gimbals & lighting setups.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Vehicles & Transportation",
    icon: Truck,
    count: "18+ items",
    description: "Commercial flatbeds, pickup trucks & moving vans.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Agriculture Equipment",
    icon: Tractor,
    count: "15+ items",
    description: "Utility tractors, harvesters, tillers & seeders.",
    color: "from-lime-500 to-green-600",
  },
  {
    name: "Electronics",
    icon: Cpu,
    count: "29+ items",
    description: "Survey drones, thermal optics & industrial testing kits.",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Event Equipment",
    icon: PartyPopper,
    count: "22+ items",
    description: "Line-array sound systems, stage lighting & power generators.",
    color: "from-rose-500 to-red-600",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase text-orange-600 tracking-wider">
              Explore By Industry
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Popular Equipment Categories
            </h2>
          </div>
          <Link
            href="/all-equipment"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors mt-4 md:mt-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  href={`/all-equipment?category=${encodeURIComponent(cat.name)}`}
                  className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-bold text-slate-400 block mb-1">
                    {cat.count}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {cat.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Equipment } from "@/types";
import { formatPrice } from "@/lib/utils";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface EquipmentCardProps {
  equipment: Equipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  const isAvailable = (equipment.quantity ?? equipment.availableQuantity ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image & Badge */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
            {equipment.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide backdrop-blur-md ${
              isAvailable
                ? "bg-emerald-500/90 text-white"
                : "bg-rose-500/90 text-white"
            }`}
          >
            {isAvailable ? "Available" : "Rented Out"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
          <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
          <span className="truncate">{equipment.location}</span>
        </div>

        <h3 className="font-bold text-slate-900 text-lg group-hover:text-orange-600 transition-colors line-clamp-1 mb-2">
          {equipment.name}
        </h3>

        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
          {equipment.description}
        </p>

        {/* Pricing and Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[11px] text-slate-400 block font-semibold uppercase">
              Rental Rate
            </span>
            <div className="text-xl font-black text-slate-900">
              {formatPrice(equipment.price ?? equipment.rentalPrice ?? 0)}
              <span className="text-xs font-medium text-slate-500">
                /{equipment.rentalType.toLowerCase()}
              </span>
            </div>
          </div>

          <Link
            href={`/equipment/${equipment._id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-all group-hover:translate-x-0.5"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

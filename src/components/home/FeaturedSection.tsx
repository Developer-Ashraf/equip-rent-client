import Link from "next/link";
import { Equipment } from "@/types";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import { ArrowRight } from "lucide-react";

interface FeaturedSectionProps {
  equipments: Equipment[];
}

export default function FeaturedSection({ equipments }: FeaturedSectionProps) {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase text-orange-600 tracking-wider">
              Hand-Picked Gear
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Featured Equipment Available For Rent
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">
              Inspect top-rated machinery and creative equipment checked by our verification experts.
            </p>
          </div>
          <Link
            href="/all-equipment"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors mt-4 md:mt-0"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipments.map((equipment) => (
            <EquipmentCard key={equipment._id} equipment={equipment} />
          ))}
        </div>
      </div>
    </section>
  );
}

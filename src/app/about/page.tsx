import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, Clock, Award, Users, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase text-orange-600 tracking-wider">
            About EquipRent
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Democratizing Access to Industrial & Production Equipment
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            EquipRent bridges the gap between verified equipment owners and construction contractors, film creators, and industrial operators with friction-free leasing and instant checkout.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center">
            <span className="text-3xl font-black text-orange-600">2,500+</span>
            <span className="block text-xs font-bold text-slate-500 uppercase mt-1">Equipment Available</span>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center">
            <span className="text-3xl font-black text-slate-900">99.8%</span>
            <span className="block text-xs font-bold text-slate-500 uppercase mt-1">Uptime & Reliability</span>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center">
            <span className="text-3xl font-black text-orange-600">45+</span>
            <span className="block text-xs font-bold text-slate-500 uppercase mt-1">Service Hubs</span>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center">
            <span className="text-3xl font-black text-slate-900">18,000+</span>
            <span className="block text-xs font-bold text-slate-500 uppercase mt-1">Completed Leases</span>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900">
              Built for Contractors, Creators & Industrial Teams
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Purchasing heavy machinery, cinema cameras, and specialized agricultural tractors represents immense upfront capital expenditure. EquipRent provides a certified peer-to-peer ecosystem where equipment is thoroughly inspected, fully insured, and delivered directly to your job site on demand.
            </p>
            <div className="space-y-3 pt-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Zero-Liability Certified Equipment Insurance</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-orange-600" />
                <span>Nationwide Dispatch with GPS Fleet Logistics</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>24/7 Rapid Mechanical Replacement Guarantee</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?w=1000"
              alt="Construction job site"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black">Ready to expand your project capacity?</h3>
            <p className="text-xs text-slate-400 mt-1">Browse through our curated inventory of heavy and creative gear.</p>
          </div>
          <Link
            href="/all-equipment"
            className="px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:shadow-orange-600/30 transition-all flex-shrink-0"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

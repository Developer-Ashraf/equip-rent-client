"use client";

import Link from "next/link";
import { ArrowRight, Search, ShieldCheck, Clock, Award, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-slate-50 py-16 lg:py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-800 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              Verified Owners & Insured Rentals
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Rent Top Equipment. <br />
              <span className="text-orange-600">Power Your Projects.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              The premier marketplace connecting construction managers, event planners, and creative professionals with top-grade machinery and gear on flexible rental terms.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/all-equipment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-600/20 transition-all hover:translate-y-[-1px]"
              >
                <span>Browse All Equipment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm shadow-sm transition-all"
              >
                <span>Learn How It Works</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/60 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <Clock className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Instant Booking</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Stripe Secured</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Award className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Verified Owners</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
                alt="Heavy Machinery Rental"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Floating Featured Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-lg text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-orange-600 tracking-wider">
                      Trending Rental
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Industrial Heavy Excavator & Loaders
                    </h4>
                    <p className="text-xs text-slate-500">Starting from $280/day</p>
                  </div>
                  <Link
                    href="/all-equipment"
                    className="w-9 h-9 rounded-xl bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center transition-colors shrink-0"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

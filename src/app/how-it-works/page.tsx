import Link from "next/link";
import { Search, CalendarCheck, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Discover Equipment",
      description: "Search across 6 categories including excavators, cinema cameras, tractors, and audio systems with granular filters.",
    },
    {
      step: "02",
      icon: CalendarCheck,
      title: "Select Dates & Book",
      description: "Choose your rental start and end dates. Total rates, duration, and logistics are calculated automatically in real time.",
    },
    {
      step: "03",
      icon: ShieldCheck,
      title: "Secure Stripe Checkout",
      description: "Complete your rental agreement using encrypted payment processing with transparent deposit protection.",
    },
    {
      step: "04",
      icon: Truck,
      title: "Job Site Delivery & Return",
      description: "Have the machinery dispatched to your job site or pick up locally. Return the gear when your project completes.",
    },
  ];

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase text-orange-600 tracking-wider">
            Operational Blueprint
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How Renting On EquipRent Works
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From search to site delivery, our streamlined four-stage leasing pipeline ensures reliability, full insurance coverage, and zero downtime.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-orange-600">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Policy</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="p-10 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black">Ready to deploy your next machine?</h3>
            <p className="text-xs text-slate-400 mt-1">Browse through our inventory with instant availability confirmation.</p>
          </div>
          <Link
            href="/all-equipment"
            className="px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
          >
            <span>Browse Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

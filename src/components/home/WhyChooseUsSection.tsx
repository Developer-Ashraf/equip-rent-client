import { ShieldCheck, DollarSign, Calendar, Lock } from "lucide-react";

const perks = [
  {
    icon: DollarSign,
    title: "Affordable & Transparent Rates",
    description: "No hidden charges or surprise deductions. Flexible daily, weekly, and monthly rates tailored to your project timeline.",
  },
  {
    icon: ShieldCheck,
    title: "100% Verified Equipment Owners",
    description: "Every provider and listed machinery goes through verification of ownership, condition, and maintenance logs.",
  },
  {
    icon: Calendar,
    title: "Flexible Rental Durations",
    description: "Easily adjust your rental period on the fly. Book for single-day rush jobs or multi-month industrial infrastructure projects.",
  },
  {
    icon: Lock,
    title: "Safe & Escrow Stripe Payments",
    description: "Your rental deposits and fees are processed through Stripe with end-to-end encryption and dispute security.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase text-orange-500 tracking-wider">
            Why Choose EquipRent
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Built For Contractors, Creators, & Enterprise Fleets
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            We provide a transparent equipment rental experience with guaranteed uptime and fair business practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-orange-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{perk.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

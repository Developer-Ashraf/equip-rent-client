import Link from "next/link";
import { Search, CalendarCheck, Truck, Headphones, ArrowRight } from "lucide-react";

export default function ExtraSections() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Find Your Equipment",
      description: "Search across hundreds of verified machines, cameras, and industrial fleets by location or category.",
    },
    {
      num: "02",
      icon: CalendarCheck,
      title: "Book & Pay Securely",
      description: "Pick your start/end dates, specify delivery location, and pay with instant Stripe payment escrow protection.",
    },
    {
      num: "03",
      icon: Truck,
      title: "Receive & Get To Work",
      description: "Get the machinery delivered to your jobsite or pickup directly from the verified provider's facility.",
    },
    {
      num: "04",
      icon: Headphones,
      title: "24/7 Dedicated Support",
      description: "Our rental experts monitor uptime and provide replacement machinery in case of unforeseen mechanical stops.",
    },
  ];

  return (
    <>
      {/* Extra Section 1: How It Works */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase text-orange-600 tracking-wider">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              How Equipment Rental Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-4xl font-black text-slate-200 block mb-3">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Extra Section 2: Owner CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-orange-100">
                Monetize Idle Machinery
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Have Equipment Sitting Idle? List It Today & Earn
              </h2>
              <p className="text-orange-100 text-sm leading-relaxed">
                Join our network of trusted providers. We handle inquiries, insurance escrow, and customer identity verification so you earn hassle-free.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-xl transition-all shrink-0"
            >
              <span>Become An Equipment Owner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

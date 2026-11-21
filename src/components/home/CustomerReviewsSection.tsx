import { Star } from "lucide-react";

const reviews = [
  {
    name: "Tariqul Islam",
    role: "Project Manager, Apex Infra",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Rented a Cat 320 excavator for our Padma bridge feeder link. Machine arrived with full tank, flawless hydraulics, and saved our project deadline.",
  },
  {
    name: "Ayesha Siddiqua",
    role: "Commercial Film Producer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "The Sony FX3 kit was in mint condition. The booking workflow took less than 2 minutes and the Stripe checkout made corporate invoicing super smooth.",
  },
  {
    name: "Kamrul Hasan",
    role: "Lead Agri-contractor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "John Deere utility tractor worked like a beast across 40 acres of seasonal wheat harvesting. Highly recommended for affordable farm rentals.",
  },
  {
    name: "Nusrat Jahan",
    role: "Head of Events, Dhaka Fest",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "JBL concert array setup was crystal clear for over 3,000 attendees. Transparent owner communication and on-time rigging support.",
  },
];

export default function CustomerReviewsSection() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase text-orange-600 tracking-wider">
            Verified Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Trusted By 1,500+ Contractors & Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={rev.image}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

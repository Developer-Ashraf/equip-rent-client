import Link from "next/link";
import { SlidersHorizontal, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-5 shadow-lg">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
          <SlidersHorizontal className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs font-black uppercase text-orange-600 tracking-wider">
            Page Not Found • 404
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Machine Out of Range
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            The equipment or page you are looking for has been moved, unlisted, or does not exist.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            href="/all-equipment"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
          >
            Browse Equipment
          </Link>
        </div>
      </div>
    </div>
  );
}

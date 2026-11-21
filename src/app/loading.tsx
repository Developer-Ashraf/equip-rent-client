import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
      <p className="text-xs font-bold text-slate-500 mt-3 tracking-wide uppercase">
        Loading EquipRent Assets...
      </p>
    </div>
  );
}

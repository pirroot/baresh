'use client';

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main dir="rtl" className="min-h-screen flex items-center justify-center px-4 bg-slate-950">
      <section className="flex flex-col items-center text-center gap-6 max-w-md">
        {/* آیکون */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>

        {/* متن */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-white">خطا!</h1>
          <p className="text-sm text-white/50 leading-7">
            متأسفانه یک مشکل فنی پیش آمده است.
          </p>
          <p className="text-sm text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 break-all">
            {error.message || 'خطای ناشناخته'}
          </p>
        </div>

        {/* دکمه */}
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          تلاش مجدد
        </button>
      </section>
    </main>
  );
}
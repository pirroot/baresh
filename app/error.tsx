'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main dir="rtl" className="min-h-screen flex items-center justify-center px-4">
      <section className="flex flex-col items-center text-center gap-6 max-w-md">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10 border border-sky-500/20">
          <span className="text-2xl text-sky-400">!</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-white/90">مشکلی پیش آمد</h1>
          <div className="w-10 h-px bg-sky-500/40 mx-auto" />
          <p className="text-sm text-white/50 leading-7">
            متأسفانه یک خطا رخ داده است:
          </p>
          <p className="text-sm font-medium text-sky-300/80 bg-sky-500/8 border border-sky-500/15 rounded-xl px-4 py-3">
            {error.message || 'خطای ناشناخته'}
          </p>
        </div>

        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-sky-900/40 hover:-translate-y-px active:scale-95"
        >
          تلاش مجدد
        </button>

      </section>
    </main>
  );
}
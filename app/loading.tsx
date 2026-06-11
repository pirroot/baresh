export default function Loading() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-slate-950" dir="rtl">
      <div className="relative mb-12 flex flex-col items-center gap-8">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-[spin_3s_linear_infinite] rounded-full border-t border-sky-500/50" />
          <div className="absolute h-10 w-10 animate-[spin_2s_linear_infinite_reverse] rounded-full border-b border-cyan-400/50" />
          <div className="absolute h-4 w-4 rounded-full bg-white/20" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-medium tracking-[0.3em] text-white/40">
            در حال بارگذاری سیستم
          </span>

          <div className="h-0.5 w-32 overflow-hidden rounded-full bg-white/5">
            <div className="loading-slide-bar h-full w-1/3 rounded-full bg-linear-to-r from-sky-400 to-cyan-300" />
          </div>
        </div>
      </div>
    </section>
  )
}

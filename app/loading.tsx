export default function Loading() {
  return (
    <section
      className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-slate-950/95 backdrop-blur-sm"
      dir="rtl"
      role="status"
      aria-label="در حال بارگذاری"
    >
      <div className="flex flex-col items-center gap-6">
        {/* اسپینر */}
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-sky-500/20 border-t-sky-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-lineaer-to-r from-sky-400 to-cyan-300 animate-pulse" />
          </div>
        </div>

        {/* متن */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-medium text-white/60">
            در حال بارگذاری...
          </span>

          {/* نوار پیشرفت */}
          <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full w-full rounded-full bg-lineaer-to-r from-sky-400 to-cyan-300"
              style={{
                animation: 'loading-progress 1.2s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading-progress {
          0% {
            transform: translateX(-100%);
            width: 30%;
          }
          50% {
            width: 80%;
          }
          100% {
            transform: translateX(100%);
            width: 30%;
          }
        }
      `}</style>
    </section>
  )
}
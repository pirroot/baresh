export default function Loading() {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-7">
      <div className="flex gap-2.5 items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-foreground"
            style={{
              animation: "pulse-dot 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="w-28 h-px bg-border overflow-hidden relative">
        <span
          className="absolute h-full w-2/5 bg-muted-foreground"
          style={{ animation: "slide-bar 1.6s ease-in-out infinite" }}
        />
      </div>

      <span
        className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground"
        style={{ fontWeight: 300 }}
      >
        loading
      </span>

      <style>{`
        @keyframes pulse-dot {
          0%, 80%, 100% { opacity: 0.15; transform: scale(1); }
          40% { opacity: 0.9; transform: scale(1.35); }
        }
        @keyframes slide-bar {
          0% { left: -40%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  )
}
"use client"
import { getHomeDataApi } from "@/services/homeServices"
import { useEffect, useRef, useState } from "react"

interface IHomeStatDto {
  value: number
  suffix: string
  label: string
}

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return count
}

function StatItem({ value, suffix, label, started }: IHomeStatDto & { started: boolean }) {
  const count = useCountUp(value, 1800, started)
  const display = count.toLocaleString("fa-IR")

  return (
    <div className="flex flex-col items-center justify-center text-center group">
      <div className="relative flex items-end justify-center gap-1 mb-3">
        <span className="text-3xl md:text-5xl font-black tracking-tight leading-none tabular-nums text-white">
          {display}
        </span>
        {suffix && (
          <span className="text-xl md:text-3xl font-black text-sky-400 mb-0.5 leading-none">
            {suffix}
          </span>
        )}
      </div>
      <div className="w-8 h-px bg-sky-500/40 mb-3 transition-all duration-500 group-hover:w-16 group-hover:bg-sky-400" />
      <p className="text-white/50 text-[11px] md:text-sm font-medium tracking-wide">
        {label}
      </p>
    </div>
  )
}

export default function HomeStats() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [statList, setStatList] = useState<IHomeStatDto[]>([])

  useEffect(() => {
    getHomeDataApi().then((data) => {
      const info = data.siteInfo
      if (!info) return
      setStatList([
        { value: info.yearsOfExperience ?? 15, suffix: "+", label: "سال سابقه" },
        { value: info.deliveredProducts ?? 48000, suffix: "+", label: "محصول تحویل‌داده‌شده" },
        { value: info.trustedCustomers ?? 733, suffix: "+", label: "مشتری مورد اعتماد" },
        { value: info.coveredCountries ?? 3, suffix: "", label: "کشور تحت پوشش" },
      ])
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="container mx-auto my-12 md:my-20 px-4 md:px-8 lg:px-12">
      <div className="relative overflow-hidden rounded-2xl border border-sky-500/15 bg-sky-500/5 backdrop-blur-sm px-6 py-10 md:px-12 md:py-12">

        {/* subtle glow top-right */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full" />

        {/* dividers between stats */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-0 text-white">
          {statList.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "md:px-8",
                i !== statList.length - 1
                  ? "md:border-l md:border-sky-500/15"
                  : "",
              ].join(" ")}
            >
              <StatItem {...stat} started={started} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
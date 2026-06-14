"use client"

import { useState } from "react"

interface CommentFormProps {
  productId: string
}

export default function CommentForm({ productId }: CommentFormProps) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // capture the form reference now — after `await`, e.currentTarget can become null
    const form = e.currentTarget
    const formData = new FormData(form)

    setLoading(true)
    setStatus("idle")

    try {
      const res = await fetch("/api/comments/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          text: formData.get("text"),
          rating: Number(formData.get("rating")),
          productId,
        }),
      })
      

      if (!res.ok) throw new Error("Request failed")

      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  const inputClasses =
    "w-full bg-sky-500/5 border border-sky-500/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/30 transition-colors"

  return (
    <div className="mt-12 border-t border-sky-500/10 pt-10">
      <h3 className="text-lg font-semibold text-white/90 mb-6">
        ثبت نظر شما
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="نام شما"
            required
            className={inputClasses}
          />
          <input
            name="phone"
            type="tel"
            placeholder="شماره تماس"
            required
            className={inputClasses}
          />
        </div>

        <textarea
          name="text"
          placeholder="نظر شما"
          required
          rows={4}
          className={`${inputClasses} resize-none`}
        />

        <select name="rating" required defaultValue="" className={inputClasses}>
          <option value="" disabled>
            امتیاز خود را انتخاب کنید
          </option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n} className="bg-slate-900">
              {n} ستاره
            </option>
          ))}
        </select>

        <button
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-sky-900/40"
        >
          {loading ? "در حال ارسال..." : "ثبت نظر"}
        </button>

        {status === "success" && (
          <p className="text-sm text-emerald-400">
            نظر شما ثبت شد و پس از تایید نمایش داده می‌شود.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">
            خطایی رخ داد. لطفاً دوباره تلاش کنید.
          </p>
        )}
      </form>
    </div>
  )
}
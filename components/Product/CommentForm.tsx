"use client"

import { useState } from "react"
import { Star, Send, CheckCircle, XCircle } from "lucide-react"

interface CommentFormProps {
  productId: string
}

export default function CommentForm({ productId }: CommentFormProps) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [rating, setRating] = useState<number>(0)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    text: "",
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!rating) {
      alert("لطفاً امتیاز خود را انتخاب کنید")
      return
    }

    setLoading(true)
    setStatus("idle")

    try {
      const res = await fetch("/api/comments/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating,
          productId,
        }),
      })

      if (!res.ok) throw new Error("Request failed")

      setFormData({ name: "", phone: "", text: "" })
      setRating(0)
      setStatus("success")
    } catch {
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  const inputClasses =
    "w-full bg-sky-500/5 border border-sky-500/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"

  return (
    <div className="mt-12 border-t border-sky-500/10 pt-10">
      <h3 className="text-xl font-bold text-white/90 mb-6 flex items-center gap-2">
        <Send className="w-5 h-5 text-sky-400" />
        ثبت نظر شما
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="نام شما"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
            disabled={loading}
          />
          <input
            name="phone"
            type="tel"
            placeholder="شماره تماس"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClasses}
            disabled={loading}
            dir="ltr"
          />
        </div>

        <textarea
          name="text"
          placeholder="نظر شما ..."
          required
          rows={4}
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          className={`${inputClasses} resize-none`}
          disabled={loading}
        />

        {/* استارهای تعاملی */}
        <div>
          <label className="block text-sm text-white/60 mb-2">
            امتیاز شما به این محصول
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 transition-transform hover:scale-110"
                disabled={loading}
              >
                <Star
                  className={`w-8 h-8 transition-all ${star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-white/20 hover:text-white/40"
                    }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="mr-3 text-sm text-white/40">
                {rating === 5 && "⭐ عالی"}
                {rating === 4 && "👍 خوب"}
                {rating === 3 && "😐 متوسط"}
                {rating === 2 && "👎 ضعیف"}
                {rating === 1 && "💔 خیلی ضعیف"}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !rating}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-sky-900/40"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              در حال ارسال...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              ثبت نظر
            </>
          )}
        </button>

        {status === "success" && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <p className="text-sm">نظر شما با موفقیت ثبت شد. متشکریم! 🙏</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <XCircle className="w-4 h-4 shrink-0" />
            <p className="text-sm">خطایی رخ داد. لطفاً دوباره تلاش کنید.</p>
          </div>
        )}
      </form>
    </div>
  )
}
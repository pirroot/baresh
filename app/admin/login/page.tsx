"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/admin")
    } else {
      setError("رمز اشتباهه")
      setLoading(false)
    }
  }

  return (
    <section className="h-screen flex items-center justify-center bg-gray-700 rounded-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور"
          className="border px-4 py-2 rounded-lg"
          autoFocus
          disabled={loading}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded-lg disabled:opacity-50 transition-opacity"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </section>
  )
}
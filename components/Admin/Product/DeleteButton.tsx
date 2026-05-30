"use client"

import { MdDelete } from "react-icons/md"
import { deleteProductAdminApi } from "@/services/admin/adminServices"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm("آیا از حذف این محصول مطمئن هستید؟")) return

    setLoading(true)
    const res = await deleteProductAdminApi(id)
    setLoading(false)

    if (res?.msg) {
      router.refresh()
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-40"
    >
      <MdDelete size={20} />
    </button>
  )
}
"use client"

import { deleteComment } from "@/services/commentActions"
import { useTransition } from "react"

export function DeleteCommentButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm("آیا از حذف این نظر مطمئن هستید؟")) return

    startTransition(() => {
      deleteComment(id)
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-3 py-1 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition disabled:opacity-50"
    >
      {isPending ? "..." : "حذف"}
    </button>
  )
}

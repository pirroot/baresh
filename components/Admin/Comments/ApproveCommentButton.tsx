"use client"

import { approveComment } from "@/services/commentActions"
import { useTransition } from "react"

export function ApproveCommentButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() =>
        startTransition(() => {
          approveComment(id)
        })
      }
      disabled={isPending}
      className="px-3 py-1 text-xs rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition disabled:opacity-50"
    >
      {isPending ? "..." : "تایید"}
    </button>
  )
}

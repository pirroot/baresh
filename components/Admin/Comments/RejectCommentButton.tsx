"use client"

import { rejectComment } from "@/services/commentActions"
import { useTransition } from "react"

export function RejectCommentButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() =>
        startTransition(() => {
          rejectComment(id)
        })
      }
      disabled={isPending}
      className="px-3 py-1 text-xs rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition disabled:opacity-50"
    >
      {isPending ? "..." : "رد"}
    </button>
  )
}

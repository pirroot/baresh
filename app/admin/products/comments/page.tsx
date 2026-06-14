export const dynamic = "force-dynamic"

import type { ReactNode } from "react"
import { getProductCommentsAdmin } from "@/services/admin/adminServices"
import { ApproveCommentButton } from "@/components/Admin/Comments/ApproveCommentButton"
import { RejectCommentButton } from "@/components/Admin/Comments/RejectCommentButton"
import { DeleteCommentButton } from "@/components/Admin/Comments/DeleteCommentButton"

interface Comment {
  id: string
  name: string
  phone: string
  rating: number
  status: "PENDING" | "APPROVED" | "REJECTED"
  createdAt: string | Date
  product: {
    title: string
  }
}

export default async function AdminProductCommentsPage() {
  const comments: Comment[] = await getProductCommentsAdmin()

  return (
    <div dir="rtl" className="space-y-8">

      <header>
        <p className="text-sm font-medium text-sky-600 mb-2">
          مدیریت فروشگاه
        </p>

        <h1 className="text-2xl font-bold text-slate-900">
          مدیریت نظرات محصولات
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {comments.length.toLocaleString("fa-IR")} نظر ثبت شده
        </p>
      </header>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-[1100] w-full">

            <thead className="bg-slate-50">

              <tr className="border-b border-slate-200">

                <TableHead>کاربر</TableHead>
                <TableHead>محصول</TableHead>
                <TableHead>امتیاز</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>تاریخ</TableHead>
                <TableHead>عملیات</TableHead>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {comments.map((comment) => {
                // Clamp rating to 0–5 so "★".repeat() never receives a negative/out-of-range value
                const rating = Math.min(5, Math.max(0, Math.round(comment.rating ?? 0)))

                return (
                  <tr key={comment.id} className="hover:bg-slate-50/70">

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-800">
                          {comment.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {comment.phone}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {comment.product.title}
                    </td>

                    <td className="px-6 py-4 text-yellow-500 text-sm">
                      {"★".repeat(rating)}
                      <span className="text-slate-300">
                        {"★".repeat(5 - rating)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={comment.status} />
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-500">
                      {formatDate(comment.createdAt)}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex gap-2">

                        <ApproveCommentButton id={comment.id} />
                        <RejectCommentButton id={comment.id} />
                        <DeleteCommentButton id={comment.id} />

                      </div>

                    </td>

                  </tr>
                )
              })}

              {comments.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="py-16 text-center text-sm text-slate-400"
                  >
                    نظری ثبت نشده است
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}


function TableHead({ children }: { children: ReactNode }) {
  return (
    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">
      {children}
    </th>
  )
}


function StatusBadge({ status }: { status: "PENDING" | "APPROVED" | "REJECTED" }) {

  if (status === "APPROVED") {
    return (
      <span className="px-3 py-1 text-xs rounded-full bg-green-50 text-green-700 ring-1 ring-green-100">
        تایید شده
      </span>
    )
  }

  if (status === "REJECTED") {
    return (
      <span className="px-3 py-1 text-xs rounded-full bg-red-50 text-red-700 ring-1 ring-red-100">
        رد شده
      </span>
    )
  }

  return (
    <span className="px-3 py-1 text-xs rounded-full bg-amber-50 text-amber-700 ring-1 ring-amber-100">
      در انتظار
    </span>
  )
}


function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date))
}
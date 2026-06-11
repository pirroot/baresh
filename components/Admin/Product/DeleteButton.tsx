"use client"

import { MdClose, MdDelete, MdWarningAmber } from "react-icons/md"
import { deleteProductAdminApi } from "@/services/admin/adminServices"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    try {
      setLoading(true)
      const res = await deleteProductAdminApi(id)

      if (res?.msg) {
        setOpen(false)
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl p-2 text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-600"
        title="حذف محصول"
      >
        <MdDelete size={18} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm"
          onClick={() => !loading && setOpen(false)}
        >
          <div
            className="relative mx-4 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => !loading && setOpen(false)}
              className="absolute left-4 top-4 rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              disabled={loading}
              title="بستن"
            >
              <MdClose size={20} />
            </button>

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <MdWarningAmber size={28} />
            </div>

            <h3 className="text-lg font-bold text-slate-900">حذف محصول</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              آیا از حذف این محصول مطمئن هستید؟
              <br />
              این عملیات قابل بازگشت نیست.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-2xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "در حال حذف..." : "حذف محصول"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

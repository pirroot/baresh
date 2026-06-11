"use client"

import { useState } from "react"
import { MdEdit } from "react-icons/md"
import { IProduct } from "@/types/ProductDto"
import EditProductModal from "./EditProductModal"

export function EditButton({ product }: { product: IProduct }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl p-2 text-slate-500 transition-all hover:bg-sky-50 hover:text-sky-600"
        title="ویرایش محصول"
      >
        <MdEdit size={18} />
      </button>

      {open && <EditProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  )
}

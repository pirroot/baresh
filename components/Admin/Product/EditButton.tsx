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
        className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
      >
        <MdEdit size={20} />
      </button>

      {open && <EditProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  )
}
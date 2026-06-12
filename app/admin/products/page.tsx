export const dynamic = 'force-dynamic'

import AddProductModal from "@/components/Admin/Product/AddProductModal"
import { getProductAdminApi } from "@/services/admin/adminServices"
import { IProduct } from "@/types/ProductDto"
import { DeleteButton } from "@/components/Admin/Product/DeleteButton"
import { EditButton } from "@/components/Admin/Product/EditButton"

export default async function AdminProductsPage() {
  const products = await getProductAdminApi()

  return (
    <div dir="rtl" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-sky-600 mb-2">مدیریت فروشگاه</p>
          <h1 className="text-2xl font-bold text-slate-900">مدیریت محصولات</h1>
          <p className="mt-1 text-sm text-slate-500">
            {products.result.length.toLocaleString("fa-IR")} محصول موجود است
          </p>
        </div>

        <AddProductModal />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-base font-semibold text-slate-900">لیست محصولات</h2>
          <p className="mt-1 text-xs text-slate-400">مشاهده، ویرایش و حذف محصولات سایت</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">محصول</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">دسته‌بندی</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">اسلاگ</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">آخرین بروزرسانی</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">عملیات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products.result?.map((product: IProduct) => (
                <tr key={product.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-16 w-16 rounded-xl border border-slate-200 object-cover bg-slate-100 shadow-sm"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {product.title}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
                      {product.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <code className="rounded-xl bg-slate-100 px-2.5 py-1 text-xs text-slate-500" dir="ltr">
                      {product.slug}
                    </code>
                  </td>

                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(product.updatedAt).toLocaleDateString("fa-IR")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <EditButton product={product} />
                      <DeleteButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {products.result.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-16 text-center text-sm text-slate-400"
                  >
                    هنوز محصولی ثبت نشده.
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

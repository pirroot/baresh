import {
  MdEdit,
} from "react-icons/md";
import AddProductModal from "@/components/Admin/Product/AddProductModal";
import { getProductAdminApi } from "@/services/admin/adminServices";
import { IProduct } from "@/types/ProductDto";
import { DeleteButton } from "@/components/Admin/Product/DeleteButton";
import { EditButton } from "@/components/Admin/Product/EditButton";


export default async function AdminProductsPage() {
  const products = await getProductAdminApi()

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">مدیریت محصولات</h1>
          <p className="text-white/40 text-sm mt-3">{products.result.length} محصول در مجموع</p>
        </div>
        <AddProductModal />
      </div>

      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">محصول</th>
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">دسته‌بندی</th>
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">اسلاگ</th>
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">آخرین بروزرسانی</th>
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.result &&
              products.result.map((product: IProduct) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 rounded-lg object-cover bg-white/5"
                      />
                      <div>
                        <p className="text-lg text-white font-l">{product.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-white/5 text-white/60 px-2.5 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">{product.slug}</code>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/30">
                    {new Date(product.updatedAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <EditButton product={product} />
                      <DeleteButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div >
  );
}
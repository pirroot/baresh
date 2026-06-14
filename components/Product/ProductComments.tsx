import { getProductComments } from "@/services/commentService"
import CommentForm from "./CommentForm"

interface Props {
  productId: string
}

export default async function ProductComments({ productId }: Props) {
  const comments = await getProductComments(productId)

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold mb-8">
        نظرات کاربران ({comments.length})
      </h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border border-slate-700 rounded-xl p-6 bg-slate-800/40"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">{comment.name}</span>
              <span className="text-yellow-400 text-sm">
                {"★".repeat(comment.rating)}
              </span>
            </div>

            <p className="text-white/70 leading-7">
              {comment.text}
            </p>
          </div>
        ))}
      </div>

      {/* فرم جدا شده */}
      <CommentForm productId={productId} />
    </section>
  )
}

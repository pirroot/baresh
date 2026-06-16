import { getProductComments } from "@/services/commentService"
import CommentForm from "./CommentForm"
import { MessageCircle, Star, User, Calendar } from "lucide-react"

interface Props {
  productId: string
}

export default async function ProductComments({ productId }: Props) {
  const comments = await getProductComments(productId)

  // JSON-LD برای نظرات (سئو بهتر)
  const jsonLdReviews = {
    "@context": "https://schema.org",
    "@type": "Product",
    review: comments.map((comment) => ({
      "@type": "Review",
      author: { "@type": "Person", name: comment.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: comment.rating,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: comment.text,
      datePublished: comment.createdAt,
    })),
  }

  // محاسبه میانگین امتیازات
  const averageRating = comments.length > 0
    ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
    : 0

  return (
    <>
      {/* JSON-LD برای سئو نظرات */}
      {comments.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdReviews) }}
        />
      )}

      <section className="mt-20" aria-labelledby="comments-heading">
        {/* هدر بخش نظرات */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-6 h-6 text-sky-400" />
              <h2 id="comments-heading" className="text-2xl font-bold">
                نظرات کاربران
              </h2>
            </div>
            <p className="text-white/50 text-sm">
              نظرات و تجربیات دیگر کاربران درباره این محصول
            </p>
          </div>

          {/* میانگین امتیازات */}
          {comments.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-400">{averageRating}</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${star <= Number(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-white/20"
                        }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-white">{comments.length}</div>
                <div className="text-[10px] text-white/40">نظر ثبت شده</div>
              </div>
            </div>
          )}
        </div>

        {/* لیست نظرات */}
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="group border border-white/10 rounded-xl p-5 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-sky-500/30"
              >
                {/* هدر نظر */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500/20 to-indigo-500/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <span className="font-semibold text-white/90 block">
                        {comment.name}
                      </span>
                      {comment.createdAt && (
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3 text-white/30" />
                          <span className="text-[10px] text-white/30">
                            {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* امتیاز */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= comment.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/20"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* متن نظر */}
                <p className="text-white/70 leading-7 text-justify">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          // حالت بدون نظر
          <div className="text-center py-12 rounded-2xl bg-white/5 border border-white/10">
            <MessageCircle className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40">هنوز نظری برای این محصول ثبت نشده است.</p>
            <p className="text-white/30 text-sm mt-1">اولین نفری باشید که نظر می‌دهید!</p>
          </div>
        )}

        {/* فرم ثبت نظر (Client Component) */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-sky-400" />
            ثبت نظر جدید
          </h3>
          <CommentForm productId={productId} />
        </div>
      </section>
    </>
  )
}
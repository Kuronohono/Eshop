import React, { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"

const ReviewModal = ({ open, onClose, onSubmit, initialReview }) => {
  const [rating, setRating] = useState(5)
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!open) return
    setRating(Number(initialReview?.rating ?? 5))
    setDescription(initialReview?.description ?? "")
    setError("")
  }, [open, initialReview])

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!description.trim()) {
      setError("Please write your review.")
      return
    }
    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.")
      return
    }
    setSubmitting(true)
    const ok = await onSubmit?.({ rating, description: description.trim() })
    setSubmitting(false)
    if (!ok) setError("Failed to save your review.")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[560px] rounded-[20px] bg-white p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-satoshibold text-[1.25em]">
            {initialReview ? "Edit Your Review" : "Write a Review"}
          </h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <IoClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-satoshi text-sm opacity-70">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="rounded-[12px] border border-black/10 bg-white px-3 py-2 outline-none"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} star{r > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-satoshi text-sm opacity-70">Review</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Share your experience with this product..."
              className="resize-none rounded-[12px] border border-black/10 px-3 py-2 outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={submitting} className="auth_button w-full disabled:opacity-60">
            {submitting ? "Saving..." : initialReview ? "Update Review" : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReviewModal

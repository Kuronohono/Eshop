import React, { useState, useEffect } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import ReviewCard from '../pages/ProductPageComponents/ReviewCard'

const reviews = [
    { username: "Sarah M.", reviewStar: 5, reviewText: "I'm blown away by the quality and style of the clothes I received. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." },
    { username: "Alex K.", reviewStar: 2, reviewText: "Finding clothes that align with my personal style used to be a challenge until I discovered this store. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions." },
    { username: "James L.", reviewStar: 4, reviewText: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon this shop. The selection of clothes is not only diverse but also on-point with the latest trends." },
    { username: "Mooe B.", reviewStar: 3, reviewText: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled. The selection of clothes is not only diverse but also on-point with the latest trends." },
    { username: "Nina R.", reviewStar: 1, reviewText: "Absolutely love this store! The quality is outstanding and shipping was faster than expected. Will definitely be ordering again soon." },
]

const TestimonialCarousel = () => {
    const [index, setIndex] = useState(0)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)")
        const update = () => {
            setIsDesktop(mq.matches)
            if (!mq.matches) setIndex(i => Math.min(i, reviews.length - 1))
            else setIndex(i => Math.min(i, Math.max(0, reviews.length - 3)))
        }
        update()
        mq.addEventListener("change", update)
        return () => mq.removeEventListener("change", update)
    }, [])

    const visibleCount = isDesktop ? 3 : 1
    const maxIndex = Math.max(0, reviews.length - visibleCount)

    const prev = () => setIndex(i => Math.max(0, i - 1))
    const next = () => setIndex(i => Math.min(maxIndex, i + 1))

    return (
        <div className="flex flex-col w-full gap-6 h-full">

            {/* Header */}
            <div className="flex w-full justify-between items-center">
                <h1 className="home_banner">Our Happy Customers</h1>
                <div className="flex gap-4">
                    <button
                        onClick={prev}
                        disabled={index === 0}
                        className="cursor-pointer disabled:opacity-30 transition-opacity active:scale-90">
                        <FaArrowLeft size={22} />
                    </button>
                    <button
                        onClick={next}
                        disabled={index >= maxIndex}
                        className="cursor-pointer disabled:opacity-30 transition-opacity active:scale-90">
                        <FaArrowRight size={22} />
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className=" h-full overflow-hidden lg:overflow-visible">

                {/* Left blur fade — desktop only */}
                <div className="hidden lg:block pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
                    style={{ background: "linear-gradient(to right, white 10%, transparent 100%)", opacity: index > 0 ? 1 : 0, transition: "opacity 0.3s" }} />

                {/* Right blur fade — desktop only */}
                <div className="hidden lg:block pointer-events-none absolute right-0 top-0 h-full w-32 z-10"
                    style={{ background: "linear-gradient(to left, white 10%, transparent 100%)", opacity: index < maxIndex ? 1 : 0, transition: "opacity 0.3s" }} />

                {isDesktop ? (
                    /* ── Desktop: 3-up sliding track ── */
                    <div
                        className="flex flex-nowrap gap-5 transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(calc(-${index} * (100% / 3 + 6px)))` }}>
                        {reviews.map((review, i) => {
                            const isFaded = i < index || i >= index + 3
                            return (
                                <div key={review.username}
                                    className="min-w-[calc(33.333%-14px)] transition-all duration-300"
                                    style={isFaded ? { filter: "blur(2px)", opacity: 0.5 } : undefined}>
                                    <ReviewCard
                                        username={review.username}
                                        reviewStar={review.reviewStar}
                                        reviewText={review.reviewText}
                                    />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    /* ── Mobile: 1-up, each card exactly fills the container ── */
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(calc(-${index} * 100%))` }}>
                        {reviews.map((review) => (
                            <div key={review.username} className="w-full shrink-0">
                                <ReviewCard
                                    username={review.username}
                                    reviewStar={review.reviewStar}
                                    reviewText={review.reviewText}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TestimonialCarousel
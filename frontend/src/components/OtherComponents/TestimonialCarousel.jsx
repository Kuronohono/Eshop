import React, { useState, useRef, useEffect } from 'react'
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
    const [visibleCount, setVisibleCount] = useState(3)

    const prev = () => setIndex(i => Math.max(0, i - 1))
    const next = () => setIndex(i => Math.min(reviews.length - visibleCount, i + 1))

    return (
        <div className="flex flex-col w-full gap-6">

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
                        disabled={index >= reviews.length - visibleCount}
                        className="cursor-pointer disabled:opacity-30 transition-opacity active:scale-90">
                        <FaArrowRight size={22} />
                    </button>
                </div>
            </div>

            {/* Cards */}
                <div className='h-full'>

                {/* Left blur fade */}
                <div className="hidden lg:block pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
                    style={{ background: "linear-gradient(to right, white 10%, transparent 100%)", opacity: index > 0 ? 1 : 0, transition: "opacity 0.3s" }}/>

                {/* Right blur fade */}
                <div className="hidden lg:block pointer-events-none absolute right-0 top-0 h-full w-32 z-10"
                    style={{ background: "linear-gradient(to left, white 10%, transparent 100%)", opacity: index < reviews.length - visibleCount ? 1 : 0, transition: "opacity 0.3s" }}/>

                <div
                    className="flex flex-nowrap gap-5 duration-500 lg:ease-in-out transition-transform"
                    style={{ transform: `translateX(calc(-${index} * (100% / ${visibleCount} + 6px)))` }}>
                    {reviews.map((review, i) => (
                        <div key={i} className="min-w-[calc(33.333%-14px)] transition-all duration-300"
                            style={{ filter: i < index || i >= index + visibleCount ? "blur(2px)" : "none", opacity: i < index || i >= index + visibleCount ? 0.5 : 1 }}>
                            <ReviewCard
                                username={review.username}
                                reviewStar={review.reviewStar}
                                reviewText={review.reviewText}
                            />
                        </div>
                    ))}
                </div>
            </div>
            </div>
    )
}

export default TestimonialCarousel
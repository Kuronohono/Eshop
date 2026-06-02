import React, { useState, useMemo } from 'react'
import ReviewCard from './ReviewCard'
import { IoMdOptions } from "react-icons/io";
import ComboBox from '../../OtherComponents/ComboBox';

const sortOptions = [
        { value: "popular", label: "Most Popular" },
        { value: "latest", label: "Latest" },
    ]

const RatingAndReviewsPage = ( {reviews} ) => {
  const [sortValue, setSortValue] = useState("latest")
  const [visibleCount, setVisibleCount] =  useState(6)

  const sortedReviews = useMemo( () => {
    const copy = [...reviews]
    if (sortValue === "popular"){
      return copy.sort( (a, b ) => b.rating - a.rating)
    }
    return copy.sort( (a, b) => b.id - a.id)
  }, [reviews, sortValue])

  const handleSortChange = (value) => {
    setSortValue(value)
    setVisibleCount(6)
  }

  const visibleReviews = sortedReviews.slice(0, visibleCount)
  const hasMore = visibleCount < sortedReviews.length

  const loadMore = () => {
    setVisibleCount(prev => prev + 6 )
  }

  return (
    <div className="flex flex-col w-full gap-5 mt-10">

        {/*Header and Options */}
        <div className="flex justify-between">

            <h1 className="font-satoshibold text-[1.25em] lg:text-[1.5em]">All Reviews <span className="opacity-40 text-[14px] lg:text-[16px]">({reviews.length})</span></h1>

            {/*Sorting and Options */}
            <div className="flex gap-3 items-center">
                <button type="button" className="filter_button"><IoMdOptions size={24} className="mx-2 my-3" /></button>
                <div className="hidden lg:flex bg-[#F0F0F0] px-5 pt-2 pb-3 rounded-[25px] items-center justify-center">
                  <ComboBox value={sortValue} onChange={handleSortChange} options={sortOptions}/>
                </div>
                <button className="writeAReviewBtn">Write a Review</button>
            </div>
        </div>

        {/*Reviews*/}
       {
        reviews.length == 0 ?
        <div className='w-full flex items-center justify-center'>
          <h1 className='font-satoshi text-[1.125em] opacity-60'>No Reviews for this product yet.</h1>
        </div>
        :
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {
            visibleReviews.map( (review) => (
              <ReviewCard key={review.id} username={review.username} reviewText={review.description} reviewStar={review.rating} dateStr={review.createdAt}/>
            ))
          }
        </div>
       }

        

        {hasMore && (
                <div className="flex items-center w-full justify-center mt-5">
                    <button className="loadMoreBtn" onClick={loadMore}>Load More Reviews</button>
                </div>
            )}
    </div>
  )
}

export default RatingAndReviewsPage
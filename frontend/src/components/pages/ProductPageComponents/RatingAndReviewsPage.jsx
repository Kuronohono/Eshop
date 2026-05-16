import React from 'react'
import ReviewCard from './ReviewCard'

const RatingAndReviewsPage = () => {
  return (
    <div className="flex flex-col w-full gap-5 mt-10">

        {/*Header and Options */}
        <div className="flex justify-between">

            <h1>All Reviews <span className="opacity-60 text-[12px]">(451)</span></h1>

            {/*Sorting and Options */}
            <div className="flex gap-2">
                
            </div>
        </div>

        {/*Reviews*/}
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <ReviewCard/>
        </div>

    </div>
  )
}

export default RatingAndReviewsPage
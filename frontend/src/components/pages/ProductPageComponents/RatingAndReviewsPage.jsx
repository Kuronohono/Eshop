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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ReviewCard username={"Samantha D."} reviewText={`I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.`} reviewStar={4.5}/>
            <ReviewCard username={"Ethan.R"} reviewStar={3.5} reviewText={"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."}/>
        </div>

    </div>
  )
}

export default RatingAndReviewsPage
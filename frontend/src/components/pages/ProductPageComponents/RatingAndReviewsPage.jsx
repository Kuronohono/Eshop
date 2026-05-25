import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import { IoMdOptions } from "react-icons/io";
import ComboBox from '../../OtherComponents/ComboBox';

const sortOptions = [
        { value: "popular", label: "Most Popular" },
        { value: "latest", label: "Latest" },
    ]

const RatingAndReviewsPage = () => {
  const [sortValue, setSortValue] = useState("latest")

  return (
    <div className="flex flex-col w-full gap-5 mt-10">

        {/*Header and Options */}
        <div className="flex justify-between">

            <h1 className="font-satoshibold text-[1.25em] lg:text-[1.5em]">All Reviews <span className="opacity-40 text-[14px] lg:text-[16px]">(451)</span></h1>

            {/*Sorting and Options */}
            <div className="flex gap-3 items-center">
                <button type="button" className="filter_button"><IoMdOptions size={24} className="mx-2 my-3" /></button>
                <div className="hidden lg:flex bg-[#F0F0F0] px-5 pt-2 pb-3 rounded-[25px] items-center justify-center">
                  <ComboBox value={sortValue} onChange={setSortValue} options={sortOptions}/>
                </div>
                <button className="writeAReviewBtn">Write a Review</button>
            </div>
        </div>

        {/*Reviews*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ReviewCard username={"Samantha D."} reviewText={`I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.`} reviewStar={4.5}/>
            <ReviewCard username={"Ethan.R"} reviewStar={3.5} reviewText={"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."}/>
        </div>

        <div className="flex items-center w-full justify-center mt-5">
          <button className="loadMoreBtn">Load More Reviews</button>
        </div>
    </div>
  )
}

export default RatingAndReviewsPage
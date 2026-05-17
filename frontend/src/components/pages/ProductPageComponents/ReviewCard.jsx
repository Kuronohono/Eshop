import React from 'react'
import StarRating from '../../OtherComponents/ProductComponents/StarRating'
import { FaCheckCircle } from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs";

const ReviewCard = ({username, reviewText, reviewStar}) => {
  return (
    <div className="flex flex-col border border-black/10 rounded-[20px] px-7 py-7 gap-4">
        <div className="flex items-center gap-2 md:gap-4 justify-between">
             <StarRating rating={reviewStar} starClassName="product_star_rate" divClassName="product_star_divClass"/>
             <BsThreeDots size={24} className="text-gray-600"/>
        </div>

        <div className="flex flex-col gap-2">
            <h1 className="font-satoshibold text-[16px] lg:text-[20px] flex items-center gap-2">{username}<FaCheckCircle className="text-green-600" /></h1>

        <p className="font-satoshi flex flex-wrap text-black/50 text-[14px] lg:text-[16px]">{reviewText}</p>

        </div>
        <span className="font-satoshi text-[14px] text-[16px] opacity-60">Posted on August 14, 2023</span>
    </div>
  )
}

export default ReviewCard
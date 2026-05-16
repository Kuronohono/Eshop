import React from 'react'
import StarRating from '../../OtherComponents/ProductComponents/StarRating'
import { FaCheckCircle } from "react-icons/fa"
const ReviewCard = () => {
  return (
    <div className="flex flex-col border border-black/10 rounded-[20px] px-7 py-7 gap-4">
        <div className="flex items-center gap-2 md:gap-4 justify-between">
             <StarRating rating={4.5} starClassName="product_star_rate" divClassName="product_star_divClass"/>
            <h4 className="font-satoshi text-[12px] md:text-[15px]">...</h4>
        </div>

        <div className="flex flex-col gap-2">
            <h1 className="font-satoshibold text-[16px] lg:text-[20px] flex items-center gap-2">Samantha D.<FaCheckCircle className="text-green-600" /></h1>

        <p className="font-satoshi flex flex-wrap text-black/50 text-[14px] lg:text-[16px]">"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."</p>

        </div>
        <span>Posted on August 14, 2023</span>
    </div>
  )
}

export default ReviewCard
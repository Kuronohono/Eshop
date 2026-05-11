import React from 'react'
import StarRating from '../ProductComponents/StarRating'
import ProductPrice from '../ProductComponents/ProductPrice'

const CardComponent = ({product}) => {
  return (
    <div className="flex flex-col gap-2 hover:scale-105 transition-all active:scale-100 cursor-pointer w-full pt-8">
        <img src={product?.img} alt="product" className=" w-full h-[200px] md:h-[300px] object-cover rounded-2xl bg-[#F0F0F0]"/>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-satoshibold text-16px md:text-[20px]">{product?.title}</h3>
                                <div className="flex items-center gap-2 md:gap-4">
                                    <StarRating rating={product.rating}/>
                                    <h4 className="font-satoshi text-[12px] md:text-[15px]">{product.rating}/5</h4>
                                </div>
                                <ProductPrice price={product.price} sale_per={product.sale_per}/>
                            </div>
                        </div>           

  )
}

export default CardComponent

import React from 'react'
import StarRating from '../ProductComponents/StarRating'
import ProductPrice from '../ProductComponents/ProductPrice'
import NoImageAvailable from '../../../assets/No_Image_Available.jpg'
import {Link} from "react-router-dom"

const CardComponent = ({product}) => {
  return (
    <Link to={`/${product.id}`} state={{product}} className="flex flex-col gap-2 hover:scale-105 transition-all active:scale-100 cursor-pointer w-full">
        <img 
        src={product?.imageUrls?.[0] || NoImageAvailable} 
        onError = {(e) =>{
            e.currentTarget.src = NoImageAvailable
        }}
        alt="product"
        className=" w-full h-[200px] md:h-[300px] object-cover rounded-2xl bg-[#F0F0F0]"/>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-satoshibold text-16px md:text-[20px] truncate">{product?.name}</h3>
                                {product?.productRating > 0 && (
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <StarRating rating={product.productRating}/>
                                        <h4 className="font-satoshi text-[12px] md:text-[15px]">{product.productRating}/5</h4>
                                    </div>
                                )}
                                <ProductPrice price={product.price} sale_per={product.discount}/>
                            </div>
        </Link>           

  )
}

export default CardComponent

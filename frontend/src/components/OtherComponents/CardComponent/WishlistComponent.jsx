import React from 'react'
import StarRating from '../ProductComponents/StarRating'
import ProductPrice from '../ProductComponents/ProductPrice'
import NoImageAvailable from '../../../assets/No_Image_Available.jpg'
import {Link} from "react-router-dom"
import { LuShoppingCart } from "react-icons/lu";

const WishlistComponent = ({ product, crumbs }) => {
    

  const nextCrumbs = Array.isArray(crumbs) && crumbs.length > 0
    ? [...crumbs, { label: product?.name ?? String(product?.id ?? "Product"), to: `/${product.id}` }]
    : undefined

    const addToCart = async () => {
        
    }


  return (
    <div className=' hover:scale-105 transition-all active:scale-100 '>

        <button
        onClick={addToCart}className={`absolute w-7 h-7 mx-3 my-3 hover:cursor-pointer`}>
            <LuShoppingCart  className='w-full h-full'/>
        </button>

        <Link
        to={`/${product.id}`}
        state={{ product, crumbs: nextCrumbs }}
        className="flex flex-col gap-2 cursor-pointer w-full touch-pan-x"
        >
        <div className='card_div'>
            <img 
            src={product?.imageUrls?.[0] || NoImageAvailable} 
            onError = {(e) =>{
                e.currentTarget.src = NoImageAvailable
            }}
            alt="product"
            className={`w-full h-full object-contain lg:object-cover object-top rounded-2xl`}/>
            </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-satoshibold text-16px md:text-[20px] truncate">{product?.name}</h3>
                                    {product?.productRating > 0 && (
                                        <div className="flex items-center gap-2 md:gap-4">
                                            <StarRating rating={product.productRating} starClassName="star_rate" divClassName="div_className"/>
                                            <h4 className="font-satoshi text-[12px] md:text-[15px]">{product.productRating}/5</h4>
                                        </div>
                                    )}
                                    <ProductPrice price={product.price} sale_per={product.discount} pricingDivClass="pricing_div" newPriceClass="newPrice" oldPriceClass="oldPrice" discountClass="discountPer"/>
                                </div>
            </Link>
        </div>           
  )
}

export default WishlistComponent

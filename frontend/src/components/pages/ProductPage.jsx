import React from 'react'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import frontImg from '../../assets/product_images/front.png'
import backImg from '../../assets/product_images/back.png'
import wearImg from '../../assets/product_images/wearing.png'
import { useLocation } from 'react-router-dom'
import StarRating from '../OtherComponents/ProductComponents/StarRating'
import ProductPrice from '../OtherComponents/ProductComponents/ProductPrice'



const ProductPage = () => {
    const {state} = useLocation()
    const product = state?.product

  return (
    <div className="screen-adapt">
        <div className="flex flex-col mb-[10%] w-full gap-7">

            <div className="h-px bg-black opacity-10 mx-auto w-full" />

            {/*Breadcrumb */}
            <Breadcrumb/>

            {/* Product Images and Options */}
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start">

                {/* Images Section */}
                <div className="flex">

                    {/* Main Image shown */}
                    <img src={frontImg} className="object-contain w-200 h-50"/>
                </div>

                {/*Options and Shopping Section */}
                <div className="flex flex-col gap-2 divide-y divide-black/10">

                    {/* Product Details */}
                    <div className="flex flex-col gap-3">
                        {/*Product Title */}
                        <h1 className="product_header">{product.name}</h1>
                        
                        {/*Product Rating */}
                        <div className="flex items-center gap-2 md:gap-4">
                            <StarRating rating={4.5}/>
                            <h4 className="font-satoshi text-[12px] md:text-[15px]">{4.5}/5</h4>
                        </div>

                        {/* Product Price */}
                        <ProductPrice price={product.price} sale_per={product.discount}/>

                        {/* Product Description */}
                        <p className="product_description mb-5">{product.description}</p>
                    </div>

                    {/* Product Available Colors */}
                    <div className="flex flex-col">
                        <span clasName="product_select_option">Select Colors</span>
                    </div>

                </div>
            </div>

            {/* Product Details Rating and FAQs */}
        </div>
    </div>
  )
}

export default ProductPage
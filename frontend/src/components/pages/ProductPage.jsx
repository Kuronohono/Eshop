import React, { useState, useEffect } from 'react'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import frontImg from '../../assets/product_images/front.png'
import backImg from '../../assets/product_images/back.png'
import wearImg from '../../assets/product_images/wearing.png'
import { useLocation } from 'react-router-dom'
import StarRating from '../OtherComponents/ProductComponents/StarRating'
import ProductPrice from '../OtherComponents/ProductComponents/ProductPrice'
import ColorButtonGroup from '../OtherComponents/FilterComponents/ColorButtonGroup'
import AvailalbleColors from './ProductPageComponents/AvailalbleColors'



const ProductPage = () => {
    const {state} = useLocation()
    const product = state?.product
    const [colors,setColors] = useState([])
    const [images,setImages] = useState(product?.imageUrls || [])
    const [mainImage, setMainImage] = useState(product?.imageUrls[0] || '')

    useEffect(() => {
        fetch(`http://localhost:8085/product-variants/colors/${product.id}`)
        .then(res => res.json())
        .then(data => setColors(data))
        .catch( err => 
            console.error("Failed to fetch colors:", err))
    }, [product?.id] )

   

  return (
    <div className="screen-adapt">
        <div className="flex flex-col mb-[10%] w-full gap-7">

            <div className="h-px bg-black opacity-10 mx-auto w-full" />

            {/*Breadcrumb */}
            <Breadcrumb/>

            {/* Product Images and Options */}
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start">

                {/* Images Section */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {
                           images.map((image, index) =>(
                            <img src={image} key={index} className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"/>
                           )) 
                        }
                    </div>

                    <div className="w-full sm:w-[80%]">
                            <img src={mainImage} className="w-full"/>
                    </div>
                </div>

                {/*Options and Shopping Section */}
                <div className="flex flex-col gap-2 divide-y divide-black/10">

                    {/* Product Details */}
                    <div className="flex flex-col gap-3">
                        {/*Product Title */}
                        <h1 className="product_header">{product.name}</h1>
                        
                        {/*Product Rating */}
                        <div className="flex items-center gap-2 md:gap-4">
                            <StarRating rating={4.5} starClassName="product_star_rate" divClassName="product_star_divClass"/>
                            <h4 className="font-satoshi text-[12px] md:text-[15px]">{4.5}/5</h4>
                        </div>

                        {/* Product Price */}
                        <ProductPrice price={product.price} sale_per={product.discount}/>

                        {/* Product Description */}
                        <p className="product_description mb-5">{product.description}</p>
                    </div>

                    {/* Product Available Colors */}
                    <div className="flex flex-col">
                        <span className="product_select_option">Select Colors</span>
                        <AvailalbleColors colors={colors}/>
                    </div>

                    {/* Product Available Sizes */}
                    <div className="flex flex-col">
                        <span className="product_select_option">Choose Size</span>
                    </div>
                </div>
            </div>

            {/* Product Details Rating and FAQs */}
        </div>
    </div>
  )
}

export default ProductPage
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
import AvailableSizes from './ProductPageComponents/AvailableSizes'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import TabNavigation from './ProductPageComponents/TabNavigation'
import ProductDetailsPage from './ProductPageComponents/ProductDetailsPage'
import RatingAndReviewsPage from './ProductPageComponents/RatingAndReviewsPage'
import FAQsPage from './ProductPageComponents/FAQsPage'

const Tabs = [
{ id: "tab1", label: "Product Details" },
{ id: "tab2", label: "Rating & Reviews" },
{ id: "tab3", label: "FAQs"}
]

const tabContent = {
    tab1: <ProductDetailsPage/>,
    tab2: <RatingAndReviewsPage/>,
    tab3: <FAQsPage/>
}

const ProductPage = () => {
    const {state} = useLocation()
    const product = state?.product
    const [colors,setColors] = useState([])
    const [images,setImages] = useState(product?.imageUrls || [])
    const [mainImage, setMainImage] = useState(product?.imageUrls[0] || '')
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedColorStock, setStock] = useState([])
    const [sizes, setSizes] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [activeTab, setActiveTab] = useState("tab1")

    useEffect(() => {
        fetch(`http://localhost:8085/product-variants/colors/${product.id}`)
        .then(res => res.json())
        .then(data => setColors(data))
        .catch( err => 
            console.error("Failed to fetch colors:", err))
    }, [product?.id] )

    useEffect(() => {
        if (!selectedColor) return
        fetch(`http://localhost:8085/product-variants/sizes/${product.id}/${selectedColor}`)
            .then(res => res.json())
            .then(data => setSizes(data))
            .catch(err => console.error("Failed to fetch sizes:", err))
    }, [selectedColor])

    useEffect(() => {
    if (!selectedColor) return
    fetch(`http://localhost:8085/product-variants/sizes/${product.id}/${selectedColor}`)
        .then(res => res.json())
        .then(data => setSizes(data))

    fetch(`http://localhost:8085/product-variants/variant/${product.id}/${selectedColor}`)
        .then(res => res.json())
        .then(data => setSelectedVariant(data))
        .catch(err => console.error("Failed to fetch variant:", err))
}, [selectedColor])

    const increase = () => setQuantity(prev => Math.min(selectedVariant?.stock ?? 0, prev + 1))
    const decrease = () => setQuantity(prev => Math.max(0, prev - 1))

    console.log(selectedVariant?.stock)
   

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
                            <img onClick={() => setMainImage(image)} src={image} key={index} className={`w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer rounded-[20px] ${mainImage == image ? "border border-black" : "border-0"}`}/>
                           )) 
                        }
                    </div>

                    <div className="w-full sm:w-[80%]">
                            <img src={mainImage} className="w-full h-full max-h-[530px] object-contain object-top hover:cursor-zoom-in"/>
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
                    <div className="flex flex-col gap-3 mt-3">
                        <span className="product_select_option">Select Colors</span>
                        <AvailalbleColors colors={colors} onColorSelect={setSelectedColor}/>
                    </div>

                    {/* Product Available Sizes */}
                    <div className="flex flex-col gap-3 my-3">
                        <span className="product_select_option">Choose Size</span>
                        <AvailableSizes sizes={sizes}/>
                    </div>

                    {/* Quantity Counter and Checkout Button */}
                    <div className="flex items-center gap-5">

                        {/*Quantity Counter */}
                        <div className="flex bg-[#F0F0F0] rounded-[62px] gap-4 md:gap-6 items-center py-3 px-6 md:px-10">
                            <button onClick={decrease} className="active:scale-80 cursor-pointer"><FaMinus size={12}/></button>
                            <span className="text-[14px]">{quantity}</span>
                            <button onClick={increase} className="active:scale-80 cursor-pointer"><FaPlus size={16}/></button>
                        </div>

                        <button className="add_toCart_btn">
                        Add to Cart
                        </button>

                    </div>
                </div>
            </div>

            {/* Product Details Rating and FAQs */}
            <div className="flex flex-col w-full  lg:mx-[0] mt-5">

                <div className="relative flex justify-between border-b border-black/10">
                        
                        <div className="absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out"
                            style={{ width: `${100 / Tabs.length}%`, left: `${(Tabs.findIndex(t => t.id === activeTab) / Tabs.length) * 100}%` }}/>

                        {
                            Tabs.map( (tab) => (
                                <button
                                    key={tab.id}
                                    className={`cursor-pointer relative px-4 py-3 font-satoshi text-[16px] lg:text-[20px] w-full transition-colors duration-200 ${
                                        activeTab === tab.id ? "text-black" : "text-black/50 hover:text-black/70"
                                    }`}
                                    onClick={() => setActiveTab(tab.id)}>
                                    {tab.label}
                                </button>
                            ))}
                </div>
                <div>{tabContent[activeTab]}</div>

            </div>
        </div>
    </div>
  )
}

export default ProductPage
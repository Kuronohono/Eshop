import React, { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import { useLocation } from 'react-router-dom'
import StarRating from '../OtherComponents/ProductComponents/StarRating'
import ProductPrice from '../OtherComponents/ProductComponents/ProductPrice'
import AvailalbleColors from './ProductPageComponents/AvailalbleColors'
import AvailableSizes from './ProductPageComponents/AvailableSizes'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import ProductDetailsPage from './ProductPageComponents/ProductDetailsPage'
import RatingAndReviewsPage from './ProductPageComponents/RatingAndReviewsPage'
import FAQsPage from './ProductPageComponents/FAQsPage'
import Carousel from '../OtherComponents/FilterComponents/Carousel'

const Tabs = [
    { id: "tab1", label: "Product Details" },
    { id: "tab2", label: "Rating & Reviews" },
    { id: "tab3", label: "FAQs"}
]

const ProductPage = () => {
    const {state} = useLocation()
    const product = state?.product
    const [colors, setColors] = useState([])
    const [images, setImages] = useState(product?.imageUrls || [])
    const [mainImage, setMainImage] = useState(product?.imageUrls?.[0] || '')
    const [selectedColor, setSelectedColor] = useState(null)
    const [sizes, setSizes] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [activeTab, setActiveTab] = useState("tab1")
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
    const tabRefs = useRef({})

    const tabContent = {
        tab1: <ProductDetailsPage product={product}/>,
        tab2: <RatingAndReviewsPage product={product}/>,
        tab3: <FAQsPage product={product}/>
    }

    useEffect(() => {
        const activeBtn = tabRefs.current[activeTab]
        if (activeBtn) {
            setIndicatorStyle({
                width: activeBtn.offsetWidth,
                left: activeBtn.offsetLeft
            })
        }
    }, [activeTab])

    useEffect(() => {
        fetch(`http://localhost:8085/product-variants/colors/${product.id}`)
            .then(res => res.json())
            .then(data => setColors(data))
            .catch(err => console.error("Failed to fetch colors:", err))
    }, [product?.id])

    useEffect(() => {
        if (!selectedColor) return
        fetch(`http://localhost:8085/product-variants/sizes/${product.id}/${selectedColor}`)
            .then(res => res.json())
            .then(data => setSizes(data))
            .catch(err => console.error("Failed to fetch sizes:", err))

        fetch(`http://localhost:8085/product-variants/variant/${product.id}/${selectedColor}`)
            .then(res => res.json())
            .then(data => setSelectedVariant(data))
            .catch(err => console.error("Failed to fetch variant:", err))
    }, [selectedColor])

    const increase = () => setQuantity(prev => Math.min(selectedVariant?.stock ?? 0, prev + 1))
    const decrease = () => setQuantity(prev => Math.max(0, prev - 1))

    return (
        <div className="screen-adapt">
            <div className="flex flex-col mb-[10%] w-full gap-7">

                <div className="h-px bg-black opacity-10 mx-auto w-full" />

                <Breadcrumb/>

                {/* Product Images and Options */}
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start">

                    {/* Images Section */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row ">
                        <div className="flex sm:flex-col w-full overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-scroll justify-between sm:justify-normal items-center max-h-132.5 2xl:max-h-[750px] lg:w-30">
                            {images.map((image, index) => (
                                <img
                                    onClick={() => setMainImage(image)}
                                    src={image}
                                    key={index}
                                    className={`w-[24%] sm:w-full sm:mb-3 mx-2 shrink-0 cursor-pointer rounded-[10%] ${mainImage === image ? "border border-black" : "border-0"}`}
                                />
                            ))}
                        </div>

                        <div className="w-full sm:w-[80%]">
                            <img src={mainImage} className="w-full h-full max-h-132.5 2xl:max-h-[750px] object-contain object-top hover:cursor-zoom-in rounded-[20px]"/>
                        </div>
                    </div>

                    {/* Options and Shopping Section */}
                    <div className="flex flex-col gap-2 divide-y divide-black/10">

                        <div className="flex flex-col gap-3">
                            <h1 className="product_header">{product.name}</h1>

                            <div className="flex items-center gap-2 md:gap-4">
                                <StarRating rating={4.5} starClassName="product_star_rate" divClassName="product_star_divClass"/>
                                <h4 className="font-satoshi text-[12px] md:text-[15px]">{4.5}/5</h4>
                            </div>

                            <ProductPrice price={product.price} sale_per={product.discount}/>

                            <p className="product_description mb-5">{product.description}</p>
                        </div>

                        <div className="flex flex-col gap-3 mt-3">
                            <span className="product_select_option">Select Colors</span>
                            <AvailalbleColors colors={colors} onColorSelect={setSelectedColor}/>
                        </div>

                        <div className="flex flex-col gap-3 my-3">
                            <span className="product_select_option">Choose Size</span>
                            <AvailableSizes sizes={sizes}/>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="flex bg-[#F0F0F0] rounded-[62px] gap-4 md:gap-6 items-center py-3 px-6 md:px-10">
                                <button onClick={decrease} className="active:scale-80 cursor-pointer"><FaMinus size={12}/></button>
                                <span className="text-[14px]">{quantity}</span>
                                <button onClick={increase} className="active:scale-80 cursor-pointer"><FaPlus size={16}/></button>
                            </div>

                            <button className="add_toCart_btn">Add to Cart</button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-col w-full lg:mx-0 mt-5">
                    <div className="relative flex border-b border-black/10">

                        <div
                            className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out"
                            style={{ width: indicatorStyle.width, left: indicatorStyle.left }}
                        />

                        {Tabs.map((tab) => (
                            <button
                                key={tab.id}
                                ref={el => tabRefs.current[tab.id] = el}
                                className={`product_tabs ${
                                    activeTab === tab.id ? "text-black" : "text-black/50 hover:text-black/70"
                                }`}
                                onClick={() => setActiveTab(tab.id)}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div>{tabContent[activeTab]}</div>
                </div>

                {/* You Might Also Like */}
                <div>
                    <div className="flex items-center justify-center pt-8 md:pt-15">
                        <h1 className="home_banner">You might also like</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        <Carousel />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductPage
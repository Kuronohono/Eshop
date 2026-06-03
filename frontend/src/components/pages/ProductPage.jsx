import React, { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import { useLocation, useParams } from 'react-router-dom'
import StarRating from '../OtherComponents/ProductComponents/StarRating'
import ProductPrice from '../OtherComponents/ProductComponents/ProductPrice'
import AvailalbleColors from './ProductPageComponents/AvailalbleColors'
import AvailableSizes from './ProductPageComponents/AvailableSizes'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import ProductDetailsPage from './ProductPageComponents/ProductDetailsPage'
import RatingAndReviewsPage from './ProductPageComponents/RatingAndReviewsPage'
import FAQsPage from './ProductPageComponents/FAQsPage'
import ReviewModal from './ProductPageComponents/ReviewModal'
import Carousel from '../OtherComponents/FilterComponents/Carousel'
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa"

const Tabs = [
    { id: "tab1", label: "Product Details" },
    { id: "tab2", label: "Rating & Reviews" },
    { id: "tab3", label: "FAQs"}
]

const ProductPage = () => {
    const { state } = useLocation()
    const { product: productId } = useParams()
    const [product, setProduct] = useState(state?.product ?? null)
    const [colors, setColors] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [images, setImages] = useState(product?.imageUrls || [])
    const [mainImage, setMainImage] = useState(product?.imageUrls?.[0] || '')
    const [selectedColor, setSelectedColor] = useState(null)
    const [sizes, setSizes] = useState([])
    const [selectedSize, setSelectedSize] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [addError, setAddError] = useState("")
    const [activeTab, setActiveTab] = useState("tab1")
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
    const tabRefs = useRef({})
    const [wishlisted, setWishlisted] = useState(false)
    const [reviews, setReviews] = useState([])
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [lightboxOpen, setLightBoxOpen] = useState(false)
    const [variantStock, setVariantStock] = useState(null)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [myReview, setMyReview] = useState(null)
    const [selectedVariantId, setSelectedVariantId] = useState(null)

    const toggleWishlist = async () => {
        if(isAuthenticated){
            fetch(`http://localhost:8085/product-variants/variant/${product.id}?color=${selectedColor}`)
                .then(res => res.json())
                .then(data => {
                    setSelectedVariantId(data.id)
                })

              if (!selectedVariantId) {
                setAddError("Please select a color first.")
                return
             }
             setAddError("")

             console.log("Mark 1")

            //Check If the user has selected a color and size
            if (!selectedColor || !selectedSize) {
            setAddError("Please select a color and size first.")
            return
            }

            console.log("Mark 2")

            // Determine target URL and HTTP Method based on current status
            const method = wishlisted ? "DELETE" : "POST";
            const url = `http://localhost:8085/users/me/wishlist/${selectedVariantId.id}`;

            const token = localStorage.getItem("token");
            try {
                const res = await fetch(url, {
                    method: method,
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) {
                    throw new Error(`Failed to ${wishlisted ? "remove from" : "add to"} wishlist`);
                }

                // Optimistically flip the UI state upon a successful backend response
                setWishlisted((prev) => !prev);
            } catch (err) {
                console.error(err);
                setAddError(err.message || "Something went wrong updating your wishlist.");
            }
        }
        else{
            window.location.replace("/login");
        }
    }

    useEffect(() => {
    setAuthenticated(!!localStorage.getItem("token"))
    }, [state])

    const tabContent = {
        tab1: <ProductDetailsPage product={product}/>,
        tab2: (
            <RatingAndReviewsPage
                reviews={reviews}
                onWriteReview={() => {
                    if (!isAuthenticated) {
                        window.location.replace("/login")
                        return
                    }
                    setReviewModalOpen(true)
                }}
                userHasReview={!!myReview}
            />
        ),
        tab3: <FAQsPage product={product}/>
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" })
        setActiveTab("tab1")
        setAddError("")
        setQuantity(0)
        setSelectedColor(null)
        setSelectedSize(null)
        setSizes([])
        setColors([])

        const fromState = state?.product
        if (fromState?.id && String(fromState.id) === String(productId)) {
            setProduct(fromState)
            setImages(fromState.imageUrls || [])
            setMainImage(fromState.imageUrls?.[0] || "")
            return
        }

        if (!productId) return
        fetch(`http://localhost:8085/products/${productId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch product")
                return res.json()
            })
            .then((data) => {
                setProduct(data)
                setImages(data?.imageUrls || [])
                setMainImage(data?.imageUrls?.[0] || "")
            })
            .catch((err) => console.error(err))
    }, [productId])

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
        if (!product?.id) return
        fetch(`http://localhost:8085/product-variants/colors/${product.id}`)
            .then(res => res.json())
            .then(data => {
                setColors(data)
                // Default select first color so it's checked and sizes load immediately.
                const first = Array.isArray(data) && data.length > 0 ? data[0] : null
                if (first) setSelectedColor(first)
            })
            .catch(err => console.error("Failed to fetch colors:", err))
    }, [product?.id])


    useEffect(() => {
        fetch(`http://localhost:8085/products/you_might_also_like`)
        .then(res => res.json())
            .then(data => {
                setSuggestions(data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [productId])

    const sortSizes = (list) => {
        const order = {
            XXS: 1, XS: 2, S: 3, M: 4, L: 5, XL: 6, XXL: 7, XXXL: 8,
            "2XS": 1, "X-SMALL": 2, SMALL: 3, MEDIUM: 4, LARGE: 5, "X-LARGE": 6, "2XL": 7, "3XL": 8,
        }

        return [...(list ?? [])].sort((a, b) => {
            const A = String(a).trim()
            const B = String(b).trim()

            const aNum = Number(A)
            const bNum = Number(B)
            const aIsNum = !Number.isNaN(aNum) && A !== ""
            const bIsNum = !Number.isNaN(bNum) && B !== ""
            if (aIsNum && bIsNum) return aNum - bNum

            const aKey = order[A.toUpperCase()]
            const bKey = order[B.toUpperCase()]
            if (aKey != null && bKey != null) return aKey - bKey
            if (aKey != null) return -1
            if (bKey != null) return 1

            return A.localeCompare(B)
        })
    }

    useEffect(() => {
        if (!selectedColor || !product?.id) return
        fetch(`http://localhost:8085/product-variants/sizes/${product.id}/${selectedColor}`)
            .then(res => res.json())
            .then(data => {
                setSelectedVariantId(data.id)
                setSizes(sortSizes(data.sizes ?? data))
                setSelectedSize(null)
                setAddError("")
                setQuantity(0)
                setVariantStock(null)
            })
            .catch(err => console.error("Failed to fetch sizes:", err))
    }, [selectedColor, product?.id])


    /* Get Product Variant Stock */
    useEffect(() => {
    if (!selectedColor || !selectedSize || !product?.id) return

    fetch(`http://localhost:8085/product-variants/stock/${product.id}?color=${selectedColor}&size=${selectedSize}`)
        .then(res => res.json())
        .then(data => {
            setVariantStock(data.stock ?? data ?? null)
            setQuantity(0)
        })
        .catch(err => console.error("Failed to fetch variant stock:", err))
    }, [selectedColor, selectedSize, product?.id])


    /* Calculate Max Variant Stock */
    const getMaxQuantity = () => {
        if(typeof variantStock === "number" && variantStock > 0) return variantStock
        return 99
    }

    const loadReviews = async (id) => {
        if (!id) return
        try {
            const res = await fetch(`http://localhost:8085/reviews/product/${id}`)
            const data = await res.json()
            setReviews(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
        }
    }

    const loadMyReview = async (id) => {
        if (!id || !localStorage.getItem("token")) {
            setMyReview(null)
            return
        }
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`http://localhost:8085/reviews/product/${id}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.json()
            setMyReview(data?.id ? data : null)
        } catch (err) {
            console.error(err)
            setMyReview(null)
        }
    }

    const refreshProductAndReviews = async () => {
        if (!productId) return
        try {
            const productRes = await fetch(`http://localhost:8085/products/${productId}`)
            if (productRes.ok) {
                const latestProduct = await productRes.json()
                setProduct(latestProduct)
            }
        } catch (err) {
            console.error(err)
        }
        await loadReviews(productId)
        await loadMyReview(productId)
    }

    useEffect(() => {
        if (!product?.id) return
        loadReviews(product.id)
        loadMyReview(product.id)
    }, [product?.id, isAuthenticated])

    const increase = () => setQuantity((prev) => Math.min(getMaxQuantity(), prev + 1))
    const decrease = () => setQuantity((prev) => Math.max(0, prev - 1))

    const handleAddToCart = async () => {
        setAddError("")

        if (!selectedColor || !selectedSize) {
            setAddError("Please select a color and size first.")
            return
        }

        if (quantity <= 0) {
            setAddError("Please select a quantity.")
            return
        }

        if (!isAuthenticated) {
            setAddError("Please log in to add items to your cart.")
            return
        }

        try {
            const params = new URLSearchParams({
                size: selectedSize,
                color: selectedColor,
                quantity: String(quantity),
            })

            const token = localStorage.getItem("token");

            // Try to add the item
            const res = await fetch(`http://localhost:8085/users/me/cart/${product.id}?${params.toString()}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || "Failed to add to cart")
            }

             setVariantStock(prev =>
                    typeof prev === "number" ? Math.max(0, prev - quantity) : prev
                )

            // Sync cart count from backend so navbar stays accurate.
            const cartRes = await fetch("http://localhost:8085/users/me/cart", {
                headers: { Authorization: `Bearer ${token}` },
            })
            
            if (cartRes.ok) {
                const text = await cartRes.text()
                if(text){
                    const cartItems = JSON.parse(text)
                    localStorage.setItem("cartCount", String(Array.isArray(cartItems) ? cartItems.length : 0))
                }
            }

            window.dispatchEvent(new Event("cartUpdated"))

            setQuantity(0)
        } catch (e) {
            setAddError(e?.message || "Failed to add to cart")
        }
    }

    const handleReviewSubmit = async ({ rating, description }) => {
        if (!product?.id) return false
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`http://localhost:8085/reviews/product/${product.id}/me`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ rating, description })
            })
            if (!res.ok) return false
            setReviewModalOpen(false)
            await refreshProductAndReviews()
            window.location.reload()
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }

    
    /* Check if the product is already in the user's wishlist */
    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token || !product?.id) {
            setWishlisted(false);
            return;
        }

        fetch("http://localhost:8085/users/me/wishlist", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch wishlist");
                return res.json();
            })
            .then((wishlistItems) => {
                // Check if the current product's ID exists in the fetched wishlist array
                const isItemWishlisted = Array.isArray(wishlistItems) && 
                    wishlistItems.some(item => String(item.product_id) === String(product.id));
                
                setWishlisted(isItemWishlisted);
            })
            .catch((err) => console.error("Error verifying wishlist status:", err));
    }, [product?.id]);

    return (
        <div className="screen-adapt w-full gap-10">
            <div className="flex flex-col w-full gap-7">

                <div className="h-px bg-black opacity-10 mx-auto w-full" />

                <Breadcrumb/>

                {/* Product Images and Options */}
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start gap-2">

                    {/* Images Section */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row ">
                        <div className="flex sm:flex-col w-full overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-scroll sm:justify-normal items-center max-h-132.5 2xl:max-h-187.5 lg:w-30">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className={`w-[24%] sm:w-full shrink-0 mx-2 sm:mx-0 sm:mb-3 rounded-[10%] overflow-hidden cursor-pointer aspect-square ${mainImage === image ? "border border-black" : "border-0"}`}
                                >
                                    <img
                                        src={image}
                                        className="w-full h-full object-contain object-top"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="relative w-full sm:w-[80%]">
                            <img src={mainImage} className="w-full h-full max-h-132.5 2xl:max-h-187.5 object-contain object-top hover:cursor-zoom-in rounded-[20px]" onClick={() => setLightBoxOpen(true)}/>
                            <button
                            onClick={toggleWishlist}
                            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"} 
                            className={`wishlist_button`}>
                                {
                                    wishlisted?
                                    <FaHeart  className='w-full h-full'/>
                                    :
                                    <FaRegHeart className='w-full h-full'/>
                                }
                            </button>
                        </div>
                    </div>

                    {/* Options and Shopping Section */}
                    <div className="flex flex-col gap-2 divide-y divide-black/10 lg:ml-2">

                        <div className="flex flex-col gap-3">
                            <h1 className="product_header">{product.name}</h1>

                            <div className="flex items-center gap-2 md:gap-4">
                                <StarRating rating={product.productRating} starClassName="product_star_rate" divClassName="product_star_divClass"/>
                                <h4 className="font-satoshi text-[0.9em]">{product.productRating}/5</h4>
                            </div>

                            <ProductPrice price={product.price} sale_per={product.discount} pricingDivClass="pricing_div" newPriceClass="newPrice_proPage" oldPriceClass="oldPrice_proPage" discountClass="discountPer_proPage"/>

                            <p className="product_description mb-5">{product.description}</p>
                        </div>

                        <div className="flex flex-col gap-3 mt-3">
                            <span className="product_select_option">Select Colors</span>
                            <AvailalbleColors colors={colors} selectedColor={selectedColor} onColorSelect={setSelectedColor}/>
                        </div>

                        <div className="flex flex-col gap-3 my-3">
                            <span className="product_select_option">Choose Size</span>
                            <AvailableSizes sizes={sizes} selectedSize={selectedSize} onSizeSelect={setSelectedSize}/>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="flex bg-[#F0F0F0] rounded-[62px] gap-4 md:gap-6 items-center py-3 px-6 md:px-10">
                                <button type="button" onClick={decrease} disabled={quantity <= 0} className="active:scale-80 cursor-pointer disabled:opacity-40"><FaMinus size={12}/></button>
                                <span className="text-[14px]">{quantity}</span>
                                <button type="button" onClick={increase} disabled={quantity >= getMaxQuantity()} className="active:scale-80 cursor-pointer disabled:opacity-40"><FaPlus size={16}/></button>
                            </div>

                            <button
                                className="add_toCart_btn"
                                onClick={handleAddToCart}
                                disabled={!selectedColor || !selectedSize || quantity <= 0}
                                style={!selectedColor || !selectedSize || quantity <= 0 ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
                            >
                                Add to Cart
                            </button>
                        </div>
                        {addError && (
                            <p className="font-satoshi text-sm text-red-500 mt-2">{addError}</p>
                        )}
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
                <div className="flex flex-col gap-10">
                    <div className="flex items-center justify-center pt-8 md:pt-15">
                        <h1 className="home_banner">You might also like</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full min-w-0 gap-10">
                        <Carousel
                            items={suggestions}
                            crumbs={[{label: "Home", to: "/"}]}
                        />
                    </div>
                </div>

            </div>


            {lightboxOpen && (
                <div 
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                    onClick={() => setLightBoxOpen(false)}
                >
                    <img 
                        src={mainImage} 
                        className="max-h-screen max-w-full object-contain rounded-xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button 
                        className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer"
                        onClick={() => setLightBoxOpen(false)}
                    >
                        ✕
                    </button>
                </div>
            )}
            <ReviewModal
                open={reviewModalOpen}
                onClose={() => setReviewModalOpen(false)}
                onSubmit={handleReviewSubmit}
                initialReview={myReview}
            />
        </div>

        
    )
}

export default ProductPage
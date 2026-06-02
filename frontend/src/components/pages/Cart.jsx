import React, { useState, useEffect } from 'react'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import CartProduct from '../OtherComponents/ProductComponents/CartProduct'
import { MdOutlineDiscount } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const toCartItem = (cartItem) => {
    const baseProduct = cartItem?.product ?? cartItem
    return {
        id: cartItem?.id ?? baseProduct?.id,
        img: baseProduct?.imageUrls?.[0],
        title: baseProduct?.name,
        size: cartItem?.size ?? baseProduct?.size ?? "—",
        color: cartItem?.color ?? baseProduct?.color ?? "—",
        quantity: cartItem?.quantity ?? baseProduct?.quantity ?? 1,
        price: baseProduct?.price,
        discount: baseProduct?.discount,
    }
}

const PROMO_CODES = {
    "ESHOP20": 20,
    "SUMMER10": 10,
    "HOLIDAY15": 15
}

const Cart = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cart_products, setCartProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [AppliedPromo, setAppliedPromo] = useState(false)
    const [promoInput, setPromoInput] = useState("")
    const [promoDiscount, setPromoDiscount] = useState(0)
    const [promoError, setPromoError] = useState(null)
    const handleApplyPromo = () => {
        const discount = PROMO_CODES[promoInput.toUpperCase()]
        if (discount) {
            setPromoDiscount(discount)
            setAppliedPromo(true)
            setPromoError("")
        } else {
            setPromoDiscount(0)
            setAppliedPromo(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        if (!token) {
            localStorage.setItem("cartCount", "0");
            window.dispatchEvent(new Event("cartUpdated"));
            setLoading(false);
            return;
        }

        fetch("http://localhost:8085/users/me/cart", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || `Failed to load cart (${res.status})`);
                }
                return res.json();
            })
            .then((data) => {
                const items = Array.isArray(data) ? data : [];
                setCartProducts(items);
                localStorage.setItem("cartCount", String(items.length));
                window.dispatchEvent(new Event("cartUpdated"));
            })
            .catch((err) => {
                console.error(err);
                setCartProducts([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const subtotal = cart_products.reduce((sum, item) => {
        const price = (item?.product?.price ?? item?.price ?? 0) * (1 - (item?.product?.discount ?? item?.discount ?? 0) / 100)
        const quantity = item?.quantity ?? 1
        return sum + price * quantity
    }, 0)

    const deliveryFee = cart_products.reduce((sum, item) => sum + (item?.quantity ?? 1) * 20, 0)

    const total = subtotal - (subtotal * promoDiscount / 100) + deliveryFee 

  return(
    <div className="screen-adapt">

        <div className={`w-full h-full items-center justify-center ${isLoggedIn ? "hidden" : "flex"}`}>
            <h1 className='font-satoshibold text-[16px] lg:text-[24px] '>Log in to view your cart.</h1>

        </div>
        <div className={`flex-col mb-[10%] w-full ${isLoggedIn ?  "flex" : "hidden"}`}>

            <div className="h-px bg-black opacity-10 mx-auto w-full" />

            {/*Breadcrumb */}
            <Breadcrumb/>

            <h1 className="font-integralcf text-[36px]">Your Cart</h1>

            <div className="grid grid-cols-1 lg:grid lg:grid-cols-5 gap-5">

                {/* Your Cart */}

                <div className="item_container divide-y divide-black/10 lg:col-span-3">
                    {loading && (
                        <p className="font-satoshi text-gray-500 mx-[3%] py-[4%]">Loading cart...</p>
                    )}
                    {!loading && cart_products.length === 0 && (
                        <p className="font-satoshi text-gray-500 mx-[3%] py-[4%]">Your cart is empty.</p>
                    )}
                    {!loading && cart_products.map((product) => (
                        <div key={product.id ?? `${product?.product?.id}-${product?.size}-${product?.color}`} className="flex mx-[3%] py-[4%] md:py-[3%]">
                            <CartProduct product={toCartItem(product)} 
                            onNavigate={() => navigate(`/${product.product?.id}`, { 
                                state: { product: product.product } 
                            })}  
                            onRemove={() => setCartProducts(prev => prev.filter(p => p.id !== product.id))}/>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="item_container self-start px-[4%] py-[2%] gap-8 lg:col-span-2">
                    <h2 className="cart_header">Order Summary</h2>
                    <div className="flex flex-col gap-7">
                        <div className="flex justify-between items-center">
                            <span className="cart_details">Subtotal</span>
                            <span className="cart_details_data">{subtotal.toFixed(2)}€</span>
                        </div>
                        {AppliedPromo && (
                            <div className="flex justify-between items-center">
                                <span className="cart_details">Promo ({promoDiscount}% off)</span>
                                <span className="cart_details_data_disc">-{(subtotal * promoDiscount / 100).toFixed(2)}€</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                            <span className="cart_details">Delivery Fee</span>
                            <span className="cart_details_data">{deliveryFee.toFixed(2)}€</span>
                        </div>
                    </div>

                    <div className="h-px bg-black opacity-10 mx-auto w-full" />

                    <div className="flex flex-col gap-5">
                       <div className="flex justify-between items-center">
                                <span className="font-satoshi text-[16px] lg:text-[20px]">Total</span>
                                <span className="cart_details_data">{total.toFixed(2)}€</span>
                        </div>

                        <div className="flex gap-1 md:gap-2 items-center">
                            <div className=" max-w-310 flex-1 mx-auto">
                                    <div className="flex items-center rounded-[62px] my-3 mr-4 h-12 bg-[#F0F0F0] gap-3 px-4">
                                        <MdOutlineDiscount  className="opacity-40" size={24}/>
                                        <input type="text" placeholder="Add promo code" value={promoInput}
                                        className="border-none bg-[#F0F0F0] outline-none w-full"
                                        onChange={ (e) => setPromoInput(e.target.value)}/>
                                    </div>
                                </div>
                            <button className="cart_coupon_btn" onClick={handleApplyPromo}>Apply</button>
                        </div>
                        {console.log(promoDiscount)}
                        {console.log({promoDiscount})}
                        <Link to={"/Checkout"} state={{promoDiscount}} className="cart_checkout_btn">Go to Checkout<FaArrowRightLong size={20}/></Link> 
                    </div>
                   

                </div>

            </div>
        </div>
     </div>

  )
}

export default Cart

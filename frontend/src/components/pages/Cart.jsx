import React from 'react'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import Img1 from "../../assets/placeholder_imgs/tapeshirt.png"
import Img2 from "../../assets/placeholder_imgs/skinnyjeans.png"
import Img3 from "../../assets/placeholder_imgs/checkered_shirt.png"
import Img4 from "../../assets/placeholder_imgs/sleevestriped.png"
import Img5 from "../../assets/placeholder_imgs/vertical_striped.png"
import Img6 from "../../assets/placeholder_imgs/courage_shirt.png"
import Img7 from "../../assets/placeholder_imgs/bermuda_shorts.png"
import Img8 from "../../assets/placeholder_imgs/faded_skinny.png"
import CartProduct from '../OtherComponents/ProductComponents/CartProduct'
import { MdOutlineDiscount } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
const CartProducts = [
{
    id: 1,
    img: Img1,
    title: "T-shirt with Tape Details",
    rating: 4.5,
    price: 120,
    sale_per: 0,
    size: "Large",
    color: "Red",
    quantity: 2
},
{
    id: 2,
    img: Img2,
    title: "Skinny Fit Jeans",
    rating: 3.5,
    price: 260,
    sale_per: 20,
    size: "Medium",
    color: "White",
    quantity: 3
},
{
    id: 3,
    img: Img3,
    title: "Checkered Shirt",
    rating: 4.5,
    price: 180,
    sale_per: 0,
    size: "Small",
    color: "Blue",
    quantity: 4
},
{
    id: 4,
    img: Img4,
    title: "Sleeve Striped T-shirt",
    rating: 4.5,
    price: 160,
    sale_per: 30,
    size: "Large",
    color: "Blue",
    quantity: 1
}
]

const Cart = () => {
  return (
    <div className="screen-adapt">
        <div className="flex flex-col mb-[10%]">

            <div className="h-px bg-black opacity-10 mx-auto w-full" />

            {/*Breadcrumb */}
            <Breadcrumb/>

            <h1 className="font-integralcf text-[36px]">Your Cart</h1>

            <div className="grid grid-cols-1 lg:grid lg:grid-cols-5 gap-5">

                {/* Your Cart */}

                <div className="item_container divide-y divide-black/10 lg:col-span-3">
                    {
                        CartProducts.map((product) => (
                            <div key={product.id} className="flex mx-[3%] py-[4%] md:py-[3%]">
                                  <CartProduct product={product}/>  
                            </div>
                        ))
                    }
                    
                </div>

                {/* Order Summary */}
                <div className="item_container self-start px-[4%] py-[2%] gap-8 lg:col-span-2">
                    <h2 className="cart_header">Order Summary</h2>
                    <div className="flex flex-col gap-7">
                        <div className="flex justify-between items-center">
                            <span className="cart_details">Subtotal</span>
                            <span className="cart_details_data">230€</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="cart_details">Discount (-20%)</span>
                            <span className="cart_details_data_disc">-113€</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="cart_details">Delivery Fee</span>
                            <span className="cart_details_data">230€</span>
                        </div>
                    </div>

                    <div className="h-px bg-black opacity-10 mx-auto w-full" />

                    <div className="flex flex-col gap-5">
                       <div className="flex justify-between items-center">
                                <span className="font-satoshi text-[16px] lg:text-[20px]">Total</span>
                                <span className="cart_details_data">467€</span>
                        </div>

                        <div className="flex gap-1 md:gap-2 items-center">
                            <div className=" max-w-310 flex-1 mx-auto">
                                    <div className="flex items-center rounded-[62px] my-3 mr-4 h-12 bg-[#F0F0F0] gap-3 px-4">
                                        <MdOutlineDiscount  className="opacity-40" size={24}/>
                                        <input type="text" placeholder="Add promo code"
                                        className="border-none bg-[#F0F0F0] outline-none w-full"/>
                                    </div>
                                </div>
                            <button className="cart_coupon_btn">Apply</button>
                        </div>

                        <button className="cart_checkout_btn">Go to Checkout<FaArrowRightLong  size={20} /></button> 
                    </div>
                   

                </div>

            </div>
        </div>
     </div>

  )
}

export default Cart

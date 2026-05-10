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
import CartProduct from '../OtherComponents/Object_components/CartProduct'

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

            <div className="flex flex-col sm:flex-row gap-5">

                {/* Your Cart */}

                <div className="item_container divide-y divide-black/10">
                    {
                        CartProducts.map((product) => (
                            <div key={product.id} className="flex mx-[3%] py-[4%] md:py-[3%]">
                                  <CartProduct product={product}/>  
                            </div>
                        ))
                    }
                    
                </div>
                {/* Order Summary */}
                <div className="item_container self-start">
                    <h2>Order Summary</h2>
                    <p>Subtotal</p>
                    <p>Discount</p>
                    <p>Delivery Fee</p>

                    <div className="h-px bg-black opacity-10 mx-auto w-full" />

                    <p>Total</p>

                   

                </div>

            </div>
        </div>
     </div>

  )
}

export default Cart

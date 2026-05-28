import React from 'react'
import { HiTrash } from "react-icons/hi2";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import NoImageAvailable from '../../../assets/No_Image_Available.jpg'

const CartProduct = ({product}) => {
    const imageSrc = product.img ?? product.imageUrls?.[0] ?? NoImageAvailable
    const title = product.title ?? product.name

    return (
    <div className="flex w-full justify-between">

        
        {/* Image and Details */}
        <div className="flex gap-3">
            <img
                src={imageSrc}
                alt={title}
                onError={(e) => { e.currentTarget.src = NoImageAvailable }}
                className="object-cover w-[100px] h-[100px] md:w-[124px] md:h-[124px] rounded-md shrink-0"
            />

            {/* Product Info */}
            <div className="flex flex-col">
                {/* Product Name */}
                <h1 className="cart_item_title">{title}</h1>

                {/* Product Details */}
                <p className="cart_item_details">Size: <span className="cart_item_details opacity-60">{product.size}</span></p>
                <p className="cart_item_details">Color: <span className="cart_item_details opacity-60">{product.color}</span></p>
            </div>
        </div>

        {/*Quantity and delte cart item */}
        <div className="flex flex-col justify-between items-end">
            <HiTrash size={24} className=" text-red-500 hover:text-red-400 cursor-pointer active:scale-90"/>

            {/*Quanitty Counter */}
            <div className="flex bg-[#F0F0F0] rounded-[62px] gap-4 md:gap-6 items-center py-1 md:py-3 px-4 md:px-5">
                <button className="active:scale-80 cursor-pointer"><FaMinus size={10}/></button>
                <span className="text-[14px]">{product.quantity}</span>
                <button className="active:scale-80 cursor-pointer"><FaPlus size={12}/></button>
            </div>
        </div>

    </div>
  )
}

export default CartProduct
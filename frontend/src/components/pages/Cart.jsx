import React from 'react'
import Breadcrumb from '../OtherComponents/Breadcrumb'

const Cart = () => {
  return (
    <div className="screen-adapt">
        <div className="flex flex-col">
            <div className="h-px bg-black opacity-10 mx-auto w-full" />

            {/*Breadcrumb */}
            <Breadcrumb/>

            <h1 className="font-integralcf text-[36px]">Your Cart</h1>

            <div className="flex flex-col sm:flex-row gap-5">

                {/* Your Cart */}

                <div className="flex flex-col sm:w-3/5 border rounded-md">

                </div>
                {/* Order Summary */}
                <div className="flex flex-col gap-4 border px-2 py-2 sm:w-2/5 rounded-md">
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

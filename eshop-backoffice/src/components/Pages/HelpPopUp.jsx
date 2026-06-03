import React from 'react'
import { IoMdClose } from "react-icons/io";
const HelpPopUp = ({onClose}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[65%] lg:ml-[10%] gap-5 flex flex-col">

        <div className='flex justify-between px-[2%] items-center'>
            <h2 className="text-xl font-bold">API USAGE GUIDE</h2>
            <button onClick={onClose} className='flex items-center justify-center'> <IoMdClose /> </button>
        </div>

        <div className='flex flex-col gap-2'>
            <h1 className='font-satoshibold text-[1.1em]'>Path Variables</h1>
            <p>Use path variables when retrieving specific resource by its unique identifier, usually marked with brackets: {"{value}"}.</p>
        </div>

        <div className='flex flex-col gap-2'>
            <h1 className='font-satoshibold text-[1.1em]'>Query Parameters</h1>
            <p>Use query parameters when filtering, searching, sorting or paginating data.</p>
        </div>

        <div className='flex flex-col gap-2'>
            <h1 className='font-satoshibold text-[1.1em]'>Enum Values</h1>
            <p>Allowed values:</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-5'>
            
            {/* Brands */}
            <div className='flex flex-col gap-2 border border-black/60 items-center justify-center px-5 py-1 rounded-[1em]'>
                <h1 className='font-satoshibold text-[1.1em]'>Brands</h1>
                <div className='w-full border border-black/60'/>
                <ul className='text-center'>
                    <li>Versace</li>
                    <li>Zara</li>
                    <li>Gucci</li>
                    <li>Prada</li>
                    <li>Calvin Klein</li>
                    <li>Gant</li>
                    <li>Karl</li>
                    <li>Guess</li>
                    <li>Polo</li>
                    <li>Other</li>
                </ul>
            </div>
            

            {/* DressStyle */}
            <div className='flex flex-col gap-2 border border-black/60 px-5 py-1 rounded-[1em]'>
                <h1 className='font-satoshibold text-[1.1em]'>DressStyle</h1>
                <div className='w-full border border-black/60'/>
                <ul className='text-center'>
                    <li>CASUAL</li>
                    <li>FORMAL</li>
                    <li>PARTY</li>
                    <li>GYM</li>
                </ul>
            </div>

            {/* Product Status */}
            <div className='flex flex-col gap-2 border border-black/60 px-5 py-1 rounded-[1em]'>
                <h1 className='font-satoshibold text-[1.1em]'>Product Status</h1>
                <div className='w-full border border-black/60'/>
                <ul className='text-center'>
                    <li>TOP_SELLER</li>
                    <li>NEW_ARRIVALS</li>
                    <li>ON_SALE</li>
                    <li>NONE</li>
                </ul>
            </div>

             {/* Product Type */}
            <div className='flex flex-col gap-2 border border-black/60 px-5 py-1 rounded-[1em]'>
                <h1 className='font-satoshibold text-[1.1em]'>Product Type</h1>
                <div className='w-full border border-black/60'/>
                <ul className='text-center'>
                    <li>T_SHIRT</li>
                    <li>SHORT</li>
                    <li>HOODIE</li>
                    <li>JEAN</li>
                </ul>
            </div>

             {/* Sizes */}
            <div className='flex flex-col gap-2 border border-black/60 items-center px-5 py-1 rounded-[1em]'>
                <h1 className='font-satoshibold text-[1.1em]'>Sizes</h1>
                <div className='w-full border border-black/60'/>
                <ul className='text-center'>
                    <li>XXSMALL</li>
                    <li>XSMALL</li>
                    <li>SMALL</li>
                    <li>MEDIUM</li>
                    <li>LARGE</li>
                    <li>XLARGE</li>
                    <li>XXLARGE</li>
                    <li>TXLARGE</li>
                    <li>FXLARGE</li>
                </ul>
            </div>

             {/* Order Status */}
            <div className='flex flex-col gap-2 border border-black/60 px-5 py-1 rounded-[1em]'>
                <h1 className='font-satoshibold text-[1.1em]'>Product Type</h1>
                <div className='w-full border border-black/60'/>
                <ul className='text-center'>
                    <li>ORDER_RECEIVED</li>
                    <li>PREPARATION</li>
                    <li>SHIPPED</li>
                    <li>DELIVERED</li>
                    <li>CANCELLED</li>
                </ul>
            </div>


        </div>

        
      </div>
    </div>
  );
}

export default HelpPopUp
import React from 'react'
import { IoMdOptions } from "react-icons/io";
import PriceRangeSlider from './PriceRangeSlider';
import ColorButtonGroup from './ColorButtonGroup';

const Filter_Types = [
{
    id: 1,
    name: "T-shirts"
},
{
    id: 2,
    name: "Shorts"
},
{
    id: 3,
    name: "Shirts"
},
{
    id: 4,
    name: "Hoodie"
},
{
    id: 5,
    name: "Jeans"
}
]

const DressStyles = [
    { id:6, name:"Casual"},
    { id:7, name:"Formal"},
    { id:8, name:"Party"},
    { id:9, name:"Gym"}
]



const Filters = () => {
  return (
    <div className="flex flex-col border border-[#F0F0F0] rounded-[20px] px-6 py-6 gap-4">

        {/* Headline and icon */}
        <div className="flex items-center justify-between">
            <h1 className="filter_header">Filters</h1>
            <IoMdOptions className="rotate-90 opacity-50" size={20}/>
        </div>

        <div className="h-px bg-[#F0F0F0] mx-auto w-full" />

        {/*Filter Types */}
        <div className="flex flex-col gap-2">
            {
                Filter_Types.map((type) => (
                    <button key={type.id} className="filter_type">
                        <h1 className="font-satoshi text-[16px] opacity-40">{type.name}</h1>
                        <p className="opacity-60">{'>'}</p>
                    </button>
                ))
            }
        </div>

        <div className="h-px bg-[#F0F0F0] mx-auto w-full" />

        {/* Price Slider Section */}

        <div>
            <h1 className="filter_header">Price</h1>

            
        </div>

        <div className="h-px bg-[#F0F0F0] mx-auto w-full" />

        {/* Colors Section */}

        <div>
            <h1 className="filter_header">Colors</h1>
        </div>

         <ColorButtonGroup/>

        <div className="h-px bg-[#F0F0F0] mx-auto w-full" />

        {/* Size Section */}

        <div>
            <h1 className="filter_header">Size</h1>
        </div>

        <div className="h-px bg-[#F0F0F0] mx-auto w-full" />

        {/* Dress Style Section */}

        <div>
            <h1 className="filter_header">Dress Style</h1>
        </div>

        <div className="flex flex-col gap-2">
            {
                DressStyles.map((type) => (
                    <button key={type.id} className="filter_type">
                        <h1 className="font-satoshi text-[16px] opacity-40">{type.name}</h1>
                        <p className="opacity-60">{'>'}</p>
                    </button>
                ))
            }
        </div>

        {/* Apply Filter Button */}
            <button className="auth_button w-full">Apply Filter</button>


    </div>
  )
}

export default Filters
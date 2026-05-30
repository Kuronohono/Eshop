import React, { useState } from 'react'
import { IoMdOptions } from "react-icons/io";
import PriceRangeSlider from './PriceRangeSlider';
import ColorButtonGroup from './ColorButtonGroup';
import Accordion from '../Accordion';
import SizesComponent from './SizesComponent';

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

const Filters = ( {onApply} ) => {
    const [selectedSizes, setSelectedSizes] = useState([])
    const [activeType, setActiveType] = useState(null)
    const [activeDressStyle, setDressStyle] = useState(null)
    const [color, setColor] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)

    const handleApply = () => {
        const params = new URLSearchParams()
        if (selectedSizes.length > 0)  params.set("sizes", selectedSizes.join(","))
        if (color)                      params.set("color", color)
        if (minPrice != null)           params.set("minPrice", minPrice)
        if (maxPrice != null)           params.set("maxPrice", maxPrice)
        if (activeDressStyle)           params.set("dressStyle", activeDressStyle)
        onApply?.(params.toString())
    }

  return (
    <div className="hidden lg:block h-fit w-full flex-col border border-[#F0F0F0] rounded-[20px] px-6 py-6 gap-4 divide-y divide-black/10">

        {/* Headline and icon */}
        <div className="flex items-center justify-between pb-3">
            <h1 className="filter_header">Filters</h1>
            <IoMdOptions className="rotate-90 opacity-50" size={20}/>
        </div>

        {/*Filter Types */}
        <div className="flex flex-col gap-2 pb-3">
            {
                Filter_Types.map((type) => (
                    <button key={type.id} className={`filter_type ${ activeType == type.id ? "bg-[#d2d2d2]" : " hover:bg-[#eeeeee] bg-white"}`}
                    onClick={ () => setActiveType(prev => prev === type.id ? null : type.id)}>
                        <h1 className="font-satoshi text-[16px] opacity-50">{type.name}</h1>
                        <p className="opacity-60">{'>'}</p>
                    </button>
                ))
            }
        </div>

        {/* Price Slider Section */}

        <Accordion text="Price">
            <PriceRangeSlider/>
        </Accordion>

        {/* Colors Section */}

         <Accordion text="Colors">
            <ColorButtonGroup/>
         </Accordion>


        {/* Size Section */}
        <Accordion text="Size">
            <SizesComponent onChange={setSelectedSizes}/>
        </Accordion>


        {/* Dress Style Section */}
        <Accordion text="Dress Style">
            <div className="flex flex-col gap-2">
            {
                DressStyles.map((type) => (
                    <button key={type.id} className="filter_type">
                        <h1 className="font-satoshi text-[16px] opacity-50">{type.name}</h1>
                        <p className="opacity-60">{'>'}</p>
                    </button>
                ))
            }
            </div>
        </Accordion>  

        {/* Apply Filter Button */}
            <button className="auth_button w-full" onClick={handleApply}>Apply Filter</button>

    </div>
  )
}

export default Filters
import React from 'react'
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



const Filters = () => {
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
                    <button key={type.id} className="filter_type">
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
            <SizesComponent/>
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
            <button className="auth_button w-full">Apply Filter</button>

    </div>
  )
}

export default Filters
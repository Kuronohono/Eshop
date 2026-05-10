import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io"
const Accordion = ({text, children}) => {
    const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
        <button  
        onClick={() => setAccordionOpen(!accordionOpen)} 
        className="flex justify-between w-full hover:cursor-pointer items-center">
            <h1 className="filter_header">{text}</h1>
            <span>
                <IoIosArrowForward 
                    className={`transition-all
                    duration-200
                    group-active: ${accordionOpen ? "rotate-90" : "rotate-0"}`}/>
            </span>
        </button>
        <div 
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
            accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}>
            <div className="overflow-hidden mb-[10%]">{children}</div>
        </div>
    </div>
  );
}

export default Accordion
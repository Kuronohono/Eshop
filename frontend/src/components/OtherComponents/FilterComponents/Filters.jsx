import React, { useState, useEffect } from 'react'
import { IoMdOptions } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import PriceRangeSlider from './PriceRangeSlider'
import ColorButtonGroup from './ColorButtonGroup'
import Accordion from '../Accordion'
import SizesComponent from './SizesComponent'

const Filter_Types = [
    { id: 1, name: "T-shirts" },
    { id: 2, name: "Shorts" },
    { id: 3, name: "Shirts" },
    { id: 4, name: "Hoodie" },
    { id: 5, name: "Jeans" },
]
const DressStyles = [
    { id: 6, name: "Casual" },
    { id: 7, name: "Formal" },
    { id: 8, name: "Party" },
    { id: 9, name: "Gym" },
]

const FilterContent = ({ selectedSizes, setSelectedSizes, activeType, setActiveType, activeDressStyle, setDressStyle, onApply, onClose }) => {
    
    
    const handleApply = () => {
        const params = new URLSearchParams()
        if (selectedSizes.length > 0) params.set("sizes", selectedSizes.join(","))
        if (activeDressStyle)          params.set("dressStyle", activeDressStyle)
        if (activeType)                 params.set("type", activeType)
        onApply?.(params.toString())
        onClose?.()
    }

    return (
        <>
            <div className="flex flex-col gap-1">
                {Filter_Types.map((type) => (
                    <button
                        key={type.id}
                        className={`filter_type ${activeType === type.id ? "bg-[#d2d2d2]" : "hover:bg-[#eeeeee] bg-white"}`}
                        onClick={() => setActiveType(prev => prev === type.id ? null : type.id)}
                    >
                        <h1 className="font-satoshi text-[16px] opacity-50">{type.name}</h1>
                        <p className="opacity-60">{'>'}</p>
                    </button>
                ))}
            </div>
            <Accordion text="Price">
                <PriceRangeSlider />
            </Accordion>
            <Accordion text="Colors">
                <ColorButtonGroup />
            </Accordion>
            <Accordion text="Size">
                <SizesComponent onChange={setSelectedSizes} />
            </Accordion>
            <Accordion text="Dress Style">
                <div className="flex flex-col gap-1">
                    {DressStyles.map((type) => (
                        <button
                            key={type.id}
                            className={`filter_type ${activeDressStyle === type.name ? "bg-[#d2d2d2]" : "hover:bg-[#eeeeee] bg-white"}`}
                            onClick={() => setDressStyle(prev => prev === type.name ? null : type.name)}
                        >
                            <h1 className="font-satoshi text-[16px] opacity-50">{type.name}</h1>
                            <p className="opacity-60">{'>'}</p>
                        </button>
                    ))}
                </div>
            </Accordion>
            <button className="auth_button w-full" onClick={handleApply}>Apply Filter</button>
        </>
    )
}

const Filters = ({ onApply, mobileOpen, setMobileOpen }) => {
    const [selectedSizes, setSelectedSizes] = useState([])
    const [activeType, setActiveType] = useState(null)
    const [activeDressStyle, setDressStyle] = useState(null)
    const [color, setColor] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [animating, setAnimating] = useState(false)

    // Animate in on open, animate out on close
    useEffect(() => {
        if (mobileOpen) {
            // Small delay so the element is mounted before the transition fires
            requestAnimationFrame(() => setAnimating(true))
        }
    }, [mobileOpen])

    const handleClose = () => {
        setAnimating(false)
        // Wait for slide-down animation to finish before unmounting
        setTimeout(() => setMobileOpen(false), 300)
    }

    const sharedState = {
        selectedSizes, setSelectedSizes,
        activeType, setActiveType,
        activeDressStyle, setDressStyle,
        color, setColor,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        onApply,
    }

    return (
        <>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
                        style={{ opacity: animating ? 1 : 0 }}
                        onClick={handleClose}
                    />

                    {/* Sheet */}
                    <div
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] max-h-[90vh] flex flex-col transition-transform duration-300 ease-out"
                        style={{ transform: animating ? 'translateY(0)' : 'translateY(100%)' }}
                    >
                        {/* Drag handle */}
                        <div className="flex justify-center pt-3 pb-1 shrink-0">
                            <div className="w-10 h-1 rounded-full bg-black/20" />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 shrink-0">
                            <h2 className="filter_header">Filters</h2>
                            <button
                                onClick={handleClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <IoClose size={20} className="opacity-60" />
                            </button>
                        </div>

                        {/* Scrollable content */}
                        <div className="overflow-y-auto flex-1 px-6 py-4 flex flex-col gap-4 divide-y divide-black/10">
                            <FilterContent
                                {...sharedState}
                                onClose={handleClose}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop panel */}
            <div className="hidden lg:flex h-fit w-full flex-col border border-[#F0F0F0] rounded-[20px] px-6 py-6 gap-4 divide-y divide-black/10">
                <div className="flex items-center justify-between pb-3">
                    <h1 className="filter_header">Filters</h1>
                    <IoMdOptions className="rotate-90 opacity-50" size={20} />
                </div>
                <FilterContent {...sharedState} onClose={undefined} />
            </div>
        </>
    )
}

export default Filters
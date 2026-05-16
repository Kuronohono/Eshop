import React, { useState } from 'react'

const AvailableSizes = ({ sizes = [] }) => {
    const [activeSize, setActiveSize] = useState(null)

    const toggle = (size) => {
        setActiveSize(prev => prev === size ? null : size)
    }

    return (
        <div className="flex flex-wrap gap-2 mb-5">
            {sizes.length === 0
                ? <p className="text-sm text-gray-400">Select a color first</p>
                : sizes.map((size) => (  // parentheses not curly braces = implicit return
                    <div
                        key={size}
                        onClick={() => toggle(size)}
                        className={`size_styling ${activeSize === size ? 'bg-black text-white' : 'bg-[#F0F0F0] text-black/60'}`}>
                        {size}
                    </div>
                ))
            }
        </div>
    )
}

export default AvailableSizes
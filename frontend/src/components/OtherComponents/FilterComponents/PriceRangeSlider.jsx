import React, { useState, useRef, useCallback } from 'react'

const PriceRangeSlider = ({ min = 0, max = 500, initialMin = 50, initialMax = 200 }) => {
  const [minVal, setMinVal] = useState(initialMin)
  const [maxVal, setMaxVal] = useState(initialMax)
  const rangeRef = useRef(null)

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  const minPercent = getPercent(minVal)
  const maxPercent = getPercent(maxVal)

  return (
    <div className="flex flex-col gap-2 w-full mt-[10%] px-[10%]">
      <div className="relative h-2 w-full">
        
        {/* Base track */}
        <div className="absolute top-0 left-0 right-0 h-full bg-gray-200 rounded-full" />

        {/* Active track */}
        <div
          className="absolute top-0 h-full bg-black rounded-full"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxVal - 1)
            setMinVal(value)
          }}
          className="absolute w-full h-full opacity-0 cursor-pointer z-30"
          style={{ pointerEvents: minVal > max - 10 ? 'all' : undefined }}
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minVal + 1)
            setMaxVal(value)
          }}
          className="absolute w-full h-full opacity-0 cursor-pointer z-40"
        />

        {/* Min dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full z-20 pointer-events-none"
          style={{ left: `calc(${minPercent}% - 10px)` }}
        />

        {/* Max dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full z-20 pointer-events-none"
          style={{ left: `calc(${maxPercent}% - 10px)` }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-sm font-satoshi mt-3">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>
    </div>
  )
}

export default PriceRangeSlider
import React, { useState } from 'react'

const Color_Data = [
  { id: 1, color: "Green", hex: "#00C12B", border: "#009922" },
  { id: 2, color: "Red", hex: "#F50606", border: "#c20505" },
  { id: 3, color: "Yellow", hex: "#F5DD06", border: "#c4b005" },
  { id: 4, color: "Orange", hex: "#F57906", border: "#c46005" },
  { id: 5, color: "Light Blue", hex: "#06CAF5", border: "#05a2c4" },
  { id: 6, color: "Dark Blue", hex: "#063AF5", border: "#052ec4" },
  { id: 7, color: "Purple", hex: "#7D06F5", border: "#6305c4" },
  { id: 8, color: "Pink", hex: "#F506A4", border: "#c40583" },
  { id: 9, color: "White", hex: "#FFFFFF", border: "#cccccc" },
  { id: 10, color: "Black", hex: "#000000", border: "#333333" },
]

const ColorButtonGroup = () => {
  const [activeIds, setActiveIds] = useState(new Set())

  const toggle = (id) => {
    setActiveIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {Color_Data.map(({ id, color, hex, border }) => {
        const isActive = activeIds.has(id)
        const checkColor = hex === '#FFFFFF' || hex === '#F5DD06' ? '#333' : '#fff'

        return (
          <button
            key={id}
            onClick={() => toggle(id)}
            aria-label={color}
            aria-pressed={isActive}
            className="color_style"
            style={{
              backgroundColor: hex,
              borderColor: border
            }}
          >
            {isActive && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <polyline
                    points="4,11 9,16 18,6"
                    stroke={checkColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default ColorButtonGroup
import React, { useEffect, useMemo, useState } from 'react'
import { colorMap } from '../../../constants/colorMap'

const AvailableColors = ({ colors = [], selectedColor, onColorSelect }) => {
  const displayColors = useMemo(
    () => (colors.length > 0 ? colors : Object.keys(colorMap)),
    [colors]
  )

  const [activeColor, setActiveColor] = useState(selectedColor ?? displayColors[0] ?? null)

  // Keep internal state in sync with parent-controlled value.
  useEffect(() => {
    if (selectedColor !== undefined) setActiveColor(selectedColor)
  }, [selectedColor])

  // Ensure a color is selected by default and parent gets notified.
  useEffect(() => {
    if (!activeColor && displayColors[0]) {
      setActiveColor(displayColors[0])
      onColorSelect?.(displayColors[0])
    } else if (activeColor) {
      onColorSelect?.(activeColor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayColors])

  const toggle = (color) => {
    // UX requirement: always keep one color selected (no deselect to null).
    const next = color
    setActiveColor(next)
    if (onColorSelect) onColorSelect(next)
  }

  return (
    <div className="flex flex-wrap gap-3 mb-5">
      {displayColors.map((color) => {
        const { hex, border } = colorMap[color] ?? { hex: "#ccc", border: "#999" }
        const isActive = activeColor === color
        const checkColor = hex === '#FFFFFF' ? '#333' : '#fff'
        return (
          <button
            key={color}
            onClick={() => toggle(color)}
            aria-label={color}
            aria-pressed={isActive}
            className="color_style"
            style={{ backgroundColor: hex, borderColor: border }}
          >
            {isActive && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <polyline points="4,11 9,16 18,6" stroke={checkColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default AvailableColors
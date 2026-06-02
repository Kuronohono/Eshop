import React, { useMemo } from 'react'
import { colorMap } from '../../../constants/colorMap'

const ColorButtonGroup = ({ colors = [], selectedColors = [], onChange }) => {
  const activeIds = useMemo(() => new Set(selectedColors), [selectedColors])

  const displayColors = colors.length > 0 ? colors : Object.keys(colorMap)

  const toggle = (color) => {
    const next = new Set(activeIds)
    next.has(color) ? next.delete(color) : next.add(color)
    onChange?.(Array.from(next))
  }

  return (
    <div className="flex flex-wrap gap-3">
      {displayColors.map((color) => {
        const { hex, border } = colorMap[color] ?? { hex: "#ccc", border: "#999" }
        const isActive = activeIds.has(color)
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

export default ColorButtonGroup
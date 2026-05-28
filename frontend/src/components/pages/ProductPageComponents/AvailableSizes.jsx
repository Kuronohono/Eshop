import React from 'react'

const AvailableSizes = ({ sizes = [], selectedSize, onSizeSelect }) => {
    const SIZE_ORDER = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"]

    const normalizeToLabel = (size) => {
        const raw = String(size ?? "").trim()
        if (!raw) return ""

        // API may return enum names (e.g. "XSMALL") or UI labels (e.g. "X-Small").
        const upper = raw.toUpperCase()
        const enumToLabel = {
            XXSMALL: "XX-Small",
            XSMALL: "X-Small",
            SMALL: "Small",
            MEDIUM: "Medium",
            LARGE: "Large",
            XLARGE: "X-Large",
            XXLARGE: "XX-Large",
            TXLARGE: "3X-Large",
            FXLARGE: "4X-Large",
        }

        return enumToLabel[upper] ?? raw
    }

    const getOrderIndex = (sizeLabel) => {
        const idx = SIZE_ORDER.indexOf(sizeLabel)
        return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
    }
    const toggle = (size) => {
        const next = selectedSize === size ? null : size
        onSizeSelect?.(next)
    }

    const sortedSizes = [...sizes].sort((a, b) => {
        const A = normalizeToLabel(a)
        const B = normalizeToLabel(b)
        const byOrder = getOrderIndex(A) - getOrderIndex(B)
        if (byOrder !== 0) return byOrder
        return A.localeCompare(B)
    })

    return (
        <div className="flex flex-wrap gap-2 mb-5">
            {sortedSizes.length === 0
                ? <p className="text-sm text-gray-400">Select a color first</p>
                : sortedSizes.map((size) => ( 
                    <div
                        key={size}
                        onClick={() => toggle(size)}
                        className={`size_styling ${selectedSize === size ? 'bg-black text-white' : 'bg-[#F0F0F0] text-black/60'}`}>
                        {normalizeToLabel(size)}
                    </div>
                ))
            }
        </div>
    )
}

export default AvailableSizes
import React, { useState } from 'react'


const Sizes_Data = [
  { id: 1,  name: "XX-Small",  enumValue: "XXSMALL"  },
  { id: 2,  name: "X-Small",   enumValue: "XSMALL"   },
  { id: 3,  name: "Small",     enumValue: "SMALL"    },
  { id: 4,  name: "Medium",    enumValue: "MEDIUM"   },
  { id: 5,  name: "Large",     enumValue: "LARGE"    },
  { id: 6,  name: "X-Large",   enumValue: "XLARGE"   },
  { id: 7,  name: "XX-Large",  enumValue: "XXLARGE"  },
  { id: 8,  name: "3X-Large",  enumValue: "TXLARGE"  },
  { id: 9,  name: "4X-Large",  enumValue: "FXLARGE"  },
]

const SizesComponent = ({ onChange }) => {
  const [activeIds, setActiveIds] = useState(new Set())

  const toggle = (id) => {
    setActiveIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      const enumValues = Sizes_Data
        .filter(s => next.has(s.id))
        .map(s => s.enumValue)
      onChange?.(enumValues)
      return next
    })
  }


  return (
    <div className="flex flex-wrap gap-2">
      {
        Sizes_Data.map( (size) => (
          <div key={size.id}
          onClick={() => toggle(size.id)}
           className={`size_styling
           ${activeIds.has(size.id) ? 'bg-black text-white' : 'bg-[#F0F0F0] text-black/60'}`}>
            {size.name}
          </div>
        ))
      }
    </div>
  )
}

export default SizesComponent
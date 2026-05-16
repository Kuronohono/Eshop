import React, { useState } from 'react'


const Sizes_Data = [
{
  id: 1,
  name: "XX-Small"
},
{
  id: 2,
  name: "X-Small"
},
{
  id: 3,
  name: "Small"
},
{
  id: 4,
  name: "Medium"
},
{
  id: 5,
  name: "Large"
},
{
  id: 6,
  name: "X-Large"
},
{
  id: 7,
  name: "XX-Large"
},
{
  id: 8,
  name: "3X-Large"
},
{
  id: 9,
  name: "4X-Large"
}
]

const SizesComponent = () => {
  const [activeIds, setActiveIds] = useState(new Set())

  const toggle = (id) => {
    setActiveIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
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
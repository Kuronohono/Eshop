import React from 'react'
import Versace from '../../assets/brand_images/Versace.jpg'
import Zara from '../../assets/brand_images/zara.jpg'
import Gucci from '../../assets/brand_images/gucci.jpg'
import Prada from '../../assets/brand_images/prada.jpg'
import Calvin_Klein from '../../assets/brand_images/calvin_klein.jpg'
import Gant from '../../assets/brand_images/gant.jpg'
import Karl from '../../assets/brand_images/karl.jpg'
import Guess from '../../assets/brand_images/guess.jpg'
import Polo from '../../assets/brand_images/polo.jpg'
import Other from '../../assets/brand_images/other.jpg'
import {Link} from "react-router-dom"

const Brands_Data = [
{
  id: 1,
  name: "Versace",
  img: Versace
},
{
  id: 2,
  name: "Zara",
  img: Zara
},{
  id: 3,
  name: "Gucci",
  img: Gucci
},
{
  id: 4,
  name: "Prada",
  img: Prada
},
{
  id: 5,
  name: "Calvin Klein",
  img: Calvin_Klein
},
{
  id: 6,
  name: "Gant",
  img: Gant
},{
  id: 7,
  name: "Karl",
  img: Karl
},
{
  id: 8,
  name: "Guess",
  img: Guess
},
{
  id: 9,
  name: "Polo",
  img: Polo
},
{
  id: 10,
  name: "Other",
  img: Other
}
]

const Brands = () => {
  return (
    <div className="screen-adapt gap-5">
      <h1 className="page_header">Brands</h1>
      <div className="flex flex-wrap gap-5 items-center justify-center lg:justify-start">
        {
        Brands_Data.map( (brand) => (
          <Link key={brand.id} to={`/brands/${brand.name}`} className="flex flex-col items-center hover:scale-104 active:scale-100 transition-all" >
            <img className="brand_image" src={brand.img}/>
            <h2 className="font-satoshibold text-[22px]">{brand.name}</h2>
          </Link>
        ))
        } 
      </div>
    </div>
  )
}

export default Brands
import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { IoIosArrowDown } from "react-icons/io";
import women_img from '../../assets/navigation_images/women.jpg'
import men_img from '../../assets/navigation_images/men.jpg'
import unisex_img from '../../assets/navigation_images/unisex.jpg'

const ShopCategories = [
    {id: 6, name: "Men", img: men_img},
    {id: 7, name: "Women", img: women_img},
    {id: 8, name: "Unisex", img: unisex_img}
]

const ShopLinks = [
    { id: 1, name: "T-shirts", link: "/T-shirts"},
    { id: 2, name: "Shorts", link: "/Shorts"},
    { id: 3, name: "Shirts", link: "/Shirts"},
    { id: 4, name: "Hoodie", link: "/Hoodies"},
    { id: 5, name: "Jeans", link: "/Jeans"},
]

const ShopMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="group relative cursor-pointer"
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}>
        
        <li className="flex items-center gap-0.5 py-2 hover">
            Shop
            <span>
                <IoIosArrowDown className={`transition-all duration-200 ${isOpen ? "rotate-180" : ""}`}/>
            </span>
        </li>

        {isOpen && (
            <div className="fixed z-[9999] left-0 w-screen bg-white text-black shadow-md">
                <div className="max-w-3xl mx-auto py-4">
                    <div className="grid grid-cols-3 gap-10 divide-x divide-black/10">
                        {ShopCategories.map((gender) => (
                            <div key={gender.id} className="flex flex-col px-10">
                                <img src={gender.img} className="nav_catImage"/>
                                <span className="nav_genderheader">{gender.name}</span>
                                <ul>
                                    {ShopLinks.map((data) => (
                                        <li key={data.id}>
                                            <Link
                                                to={`/${gender.name}${data.link}`}
                                                className="inline-block w-full rounded-md p-2 hover:bg-[#F2F0F1]"
                                                onClick={() => setIsOpen(false)} 
                                            >
                                                {data.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </li>
  )
}

export default ShopMenu
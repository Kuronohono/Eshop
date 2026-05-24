import React, { useState, useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import ResponsiveMenu from './ResponsiveMenu'
import {Link} from "react-router-dom"
import ShopMenu from './ShopMenu';

const Menu = [
    { id: 1, name: "On Sale", link: "/on_sale" },
    { id: 2, name: "New Arrivals", link: "/new_arrivals" },
    { id: 3, name: "Brands", link: "/brands" }
]

const ShopLinks = [
    { id: 1, name: "T-shirts", link: "/T-shirts"},
    { id: 2, name: "Shorts", link: "/Shorts"},
    { id: 3, name: "Shirts", link: "/Shirts"},
    { id: 4, name: "Hoodie", link: "/Hoodies"},
    { id: 5, name: "Jeans", link: "/Jeans"},
]

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect( () =>{
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

  return (
  <>
    <nav className="w-full">
        <div className="container justify-between h-12 mt-15.5 pr-2 sm:pr-4 mx-auto gap-2 sm:gap-10 flex items-center">
            
           <div className="flex items-center gap-4 sm:gap-8">
                {/*Mobile Hamburger Menu Section */}
                    <div className="min-[1280px]:hidden ml-5" onClick={() =>
                        setOpen(!open)}>
                        <RxHamburgerMenu  className="text-4xl"/>
                    </div>
                
                { /*Logo Section */}
                <div className="font-integralcf text-[25px] sm:text-[32px] flex items-center gap-2 font-bold hover:bg-[#F0F0F0] active:bg-[#f5f5f5]" >
                    <Link to={"/Home"}>SHOP.CO</Link>
                </div>

           </div>

            { /*Menu Section */}
            <div className="hidden min-[1280px]:block">

                <ul className="flex items-center gap-6 ">

                    {/*Shop Dropdown Section*/}
                        <ShopMenu/>


                    {Menu.map((item) => (
                        <li key={item.id}>
                            <Link className="text-[16px] hover:bg-[#F2F0F1] rounded-lg p-1" to={item.link}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            { /* Search Bar Section */}
                <div className=" max-w-[1240px] flex-1 mx-auto hidden min-[1280px]:block">
                    <div className="flex items-center rounded-[62px] my-3 mr-4 h-12 bg-[#F0F0F0] gap-3 px-4">
                        <IoSearch className="opacity-40" size={24}/>
                        <input type="text" placeholder="Search for products..."
                        className="border-none bg-[#F0F0F0] outline-none w-full"/>
                    </div>
                </div>

            {/* Icons Section */}
                <div className="flex gap-2.5">
                    <button className="text-2xl hover:bg-[#e6e6e6] rounded-full p-2 min-[1280px]:hidden cursor-pointer transition-all active:scale-95">
                        <IoSearch size={24}/>
                    </button>
                    <Link to={"/Cart"} className="text-2xl hover:bg-[#e6e6e6] rounded-full p-2 cursor-pointer transition-all active:scale-95" >
                            <FiShoppingCart size={24}/>
                    </Link>
                     <Link to={isLoggedIn ? "/my_account" : "/login"} className="text-2xl hover:bg-[#e6e6e6] rounded-full p-2 cursor-pointer transition-all active:scale-95" >
                            <RiAccountCircleLine size={24} />
                    </Link>
                </div>

            
        </div>
    </nav>

    {/*Mobile Sidebar Section */}
        <ResponsiveMenu open={open}/>
  </>
  )
}

export default Navbar
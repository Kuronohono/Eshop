import React, { useState, useEffect } from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import ResponsiveMenu from './ResponsiveMenu'
import { Link } from "react-router-dom"
import ShopMenu from './ShopMenu';
import SearchBar from './SearchBar';

const Menu = [
    { id: 1, name: "On Sale", link: "/Status/On_Sale" },
    { id: 2, name: "New Arrivals", link: "/Status/New_Arrivals" },
    { id: 3, name: "Brands", link: "/Brands" }
]

const ShopLinks = [
    { id: 1, name: "T-shirts", link: "T-shirts" },
    { id: 2, name: "Shorts", link: "/Shorts" },
    { id: 3, name: "Shirts", link: "/Shirts" },
    { id: 4, name: "Hoodie", link: "/Hoodies" },
    { id: 5, name: "Jeans", link: "/Jeans" },
]

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const syncAuthAndCart = () => {
            const token = localStorage.getItem("token");
            const loggedIn = !!token;
            setIsLoggedIn(loggedIn);
            if (!loggedIn) {
                setCartCount(0);
                return;
            }
            const n = Number(localStorage.getItem("cartCount") || "0");
            setCartCount(Number.isFinite(n) ? n : 0);
        };

        syncAuthAndCart();
        window.addEventListener("cartUpdated", syncAuthAndCart);
        window.addEventListener("storage", syncAuthAndCart);
        window.addEventListener("focus", syncAuthAndCart);
        return () => {
            window.removeEventListener("cartUpdated", syncAuthAndCart);
            window.removeEventListener("storage", syncAuthAndCart);
            window.removeEventListener("focus", syncAuthAndCart);
        };
    }, []);

    return(
        <nav className='w-[95%] lg:w-[88%] mx-auto'>
            <div className='nav_container'>

                <div className='flex items-center gap-4 transition-all duration-400 ease-in-out'>

                    {/* Mobile Hamburger */}
                    <div className="min-[1280px]:hidden ml-5" onClick={() => setOpen(!open)}>
                            <RxHamburgerMenu className="text-4xl" />
                    </div>

                    {/* Logo */}
                    <div className="nav_logo">
                            <Link to={"/"}>SHOP.CO</Link>
                    </div>
                </div>

                {/*Desktop Shop Menu */}
                <div className='hidden min-[1280px]:block transition-all duration-500 ease-in-out mx-6'>
                    <ul className='flex items-center gap-6'>
                        <ShopMenu />
                        {Menu.map( (item) => (
                            <li key={item.id}>
                                <Link className='text-[1.05em] hover:bg-[#F2F0F1] rounded-lg p-1' to={item.link}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Desktop Search Bar */}
                <div className='nav_searchBar'>
                    <SearchBar/>
                </div>

                {/* Icons + Mobile Search Bar */}
                <div className='flex items-center gap-2.5 flex-1 min-[1280px]:flex-none justify-end'>

                    {/* Cart & Account Icons */}
                    <div className='flex gap-2.5 transition-all duration-500 ease-in-out'>
                        
                        {/* Cart */}
                        <Link to={"/Cart"} className='nav_icons'>
                            <FiShoppingCart size={24}/>
                            {isLoggedIn && cartCount > 0 && (
                                <span className='absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 rounded-full bg-black text-white text-[0.688em] flex items-center justify-center'>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/*Account / Login */}
                        <Link to={isLoggedIn ? "/my_account" : "/login"} className='nav_icons'>
                            <RiAccountCircleLine size={24}/>
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
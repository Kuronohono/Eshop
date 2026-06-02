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

    return (
        <>
            <nav className="w-full">
                <div className="container justify-between h-12 mt-15.5 pr-2 sm:pr-4 mx-auto gap-2 sm:gap-6 flex items-center">

                    <div
                        className="flex items-center gap-4 sm:gap-8 transition-all duration-500 ease-in-out"
                    >
                        {/* Mobile Hamburger */}
                        <div className="min-[1280px]:hidden ml-5" onClick={() => setOpen(!open)}>
                            <RxHamburgerMenu className="text-4xl" />
                        </div>

                        {/* Logo */}
                        <div className="font-integralcf text-[25px] sm:text-[32px] flex items-center font-bold hover:bg-[#F0F0F0] active:bg-[#f5f5f5] rounded-[10px] px-2">
                            <Link to={"/"}>SHOP.CO</Link>
                        </div>
                    </div>

                    
                    <div className="hidden min-[1280px]:block transition-all duration-500 ease-in-out">
                        <ul className="flex items-center gap-6">
                            <ShopMenu />
                            {Menu.map((item) => (
                                <li key={item.id}>
                                    <Link className="text-[16px] hover:bg-[#F2F0F1] rounded-lg p-1" 
                                    to={item.link} >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop SearchBar (hidden on mobile) */}
                    <div className="hidden min-[1280px]:block flex-1 w-full">
                        <SearchBar />
                    </div>

                    {/* Icons + Mobile Search */}
                    <div className="flex items-center gap-2.5 flex-1 min-[1280px]:flex-none justify-end">
                        {/* Mobile search with same results logic as desktop SearchBar */}
                        <div className="min-[1280px]:hidden">
                            <SearchBar />
                        </div>

                        {/* Cart & Account icons — slide away when search is open */}
                        <div className="flex gap-2.5 transition-all duration-500 ease-in-out">
                            <Link
                                to={"/Cart"}
                                className="relative text-2xl hover:bg-[#e6e6e6] rounded-full p-2 cursor-pointer transition-all active:scale-95"
                            >
                                <FiShoppingCart size={24} />
                                {isLoggedIn && cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-[11px] flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to={isLoggedIn ? "/my_account" : "/login"}
                                className="text-2xl hover:bg-[#e6e6e6] rounded-full p-2 cursor-pointer transition-all active:scale-95"
                            >
                                <RiAccountCircleLine size={24} />
                            </Link>
                        </div>
                    </div>

                </div>
            </nav>

            {/* Mobile Sidebar */}
            <ResponsiveMenu open={open} onClose={() => setOpen(false)} />
        </>
    )
}

export default Navbar
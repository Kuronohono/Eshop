import React, { useState, useEffect, useRef } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import ResponsiveMenu from './ResponsiveMenu'
import { Link } from "react-router-dom"
import ShopMenu from './ShopMenu';
import SearchBar from './SearchBar';

const Menu = [
    { id: 1, name: "On Sale", link: "/on_sale" },
    { id: 2, name: "New Arrivals", link: "/new_arrivals" },
    { id: 3, name: "Brands", link: "/brands" }
]

const ShopLinks = [
    { id: 1, name: "T-shirts", link: "/T-shirts" },
    { id: 2, name: "Shorts", link: "/Shorts" },
    { id: 3, name: "Shirts", link: "/Shirts" },
    { id: 4, name: "Hoodie", link: "/Hoodies" },
    { id: 5, name: "Jeans", link: "/Jeans" },
]

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleSearchOpen = () => {
        setSearchActive(true);
        // Small delay so the width transition starts before focus
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const handleSearchClose = () => {
        setSearchActive(false);
        inputRef.current?.blur();
    };

    // Close search on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && searchActive) handleSearchClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchActive]);

    return (
        <>
            <nav className="w-full">
                <div className="container justify-between h-12 mt-15.5 pr-2 sm:pr-4 mx-auto gap-2 sm:gap-6 flex items-center">

                    {/* Logo + Hamburger — fades out when search is active on mobile */}
                    <div
                        className={`flex items-center gap-4 sm:gap-8 transition-all duration-500 ease-in-out
                            ${searchActive
                                ? 'opacity-0 w-0 overflow-hidden pointer-events-none min-[1280px]:opacity-100 min-[1280px]:w-auto min-[1280px]:overflow-visible min-[1280px]:pointer-events-auto'
                                : 'opacity-100'
                            }`}
                    >
                        {/* Mobile Hamburger */}
                        <div className="min-[1280px]:hidden ml-5" onClick={() => setOpen(!open)}>
                            <RxHamburgerMenu className="text-4xl" />
                        </div>

                        {/* Logo */}
                        <div className="font-integralcf text-[25px] sm:text-[32px] flex items-center font-bold hover:bg-[#F0F0F0] active:bg-[#f5f5f5] rounded-[10px] px-2">
                            <Link to={"/Home"}>SHOP.CO</Link>
                        </div>
                    </div>

                    {/* Desktop Menu — fades out when search expands */}
                    <div
                        className={`hidden min-[1280px]:block transition-all duration-500 ease-in-out
                            ${searchActive ? 'opacity-0 pointer-events-none w-0 overflow-hidden' : 'opacity-100'}`}
                    >
                        <ul className="flex items-center gap-6">
                            <ShopMenu />
                            {Menu.map((item) => (
                                <li key={item.id}>
                                    <Link className="text-[16px] hover:bg-[#F2F0F1] rounded-lg p-1" to={item.link}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop SearchBar (hidden on mobile) */}
                    <div className="hidden min-[1280px]:block flex-1 max-w-[400px]">
                        <SearchBar />
                    </div>

                    {/* Icons + Mobile Search */}
                    <div className="flex items-center gap-2.5 flex-1 min-[1280px]:flex-none justify-end">

                        {/* Mobile animated search bar */}
                        <div
                            className={`flex items-center min-[1280px]:hidden transition-all duration-700 ease-in-out overflow-hidden
                                ${searchActive ? 'w-full' : 'w-10'}`}
                            style={{ transitionProperty: 'width' }}
                        >
                            <div
                                className={`flex items-center w-full border rounded-full transition-all duration-700 ease-in-out
                                    ${searchActive
                                        ? 'border-gray-400 bg-white shadow-sm px-3 py-1'
                                        : 'border-transparent bg-transparent'
                                    }`}
                            >
                                {/* Search icon — acts as trigger when collapsed */}
                                <button
                                    onClick={searchActive ? undefined : handleSearchOpen}
                                    className={`flex-shrink-0 text-gray-500 transition-all duration-200
                                        ${searchActive ? 'cursor-default' : 'hover:bg-[#e6e6e6] rounded-full p-2 cursor-pointer active:scale-95'}`}
                                    aria-label="Open search"
                                >
                                    <IoSearch size={20} />
                                </button>

                                {/* Input — hidden until active */}
                                <input
                                    ref={inputRef}
                                    type="search"
                                    name="search"
                                    placeholder="Search for products..."
                                    onBlur={handleSearchClose}
                                    className={`bg-transparent outline-none text-sm transition-all duration-700 ease-in-out
                                        ${searchActive ? 'w-full opacity-100 ml-2' : 'w-0 opacity-0 ml-0 pointer-events-none'}`}
                                />

                                {/* Close button */}
                                {searchActive && (
                                    <button
                                        onMouseDown={(e) => {
                                            e.preventDefault(); // prevent input blur firing first
                                            handleSearchClose();
                                        }}
                                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 ml-1 transition-colors duration-150"
                                        aria-label="Close search"
                                    >
                                        <IoIosCloseCircle size={18} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Cart & Account icons — slide away when search is open */}
                        <div
                            className={`flex gap-2.5 transition-all duration-500 ease-in-out
                                ${searchActive
                                    ? 'opacity-0 w-0 overflow-hidden pointer-events-none'
                                    : 'opacity-100'
                                }`}
                        >
                            <Link
                                to={"/Cart"}
                                className="text-2xl hover:bg-[#e6e6e6] rounded-full p-2 cursor-pointer transition-all active:scale-95"
                            >
                                <FiShoppingCart size={24} />
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
            <ResponsiveMenu open={open} />
        </>
    )
}

export default Navbar
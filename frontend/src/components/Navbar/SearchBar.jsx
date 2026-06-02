import React, { useState, useEffect, useRef } from 'react';
import { IoSearch, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const debounceTimer = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // 1. Handle API Search with Debounce
    useEffect(() => {
        if (query.trim().length < 3) {
            setResults([]);
            setOpen(false);
            return;
        }

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            fetch(`http://localhost:8085/products/search?query=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data);
                    if (data.length > 0) {
                        setOpen(true);
                    }
                })
                .catch(err => console.error(err));
        }, 300);

        return () => clearTimeout(debounceTimer.current);
    }, [query]);

    // 2. Sync Mobile Overlay Actions
    useEffect(() => {
        if (mobileOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            if (query.trim().length >= 3 && results.length > 0) {
                setOpen(true);
            }
        } else {
            setQuery("");
            setResults([]);
            setOpen(false);
        }
    }, [mobileOpen]);

    const handleSelect = (product) => {
        setQuery(product.name);
        setOpen(false);
        setMobileOpen(false);
        navigate(`/${product.id}`, { state: { product } });
    };

    // Helper to render shared list items
    const renderListItems = () => {
        return results.map(product => {
            const lowerName = product.name.toLowerCase();
            const lowerQuery = query.toLowerCase();
            const matchIndex = lowerName.indexOf(lowerQuery);
            
            return (
                <li
                    key={product.id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-[20px] text-black"
                    onMouseDown={() => handleSelect(product)}
                    onTouchStart={() => handleSelect(product)} // Added for immediate mobile tap response
                >
                    {matchIndex === -1 ? (
                        product.name
                    ) : (
                        <>
                            <span className="font-satoshi text-gray-400">{product.name.slice(0, matchIndex)}</span>
                            <span className="font-satoshibold">{product.name.slice(matchIndex, matchIndex + query.length)}</span>
                            <span className="font-satoshi text-gray-400">{product.name.slice(matchIndex + query.length)}</span>
                        </>
                    )}
                </li>
            );
        });
    };

    return (
        <>
            {/* ── Desktop search bar (visible ≥ 1280px) ── */}
            <div className="w-full flex-1 flex-col mx-auto hidden min-[1280px]:block relative">
                <div className="flex items-center rounded-[62px] my-3 h-12 bg-[#F0F0F0] gap-3 px-4">
                    <IoSearch className="opacity-40" size={24} />
                    <input
                        type="text"
                        value={query}
                        placeholder="Search for products..."
                        onChange={e => setQuery(e.target.value)}
                        onBlur={() => setTimeout(() => setOpen(false), 150)}
                        className="border-none bg-[#F0F0F0] outline-none w-full text-black"
                    />
                </div>
                {open && results.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border rounded-xl shadow-lg mt-1 px-2 py-2 max-h-60 overflow-y-auto">
                        {renderListItems()}
                    </ul>
                )}
            </div>

            {/* ── Mobile search icon (visible < 1280px) ── */}
            <button
                className="min-[1280px]:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open search"
            >
                <IoSearch size={24} />
            </button>

            {/* ── Mobile full-screen overlay ── */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col min-[1280px]:hidden">
                    {/* Header row */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center flex-1 rounded-[62px] h-12 bg-[#F0F0F0] gap-3 px-4">
                            <IoSearch className="opacity-40 shrink-0" size={20} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                placeholder="Search for products..."
                                onChange={e => setQuery(e.target.value)}
                                className="border-none bg-[#F0F0F0] outline-none w-full text-black"
                            />
                            {query.length > 0 && (
                                <button onClick={() => setQuery("")} aria-label="Clear">
                                    <IoClose size={18} className="opacity-40" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="text-sm font-medium text-gray-600 shrink-0"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Results list - Bypasses 'open' check to guarantee visibility on mobile if results exist */}
                    {results.length > 0 && (
                        <ul className="flex-1 overflow-y-auto px-2 py-2 bg-white z-50">
                            {renderListItems()}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchBar;
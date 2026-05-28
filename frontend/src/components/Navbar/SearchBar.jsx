import React, { useState, useEffect, useRef } from 'react'
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const debounceTimer = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(query.trim().length < 3){
            setResults([]);
            setOpen(false);
            return;
        }

        // Wait 300ms after the user stops typing to show results
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            fetch(`http://localhost:8085/products/search?query=${query}`)
            .then(res => res.json())
            .then(data => {
                setResults(data);
                setOpen(true);
            })
            .catch(err => console.error(err));
        }, 300);
        
        return () => clearTimeout(debounceTimer.current);
    }, [query]);


  return (
    <div className=" w-full flex-1 flex-col mx-auto hidden min-[1280px]:block relative">
        <div className="flex items-center rounded-[62px] my-3 h-12 bg-[#F0F0F0] gap-3 px-4">
            <IoSearch className="opacity-40" size={24}/>
            <input 
            type="text"
            value = {query} 
            placeholder="Search for products..."
            onChange={e => setQuery(e.target.value)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            className="border-none bg-[#F0F0F0] outline-none w-full"/>
        </div>
            {open && results.length > 0 && (
                <ul className="absolute z-50 w-full bg-white border rounded-xl shadow-lg mt-1 px-2 py-2">
                   {results.map(product => {
                            const lowerName = product.name.toLowerCase();
                            const lowerQuery = query.toLowerCase();
                            const matchIndex = lowerName.indexOf(lowerQuery);

                        return (
                            <li
                                key={product.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-[20px]"
                                onMouseDown={() => {
                                    setQuery(product.name);
                                    setOpen(false);
                                    navigate(`/${product.id}`, { state: { product } });
                                }}
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
                    })}
                </ul>
            )}
    </div>
  )
}

export default SearchBar
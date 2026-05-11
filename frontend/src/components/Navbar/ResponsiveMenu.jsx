import React from "react";
import {motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

const ShopLinks = [
  { id: 1, name: "T-Shirts", link: "#" },
  { id: 2, name: "Shorts", link: "#" },
  { id: 3, name: "Shirts", link: "#" },
  { id: 4, name: "Hoodies", link: "#" },
  { id: 5, name: "Jeans", link: "#" },
];

const ResponsiveMenu = ({open}) => {
    return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-20 left-0 w-72 h-1/2 z-20"
        >
          <div className="text-xl font-semibold py-10 m-6 rounded-3xl bg-white shadow-lg h-full">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li className="hover:text-blue-500 cursor-pointer">Shop</li>
              <li className="hover:text-blue-500 cursor-pointer">On Sale</li>
              <li className="hover:text-blue-500 cursor-pointer">New Arrivals</li>
              <li className="hover:text-blue-500 cursor-pointer">Brands</li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
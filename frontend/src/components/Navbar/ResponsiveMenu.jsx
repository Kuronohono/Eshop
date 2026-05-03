import React from "react";
import {motion, AnimatePresence } from "framer-motion";

const ResponsiveMenu = ({open}) => {
    return <AnimatePresence>
        {
            open && (
                <motion.div
                initial={{ opacity: 0, x:-100}}
                animate={{opacity: 1, x:0}}
                exit={{opacity: 0, x: -100}}
                className="absolute top-20 left-0 w-full h-screen z-20"
                >
                <div className="text-xl font-semibold py-10 m-6 rounded-3xl">
                    <ul className="flex flex-col justify-center items-center gap-10">
                        <li>Shop</li>
                        <li>On Sale</li>
                        <li>New Arrivals</li>
                        <li>Brands</li>
                    </ul>
                </div>    
                </motion.div>
            )
        }
    </AnimatePresence>
};

export default ResponsiveMenu;
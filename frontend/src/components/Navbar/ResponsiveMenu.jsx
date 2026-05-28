import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import women_img from '../../assets/navigation_images/women.jpg'
import men_img from '../../assets/navigation_images/men.jpg'
import unisex_img from '../../assets/navigation_images/unisex.jpg'
import { IoMdClose } from "react-icons/io";
const Menu = [
  { id: 1, name: "On Sale", link: "/Status/On_Sale" },
  { id: 2, name: "New Arrivals", link: "/Status/New_Arrivals" },
  { id: 3, name: "Brands", link: "/brands" },
];

const ShopLinks = [
  { id: 1, name: "T-shirts", link: "/T-shirts" },
  { id: 2, name: "Shorts", link: "/Shorts" },
  { id: 3, name: "Shirts", link: "/Shirts" },
  { id: 4, name: "Hoodie", link: "/Hoodies" },
  { id: 5, name: "Jeans", link: "/Jeans" },
];

const genders = [
    {id: 6, name: "Men", img: men_img},
    {id: 7, name: "Women", img: women_img},
    {id: 8, name: "Unisex", img: unisex_img}
]

const listVariants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

const ResponsiveMenu = ({ open, onClose }) => {
  const [screen, setScreen] = useState("main");
  const [selectedGender, setSelectedGender] = useState(null);
  const [direction, setDirection] = useState(1);

  const title = useMemo(() => {
    if (screen === "main") return "Menu";
    if (screen === "shop") return "Shop";
    return selectedGender;
  }, [screen, selectedGender]);

  const goToShop = () => {
    setDirection(1);
    setScreen("shop");
  };

  const goToGender = (gender) => {
    setSelectedGender(gender);
    setDirection(1);
    setScreen("gender");
  };

  const goBack = () => {
    setDirection(-1);
    if (screen === "gender") {
      setScreen("shop");
      return;
    }
    if (screen === "shop") {
      setScreen("main");
    }
  };

  const handleLinkClick = () => {
    setScreen("main");
    setSelectedGender("");
    onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close mobile menu overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 min-[1280px]:hidden"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="fixed top-0 left-0 z-50 h-dvh w-[84vw] max-w-[340px] bg-white shadow-xl min-[1280px]:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
                {screen === "main" ? (
                  <span className="font-satoshibold text-[18px]">{title}</span>
                ) : (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-1 rounded-md px-1 py-1 font-satoshi text-[16px] hover:bg-[#F2F0F1]"
                  >
                    <IoIosArrowBack size={18} />
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md px-2 py-1 font-satoshi text-[15px] hover:bg-[#F2F0F1]"
                >
                  <IoMdClose />
                </button>
              </div>

              <div className="relative flex-1 overflow-hidden">
                <AnimatePresence custom={direction} mode="wait">
                  {screen === "main" && (
                    <motion.ul
                      key="main"
                      custom={direction}
                      variants={listVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col gap-1 p-3"
                    >
                      <li>
                        <button
                          type="button"
                          onClick={goToShop}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left font-satoshi text-[17px] hover:bg-[#F2F0F1]"
                        >
                          Shop
                          <IoIosArrowForward size={18} />
                        </button>
                      </li>
                      {Menu.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={item.link}
                            onClick={handleLinkClick}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left font-satoshi text-[17px] hover:bg-[#F2F0F1]"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}

                  {screen === "shop" && (
                    <motion.ul
                      key="shop"
                      custom={direction}
                      variants={listVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col gap-1 p-3"
                    >
                      {genders.map((gender) => (
                        <li key={gender.id}>
                          <button
                            type="button"
                            onClick={() => goToGender(gender)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left font-satoshi text-[17px] hover:bg-[#F2F0F1]"
                          >
                            {gender.name}
                            <IoIosArrowForward size={18} />
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}

                  {screen === "gender" && (
                    <motion.ul
                      key={`gender-${selectedGender}`}
                      custom={direction}
                      variants={listVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col gap-1 p-3"
                    >
                      <h1 className="font-satoshibold flex w-full items-center justify-center">{selectedGender?.name}</h1>
                     <img src={selectedGender?.img} className="mobile_menu_img"/>
                      {ShopLinks.map((item) => (
                        <li key={`${selectedGender}-${item.id}`}>
                          <Link
                            to={`/${selectedGender}${item.link}`}
                            onClick={handleLinkClick}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left font-satoshi text-[17px] hover:bg-[#F2F0F1]"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
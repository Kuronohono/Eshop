import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaCircleUser } from 'react-icons/fa6'
import { MdDashboard, MdInventory, MdPeople, MdSettings, MdOutlineSubject  } from 'react-icons/md'
import { FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import { BiCategory } from "react-icons/bi";

const Menu = [
  { id: 1, name: 'Dashboard', link: '/Dashboard', icon: <MdDashboard size={20} /> },
  { id: 2, name: 'Products',  link: '/Products',  icon: <MdInventory size={20} /> },
  { id: 3, name: 'Product Variants',  link: '/ProductVariants',  icon: <MdOutlineSubject  size={20} /> },
  { id: 4, name: 'Users',     link: '/Users',     icon: <MdPeople size={20} /> },
  { id: 5, name: 'Orders',  link: '/Orders',  icon: <FaShoppingCart size={20} /> },
  { id: 6, name: 'Categories',  link: '#',  icon: <BiCategory  size={20} /> },
]

const listVariants = {
  enter:  (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}



const ResponsiveMenu = ({ open, onClose }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.button
          type="button"
          aria-label="Close menu overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 min-[1280px]:hidden"
        />
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          className="fixed top-0 left-0 z-50 h-dvh w-[84vw] max-w-85 bg-[#0d235b] shadow-xl min-[1280px]:hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
            <span className="font-bold text-[1.125em] tracking-tight">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 hover:bg-[#F2F0F1] transition-colors"
            >
              <IoMdClose size={20} />
            </button>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-black/10">
            <FaCircleUser className="text-[2.5em] text-gray-400" />
            <div>
              <p className="font-semibold text-sm">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>

          {/* Nav links */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence custom={1} mode="wait">
              <motion.ul
                key="main"
                custom={1}
                variants={listVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex flex-col gap-1 p-3 text-white"
              >
                {Menu.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      onClick={onClose}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[1.063em] hover:bg-[#F2F0F1] transition-colors"
                    >
                      <span className="text-gray-500">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
                {/* Footer */}
                  <button
                  onClick={ () => {
                    localStorage.removeItem('admin_token');
                    window.location.href = "/Admin/Login";
                  }}
                  className="font-satoshibold px-4 py-4 border-t border-black/10 text-[1.1em] text-gray-300 cursor-pointer hover:text-gray-200 active:text-gray-100 active:bg-[#25396c] transition-colors duration-200">
                    Logout
                  </button>
              </motion.ul>
            </AnimatePresence>
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
)

// ─── Desktop NavBar ──────────────────────────────────────────────────────────
const NavBar = () => {
  const location = useLocation()

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('admin_token');
    navigate('/Admin/Login', { replace: true });
  };

  return (
    <aside className="hidden min-[1280px]:flex flex-col w-64 h-screen bg-[#0d235b] border-r border-black/10 fixed top-0 left-0 z-30">
      {/* Logo / Brand */}
      <div className="px-6 py-5 border-b border-black/10">
        <span className="font-bold text-xl tracking-tight text-white">Admin Panel</span>
      </div>

      {/* User info */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-black/10">
        <FaCircleUser className="text-[2.5em] text-gray-400 shrink-0" />
        <div className="min-w-0">
          <p className="font-satoshibold text-sm truncate text-white">Admin User</p>
          <p className="text-xs text-gray-400 truncate">admin@example.com</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-1">
          {Menu.map((item) => {
            const active = location.pathname === item.link
            return (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[0.975em] transition-colors
                    ${active
                      ? 'bg-[#030B22] text-white font-semibold'
                      : 'text-gray-300 hover:bg-[#243d7d]'
                    }`}
                >
                  <span className={active ? 'text-white' : 'text-gray-500'}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <button
       onClick={logout}
       disabled={true}
       className="font-satoshibold px-4 py-4 border-t border-black/10 text-[1.1em] text-gray-300 cursor-pointer hover:text-gray-200 active:text-gray-100 active:bg-[#25396c] transition-colors duration-200">
        Logout
      </button>
    </aside>
  )
}

// ─── Top bar (mobile only) ────────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop NavBar */}
      <NavBar />

      {/* Mobile top bar */}
      <header className="min-[1280px]:hidden w-full h-14 bg-[#0d235b] border-b border-black/10 flex items-center px-4 gap-4 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md p-2 hover:bg-[#F2F0F1] transition-colors"
          aria-label="Open menu"
        >
          <RxHamburgerMenu size={22} />
        </button>
        <span className="font-bold text-lg tracking-tight text-white">Admin Panel</span>
        <div className="ml-auto">
          <FaCircleUser className="text-[1.75em] text-gray-400" />
        </div>
      </header>

      {/* Mobile drawer */}
      <ResponsiveMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Navbar
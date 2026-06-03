import React, { useEffect, useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiPackage } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import Wishlist from './ProfilePages/Wishlist';
import Orders from './ProfilePages/Orders';
import Settings from './ProfilePages/Settings';

const MenuItems = [
  { id: "tab1", name: "Wishlist", icon: <FaRegHeart className="profile_menu_icon" /> },
  { id: "tab2", name: "Orders", icon: <PiPackage className="profile_menu_icon" /> },
  { id: "tab3", name: "Settings", icon: <IoSettingsOutline className="profile_menu_icon" /> },
]

const UserProfilePage = () => {
  const [selected, setSelected] = useState("tab1");
  const [activeTab, setActiveTab] = useState("tab1");
  const [userData, setUserData] = useState(null);
  // NEW: controls whether the sub-page is slid in on mobile
  const [mobileSlid, setMobileSlid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:8085/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        const text = await r.text();
        if (!r.ok) throw new Error(text || `Failed to load profile (${r.status})`);
        if (!text) throw new Error("Empty response");
        return JSON.parse(text);
      })
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:8085/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    localStorage.removeItem("token");
    localStorage.setItem("cartCount", "0");
    window.dispatchEvent(new Event("cartUpdated"));
    window.location.replace("/login");
  };

  const handleMenuClick = (id) => {
    console.log(userData);
    setSelected(id);
    setActiveTab(id);
    setMobileSlid(true); // slide forward on mobile
  };

  const handleBack = () => {
    setMobileSlid(false); // slide back on mobile
  };

  const tabContent = {
    tab1: <Wishlist userData={userData} />,
    tab2: <Orders userData={userData} />,
    tab3: <Settings userData={userData} onUserUpdated={setUserData} />,
  };

  const selectedItem = MenuItems.find((item) => item.id === selected);

  return (
    <div className="screen-adapt">
      <div className="h-px bg-black opacity-10 w-full" />

      {/* ── MOBILE: sliding two-panel layout ── */}
      <div className="md:hidden overflow-hidden relative">
        <div
          className="flex transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: mobileSlid ? 'translateX(-100%)' : 'translateX(0)' }}
        >
          {/* Panel 1 — Menu */}
          <div className="min-w-full px-5 py-8 flex flex-col gap-6">
            {/* User info */}
            <div className="flex flex-col items-center gap-3 pb-4">
              <FaCircleUser size={80} />
              <h2 className="font-satoshi text-[18px]">{userData?.username}</h2>
            </div>

            {/* Menu items */}
            <div className="flex flex-col gap-3">
              {MenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className="flex items-center justify-between bg-[#F0F0F0] w-full py-5 px-4 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <IoIosArrowForward />
                </button>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="font-satoshibold border-2 cursor-pointer text-red-500 border-red-500 rounded-[30px] py-3 mx-[20%] mt-2"
            >
              Log out
            </button>
          </div>

          {/* Panel 2 — Sub-page (full screen) */}
          <div className="min-w-full min-h-screen flex flex-col">
            {/* Sticky back header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-start gap-3 px-4 py-4 border-b border-gray-100">
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F0F0F0] cursor-pointer"
              >
                <IoIosArrowBack size={18} />
              </button>
              <span className="font-satoshibold text-[17px]">{selectedItem?.name}</span>
            </div>

            {/* Tab content */}
            <div className="flex-1">
              {tabContent[activeTab]}
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: original side-by-side layout ── */}
      <div className="hidden md:grid md:grid-cols-5 gap-10 w-full mx-auto mb-10">
        <div className="col-span-1 item_container py-[20%] px-[5%] gap-10 items-center">
          <div className="flex flex-col items-center gap-4">
            <FaCircleUser size={100} />
            <h2 className="font-satoshi text-[18px]">{userData?.username}</h2>
          </div>
          <div className="flex flex-col gap-5 w-full">
            {MenuItems.map((menu_item) => (
              <button
                key={menu_item.id}
                onClick={() => { setSelected(menu_item.id); setActiveTab(menu_item.id); }}
                className={`flex items-center gap-2 justify-center cursor-pointer transition-colors duration-200 w-full py-2 rounded-lg
                  ${selected === menu_item.id ? "font-satoshibold text-black" : "text-gray-600 hover:text-gray-800"}`}
              >
                {menu_item.icon}
                <span>{menu_item.name}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="font-satoshibold border-2 cursor-pointer hover:scale-103 active:scale-100 text-red-500 border-red-500 rounded-[30px] py-[4%] mx-[20%]"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="col-span-4">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
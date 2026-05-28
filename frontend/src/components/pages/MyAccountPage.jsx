import React, { useEffect, useState} from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiPackage } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io"
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import Wishlist from './ProfilePages/Wishlist';
import Orders from './ProfilePages/Orders';
import Settings from './ProfilePages/Settings';

const MenuItems = [
{
  id: "tab1",
  name: "Wishlist",
  icon: <FaRegHeart className="profile_menu_icon" />
},
{
  id: "tab2",
  name: "Orders",
  icon: <PiPackage className="profile_menu_icon"/>
},
{
  id: "tab3",
  name: "Settings",
  icon: <IoSettingsOutline className="profile_menu_icon"/>
},
]

const UserProfilePage = () => {

  const [selected, setSelected] = useState("tab1"); //Default first option
  const [activeTab, setActiveTab] = useState("tab1")
  const [userData, setUserData] = useState(null);
  const selectedItem = MenuItems.find((item) => item.id === selected);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8085/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        const text = await r.text();
        if (!r.ok) {
          throw new Error(text || `Failed to load profile (${r.status})`);
        }
        if (!text) {
          throw new Error("Empty response — log out, log in again, and restart the backend");
        }
        return JSON.parse(text);
      })
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = async() => {
    await fetch("http://localhost:8085/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
    });

    localStorage.removeItem("token");
    localStorage.setItem("cartCount", "0");
    window.dispatchEvent(new Event("cartUpdated"));
    window.location.replace("/login");
  }
  const tabContent = {
        tab1: <Wishlist userData={userData} />,
        tab2: <Orders/>,
        tab3: <Settings userData={userData} onUserUpdated={setUserData} />
    }

  return (
    <div className="screen-adapt">
      <div className="h-px bg-black opacity-10 mb-10 w-full" />
      
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 w-full mx-auto">

        {/*Profile Information Panel */}
        <div className="col-span-1 item_container py-[10%] md:py-[20%] px-[5%] gap-10 items-center ">
          
          {/* User Profile and Name */}
          <div className="flex flex-col items-center gap-4">
            <FaCircleUser size={100}/>
            <h2 className="font-satoshi text-[18px]">{userData?.username}</h2>
          </div>


          {/* My account Menu Options */}
          <div className="flex flex-col gap-6 md:gap-5 w-full ">
            {
              MenuItems.map((menu_item) => (
                <button 
                key={menu_item.id}
                onClick ={() => {
                  setSelected(menu_item.id);
                  setActiveTab(menu_item.id);
                }}
                className={`flex items-center gap-2 justify-between md:justify-center cursor-pointer transition-colors duration-200 bg-[#F0F0F0] md:bg-white w-full py-5 px-2 md:px-0 md:py-2 rounded-lg
                ${selected == menu_item.id ? "font-satoshibold text-black hover:text-black" : "text-gray-600 hover:text-gray-800"}`}>
                  <div className="flex items-center gap-2">
                    {menu_item.icon}
                    <span>{menu_item.name}</span>
                  </div>
                  <button className=" md:hidden"><IoIosArrowForward /></button>
                </button>
              ))
            }
            <button onClick={handleLogout} className="font-satoshibold border-2 cursor-pointer hover:scale-103 active:scale-100 text-red-500 border-red-500 rounded-[30px] py-[4%] mx-[20%]">Log out</button>
          </div>

        </div>

        {/* Profile Display Page */}
        <div className="hidden md:block md:col-span-4">
            {tabContent[activeTab]}
        </div>

      </div>
    </div>
  )
}

export default UserProfilePage
import React, { useState} from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiPackage } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io"
import { IoPersonSharp } from "react-icons/io5";

const MenuItems = [
{
  id: 1,
  name: "My account",
  icon: <IoPersonSharp />
},
{
  id: 2,
  name: "Wishlist",
  icon: <FaRegHeart className="profile_menu_icon" />
},
{
  id: 3,
  name: "Orders",
  icon: <PiPackage className="profile_menu_icon"/>
},
{
  id: 4,
  name: "Settings",
  icon: <IoSettingsOutline className="profile_menu_icon"/>
},
]
const UserProfilePage = () => {

  const [selected, setSelected] = useState(); //Default first option
  
  const selectedItem = MenuItems.find((item) => item.id === selected);

  return (
    <div className="screen-adapt gap-5">

      <div className="h-px bg-black opacity-10 mx w-full" />
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

        {/*Profile Information Panel */}
        <div className="col-span-1 item_container py-[10%] md:py-[20%] px-[5%] gap-10 items-center ">
          
          {/* User Profile and Name */}
          <div className="flex flex-col items-center gap-4">
            <FaCircleUser size={100}/>
            <h2 className="font-satoshi text-[18px]">username</h2>
          </div>


          {/* My account Menu Options */}
          <div className="flex flex-col gap-6 md:gap-5 w-full ">
            {
              MenuItems.map((menu_item) => (
                <button 
                key={menu_item.id}
                onClick ={() => setSelected(menu_item.id)}
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
            <button className="font-satoshibold border-2 cursor-pointer hover:scale-103 active:scale-100 text-red-500 border-red-500 rounded-[30px] py-[4%] mx-[20%]">Log out</button>
          </div>

        </div>

        {/* Profile Display Page */}
        <div className="hidden md:block md:col-span-4">

        </div>

      </div>
    </div>
  )
}

export default UserProfilePage
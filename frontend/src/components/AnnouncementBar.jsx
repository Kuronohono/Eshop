import React from 'react'
import { IoClose } from "react-icons/io5";

const AnnouncementBar = () => {
  return (
    <div className='font-satoshi w-full bg-black text-[#d2d2d2] text-center py-2 px-4 text-sm flex items-center justify-center'>
    Sign up and get 20% off to your first order.
    <a href='/register' className='underline font-semibold'>Sign Up Now</a>
    <IoClose />
    </div>
  )
}

export default AnnouncementBar
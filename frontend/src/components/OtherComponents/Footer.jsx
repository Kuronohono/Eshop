import React from 'react'
import { TiMail } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Visa from "../../assets/payment_imgs/Visa.png"
import MasterCard from "../../assets/payment_imgs/Mastercard.png"
import PayPal from "../../assets/payment_imgs/Paypal.png"
import ApplePay from "../../assets/payment_imgs/ApplePay.png"
import GooglePay from "../../assets/payment_imgs/GooglePay.png"

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-[85%] gap-5 bg-black px-[5%] py-[5%] md:px-[5%] md:py-[1%] rounded-[20px] items-center relative z-10 mb-[-90px]">
            
            <h1 className="font-integralcf text-white  md:pt-[0px] text-[32px] md:text-[40px]">Stay upto date about our latest offers</h1>
            
            <div className="flex flex-col justify-center w-full md:pl-[30%]">

                <div className="input_outerDiv">
                    <TiMail className="opacity-40 mr-2" size={24}/>
                    <input type="email" placeholder="Enter your email address"
                    className="input_field"/>
                </div>

                <button className="flex items-center justify-center bg-[#F0F0F0] my-3 rounded-[62px] px-4 py-3 cursor-pointer active:scale-100 hover:scale-103 transition-all">Subscribe to Newsletter</button>

            </div>

        </div>

        {/* Footer Grid Section */}
        <div className="flex flex-col w-full bg-[#F0F0F0] pt-[80px] md:pt-[0px] px-[8%] gap-10 ">

            {/*Info Section */}

            <div className="grid grid-cols-2 md:grid-cols-6 mt-[10%] w-full justify-center gap-10">

                <div className="flex flex-col col-span-2 md:pr-[20%] gap-5">
                    <p className="font-integralcf text-[25px] sm:text-[32px] flex items-center gap-2 font-bold">SHOP.CO</p>
                    <p className="opacity-60 text-[14px]">We have clothes that suits your style and which you're proud to wear. From women to men.</p>
                    
                    {/* Social Media Icons */}
                    <div className="flex items-center gap-3">
                        <button className="social_icon_btn" >
                        <FaTwitter className="social_icons" size={12}/>
                        </button>

                        <button className="social_icon_btn_dark" >
                        <FaFacebookF className="invert" size={12}/>
                        </button>

                        <button className="social_icon_btn" >
                        <FaInstagram size={12}/>
                        </button>

                        <button className="social_icon_btn" >
                        <FaGithub size={12}/>
                        </button>
                        
                    </div>
                </div>

                {/* Company */}
                <div className="flex flex-col justify-center gap-3 md:gap-4">
                    <h1 className="font-satoshisemibold">COMPANY</h1>
                    <p className="footer_options">About</p>
                    <p className="footer_options">Features</p>
                    <p className="footer_options">Works</p>
                    <p className="footer_options">Career</p>
                </div>

                {/* Help */}
                <div className="flex flex-col justify-center gap-3 md:gap-4">
                    <h1 className="font-satoshisemibold">HELP</h1>
                    <p className="footer_options">Customer Support</p>
                    <p className="footer_options">Delivery Details</p>
                    <p className="footer_options">Terms & Conditions</p>
                    <p className="footer_options">Privacy Policy</p>
                </div>

                {/* FAQ*/}
                <div className="flex flex-col justify-center gap-3 md:gap-4">
                    <h1 className="font-satoshisemibold">FAQ</h1>
                    <p className="footer_options">Account</p>
                    <p className="footer_options">Manage Deliveries</p>
                    <p className="footer_options">Orders</p>
                    <p className="footer_options">Payments</p>
                </div>

                {/* Resources */}
                <div className="flex flex-col justify-center gap-3 md:gap-4">
                    <h1 className="font-satoshisemibold">RESOURCES</h1>
                    <p className="footer_options">Free eBooks</p>
                    <p className="footer_options whitespace-nowrap">Developmnet Tutorial</p>
                    <p className="footer_options">How to - Blog</p>
                    <p className="footer_options">Youtube Playlist</p>
                </div>
           

            </div>

            <div className="h-px w-full bg-black opacity-20 mx-auto" />

            {/* All Rights Section*/}
            <div className="flex flex-col gap-5 pb-[20%] md:pb-[10%]">

                <div className="flex flex-col md:flex-row gap-3 items-center items-center w-full justify-between">
                    <p className="font-satoshi opacity-40 text-[14px]">Shop.co © 2000-2021, All rights reserved</p>

                    {/*Card Payment Section */}
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center bg-white w-[45px] h-[30px] rounded-[5px] ">
                            <img src={Visa} size={12}/>
                        </button>

                        <button className="flex items-center justify-center bg-white w-[45px] h-[30px] rounded-[5px] ">
                            <img src={MasterCard} size={12}/>
                        </button>

                        <button className="flex items-center justify-center bg-white w-[45px] h-[30px] rounded-[5px] ">
                            <img src={PayPal} size={12}/>
                        </button>

                        <button className="flex items-center justify-center bg-white w-[45px] h-[30px] rounded-[5px] ">
                            <img src={ApplePay} size={12}/>
                        </button>

                        <button className="flex items-center justify-center bg-white w-[45px] h-[30px] rounded-[5px] ">
                            <img src={GooglePay} size={12}/>
                        </button>
                    </div>
                </div>

            </div>

        </div>

    </div>
  )
}

export default Footer
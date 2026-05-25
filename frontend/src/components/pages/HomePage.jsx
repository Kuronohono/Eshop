import React, { useState, useEffect } from 'react'
import BrowseStylePanel from '../OtherComponents/BrowseStylePanel'
import Footer from '../OtherComponents/Footer'
import Carousel from '../OtherComponents/FilterComponents/Carousel'
import TestimonialCarousel from '../OtherComponents/TestimonialCarousel';

const Products = () => {
    
    useEffect(() =>{
        fetch("http://localhost:8085/products/")
    })


  return (
    <div className='w-full overflow-hidden'>
    <div className="screen-adapt gap-10" >
        
        {/* New Arrivals Header Section */}
        <div className="flex items-center justify-center pt-8 md:pt-15">
            <h1 className="home_banner">New Arrivals</h1>
        </div>

        {/* New Arrivals Card Section */}
        <div className="flex flex-col items-center justify-center w-full gap-10">
            <Carousel/>
            <button className="view_all_btn" >View All</button>
            
        </div>

         <div className="h-px w-4/5 bg-black opacity-10 mx-auto" />

         {/* Top Selling Header Section */}
        <div className="flex items-center justify-center pt-8 md:pt-15">
            <h1 className="home_banner">Top Selling</h1>
        </div>

        {/* Top Selling Card Section */}
        <div className="flex flex-col items-center justify-center w-full gap-10">
            <Carousel/>
            <button className="view_all_btn" >View All</button>
        </div>

        {/* Browse By Dress Style Section*/}
        <div className="flex flex-col items-center justify-center bg-[#F0F0F0] mx-auto w-full rounded-[20px] md:rounded-[40px]">
            <div className="pt-8 md:pt-15 flex flex-wrap items-center justify-center w-full">
                <h1 className="home_banner lg:px-[0%] text-center">Browse by dress style</h1>
            </div>

            {/*Dress Styles */}
            <div className="flex items-center py-6 md:py-[5%] w-full justify-center">
                <BrowseStylePanel/>
            </div>
        </div>

        {/* Our Happy Customers Section */}
        <TestimonialCarousel/>
        

    </div>
    </div>
  )
}

export default Products
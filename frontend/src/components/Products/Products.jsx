import React from 'react'
import Img1 from "../../assets/placeholder_imgs/tapeshirt.png"
import Img2 from "../../assets/placeholder_imgs/skinnyjeans.png"
import Img3 from "../../assets/placeholder_imgs/checkered_shirt.png"
import Img4 from "../../assets/placeholder_imgs/sleevestriped.png"
import Img5 from "../../assets/placeholder_imgs/vertical_striped.png"
import Img6 from "../../assets/placeholder_imgs/courage_shirt.png"
import Img7 from "../../assets/placeholder_imgs/bermuda_shorts.png"
import Img8 from "../../assets/placeholder_imgs/faded_skinny.png"
import CardComponent from '../CardComponent/CardComponent'
import BrowseStylePanel from '../OtherComponents/BrowseStylePanel'
import Footer from '../OtherComponents/Footer'

const NewArrivalsProductsData = [
{
    id: 1,
    img: Img1,
    title: "T-shirt with Tape Details",
    rating: 4.5,
    price: 120,
    sale_per: 0,
},
{
    id: 2,
    img: Img2,
    title: "Skinny Fit Jeans",
    rating: 3.5,
    price: 260,
    sale_per: 20,
},
{
    id: 3,
    img: Img3,
    title: "Checkered Shirt",
    rating: 4.5,
    price: 180,
    sale_per: 0,
},
{
    id: 4,
    img: Img4,
    title: "Sleeve Striped T-shirt",
    rating: 4.5,
    price: 160,
    sale_per: 30,
}
]

const TopSellingData = [
{
    id: 5,
    img: Img5,
    title: "Vertical Striped Shirt",
    rating: 5.0,
    price: 232,
    sale_per: 20
},
{
    id: 6,
    img: Img6,
    title: "Courage Graphic T-shirt",
    rating: 4.0,
    price: 145,
    sale_per: 0
},
{
    id: 7,
    img: Img7,
    title: "Loose Fit Bermuda Shorts",
    rating: 3.0,
    price: 80,
    sale_per: 0
},
{
    id: 8,
    img: Img8,
    title: "Faded Skinny Jeans",
    rating: 4.5,
    price: 210,
    sale_per: 0
},
]

const Products = () => {
  return (
    <div className="flex flex-col justify-center gap-10" >
        
        {/* New Arrivals Header Section */}
        <div className="flex items-center justify-center pt-8 md:pt-15">
            <h1 className="home_banner">New Arrivals</h1>
        </div>

        {/* New Arrivals Card Section */}
        <div className="flex flex-col items-center justify-center w-full gap-10">
            <CardComponent products={NewArrivalsProductsData}/>
            <button className="view_all_btn" >View All</button>
        </div>

         <div className="h-px w-4/5 bg-black opacity-10 mx-auto" />

         {/* Top Selling Header Section */}
        <div className="flex items-center justify-center pt-8 md:pt-15">
            <h1 className="home_banner">Top Selling</h1>
        </div>

        {/* Top Selling Card Section */}
        <div className="flex flex-col items-center justify-center w-full gap-10">
            <CardComponent products={TopSellingData}/>
            <button className="view_all_btn" >View All</button>
        </div>

        {/* Browse By Dress Style Section*/}
        <div className="flex flex-col items-center justify-center bg-[#F0F0F0] mx-auto w-[85%] rounded-[40px] ">
            <div className="pt-8 md:pt-15 flex flex-wrap items-center justify-center px-10">
                <h1 className="home_banner text-center">Browse by dress style</h1>
            </div>

            {/*Dress Styles */}
            <div className="flex items-center">
                <BrowseStylePanel/>
            </div>
        </div>

        {/* Our Happy Customers Section */}
        
            <div className="flex pl-[7%] pt-8 md:pt-15">
            <h1 className="home_banner">Our Happy Customers</h1>
            </div>
        

    </div>
  )
}

export default Products
import React from 'react'
import HeroImg from "../../assets/hero_page_img.jpg"
import Versace from "../../assets/Versace.png"
import Zara from "../../assets/zara.png"
import Gucci from "../../assets/gucci.png"
import Prada from "../../assets/prada.png"
import CalvinKlein from "../../assets/calvin_klein.png"
import {Link} from "react-router-dom"
import { motion } from "framer-motion"
import { SlideLeft, SlideRight, SlideRightParagraph, FadeIn } from '../../utils/animation'

const Brands = [
    {
        id: 1,
        name: "Versace",
        image: Versace
    },
    {
        id: 2,
        name: "Zara",
        image: Zara
    },
    {
        id: 3,
        name: "Gucci",
        image: Gucci
    },
    {
        id: 4,
        name: "Prada",
        image: Prada
    },
    {
        id: 5,
        name: "Calvin Klein",
        image: CalvinKlein
    },
]

const Hero = () => {
  return (
        <section className="overflow-hidden">
            <div className="w-full flex flex-col xl:flex-row mx-auto mt-9 bg-[#F0F2F1]">

            {/*Brand Info */}

                <div className="flex flex-col flex-43 mx-auto pt-8 gap-2 px-5 sm:px-10 md:px-10 lg:px-10 xl:pl-25">
                    
                    <motion.h1
                    variants={SlideRight(0.5)}
                    initial="hidden"
                    animate = "visible"
                    className="font-integralcf wrap-break-word leading-tight xl:leading-16 tracking-[0%] text-[2.25em] w-full
                    sm:text-[2.25em] md:text-[3em] lg:text-[3.5em] xl:text-[4em] max-w-78.75 sm:max-w-112.5 lg:max-w-125 xl:max-w-144.25">
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </motion.h1>

                    <motion.p
                    variants={SlideRightParagraph(1)}
                    initial="hidden"
                    animate = "visible"
                    className="font-satoshi mt-2 sm:mt-5 opacity-40 font-normal wrap-break-word
                     text-[12px] md:text-[14px] lg:text-[16px] w-full max-w-[320px] sm:max-w-[90%]">
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring out your individuality and cater to your sense of style.
                    </motion.p>

                    {/* Button and Info Section */}
                    <motion.Link
                    variants={SlideRight(1.3)}
                    initial="hidden"
                    animate = "visible"
                     to={"/login"} className="black_button">
                    Shop Now</motion.Link>

                    {/*Stats */}
                    <div className="flex flex-wrap lg:flex-nowrap justify-center md:justify-start items-center md:items-start gap-8 mt-8">
                        
                        <motion.div
                        variants={FadeIn(1.5)}
                        initial="hidden"
                        animate = "visible">
                            <p className="hero_pHeader">200+</p>
                            <p className="here_pText">International Brands</p>
                        </motion.div>

                        <div className="w-px h-12 bg-black opacity-10" />

                        <motion.div
                        variants={FadeIn(1.8)}
                        initial="hidden"
                        animate = "visible">
                            <p className="hero_pHeader">2,000+</p>
                            <p className="here_pText">High-Quality Products</p>
                        </motion.div>

                        <div className="hidden xl:block w-px h-12 bg-black opacity-10 " />
                        
                        <motion.div
                        variants={FadeIn(2.1)}
                        initial="hidden"
                        animate = "visible">
                            <p className="hero_pHeader">30,000+</p>
                            <p className="here_pText">Happy Customers</p>
                        </motion.div>
                    </div>


                </div>
                
                {/* Hero Image */}
                <div className="flex-50 overflow-hidden lg:h-165.75">
                    <motion.img
                    variants={FadeIn(0.7)}
                    initial="hidden"
                    animate = "visible"
                     src={HeroImg} alt="" className="h-full w-full object-contain object-top origin-top"/>
                </div>

            </div>

            <div className="brand_container">
                {
                    Brands.map( (brand, index) => (
                        <motion.div
                        key={brand.id}
                        variants={FadeIn(1.5 + index * 0.3)}
                        initial="hidden"
                        animate = "visible">
                            <Link to={`/Brands/${brand.name}`} className='flex items-center'>
                                <img src={brand.image} className="brand-logo"/>
                            </Link>
                        </motion.div>
                    ))
                }
            </div>

        </section>
  )
}

export default Hero
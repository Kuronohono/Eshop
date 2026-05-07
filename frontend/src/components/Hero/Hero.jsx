import React from 'react'
import HeroImg from "../../assets/hero_page_img.jpg"
import Versace from "../../assets/Versace.png"
import Zara from "../../assets/zara.png"
import Gucci from "../../assets/gucci.png"
import Prada from "../../assets/prada.png"
import CalvinKlein from "../../assets/calvin_klein.png"

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
                    
                    <h1 className="font-integralcf wrap-break-word leading-tight xl:leading-16 tracking-[0%] text-[36px] w-full
                    sm:text-[36px] md:text-[48px] lg:text-[56px] xl:text-[64px] max-w-78.75 sm:max-w-112.5 lg:max-w-125 xl:max-w-144.25">
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>

                    <p className="font-satoshi mt-2 sm:mt-5 opacity-60 font-normal wrap-break-word
                     text-[12px] md:text-[14px] lg:text-[16px] w-full max-w-[320px] sm:max-w-[90%]">
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring out your individuality and cater to your sense of style.
                    </p>

                    {/* Button and Info Section */}
                    <button className="black_button">
                    Shop Now</button>

                    {/*Stats */}
                    <div className="flex flex-wrap lg:flex-nowrap justify-center md:justify-start items-center md:items-start gap-8 mt-8">
                        <div>
                            <p className="font-satoshibold text-[24px] lg:text-[40px] font-bold leading-tight">200+</p>
                            <p className="font-satoshi text-[12px] lg:text-[16px] opacity-60">International Brands</p>
                        </div>
                        <div className="w-px h-12 bg-black opacity-10" />
                        <div>
                            <p className="font-satoshibold text-[24px] lg:text-[40px] font-bold leading-tight">2,000+</p>
                            <p className="font-satoshi text-[12px] lg:text-[16px] opacity-60">High-Quality Products</p>
                        </div>
                        <div className="hidden xl:block w-px h-12 bg-black opacity-10 " />
                        <div>
                            <p className="font-satoshibold text-[24px] lg:text-[40px] font-bold leading-tight">30,000+</p>
                            <p className="font-satoshi text-[12px] lg:text-[16px] opacity-60">Happy Customers</p>
                        </div>
                    </div>


                </div>
            {/* Hero Image */}
                <div className="flex-[50] overflow-hidden lg:h-[663px]">
                    <img src={HeroImg} alt="" className="h-full w-full object-contain object-top origin-top"/>
                </div>

            </div>

            <div className="flex flex-wrap bg-black w-full min-h-[122px] items-center justify-center md:justify-between gap-6 gap-y-6 py-6 px-2 md:px-20">
                <img src={Versace} alt=""     className="brand-logo w-[120px]  h-[25px] md:w-[220px] md:h-[50px]" />
                <img src={Zara} alt=""        className="brand-logo w-[65px]  h-[30px] md:w-[130px] md:h-[50px]"/>
                <img src={Gucci} alt=""       className="brand-logo w-[110px]  h-[28px] md:w-[220px] md:h-[36px]"/>
                <img src={Prada} alt=""       className="brand-logo w-[127px]  h-[25px] md:w-[220px] md:h-[50px]"/>
                <img src={CalvinKlein} alt="" className="brand-logo w-[135px] h-[25px] md:w-[200px] md:h-[40px]"/>
            </div>

        </section>
  )
}

export default Hero
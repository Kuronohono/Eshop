import React from 'react'

const Hero = () => {
  return (
        <section>
            <div className="w-full grid grid-cols-1 mx-auto mt-9 h-165.75 bg-[#F2F0F1]">
            {/*Brand Info */}
                <div className="flex flex-col max-w-[1240px] mx-auto pt-25 gap-2">
                    <h1 className="font-integralcf xl:max-w-[555px] text-[64px] leading-16 tracking-[0%] align-middle w-144.25">
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>
                    <p className="font-satoshi xl:max-w-[545px] mt-5 opacity-60 text-[16px] font-normal ">
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring out your individuality and cater to your sense of style.
                    </p>

                    {/* Button and Info Section */}
                    <button className=" font-satoshi bg-black w-[210px] h-[52px]  mt-4 rounded-[62px] text-white
                     py-[14px] px-[54px] gap-[12px] hover:bg-[#202020] cursor-pointer transition-all active:scale-95">Shop Now</button>
                </div>
            {/* Hero Image */}
            </div>
        </section>
  )
}

export default Hero
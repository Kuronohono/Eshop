import React from 'react'


const ProductPrice = ({price, sale_per}) => {

    if(sale_per == 0){
        return <h3 className="font-satoshibold text-[24px]">${price}</h3>
    }

     const new_price = price - price*sale_per/100;

     return(
        <div className="flex items-center gap-3">
            <h3 key="new_price" className="font-satoshibold text-[20px] md:text-[24px]">${new_price}</h3>
            <h3 key="old_price" className="font-satoshibold text-[20px] md:text-[24px] opacity-40 line-through">${price}</h3>
            <a  key="sale-badge" className="font-satoshi text-[#FF3333] bg-[rgba(255,51,51,0.1)] px-3 py-1 rounded-xl text-[12px]">-{sale_per}%</a>
        </div>
     );
        
}

export default ProductPrice
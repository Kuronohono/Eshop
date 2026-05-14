import React from 'react'


const ProductPrice = ({price, sale_per, pricingDivClass, newPriceClass, oldPriceClass, discountClass}) => {

    if(sale_per == 0){
        return <h3 className="font-satoshibold text-[24px]">${price}</h3>
    }

     const new_price = price - price*sale_per/100;

     return(
        <div className={pricingDivClass}>
            <h3 key="new_price" className={newPriceClass}>${new_price}</h3>
            <h3 key="old_price" className={oldPriceClass}>${price}</h3>
            <span  key="sale-badge" className={discountClass}>-{sale_per}%</span>
        </div>
     );
        
}

export default ProductPrice
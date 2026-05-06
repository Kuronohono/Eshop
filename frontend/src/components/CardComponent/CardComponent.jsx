import React from 'react'
import StarRating from '../OtherComponents/StarRating'
import ProductPrice from '../OtherComponents/ProductPrice'


const CardComponent = ({products}) => {
  return (
    <div className="lg:container mx-auto">
        <div className="grid grid-cols-4 items-center justify-center gap-5">
            {
                products?.map((product) =>(
                    <div key={product?.id}>
                        {/* Product Image */}
                        <div className="flex flex-col gap-2 hover:scale-105 transition-all active:scale-100 cursor-pointer">
                            <img src={product?.img} alt="product" className=" w-full h-[200px] md:h-[300px] object-cover rounded-2xl"/>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-satoshibold text-16px md:text-[20px]">{product?.title}</h3>
                                <div className="flex items-center gap-2 md:gap-4">
                                    <StarRating rating={product.rating}/>
                                    <h4 className="font-satoshi text-[12px] md:text-[15px]">{product.rating}/5</h4>
                                </div>
                                <ProductPrice price={product.price} sale_per={product.sale_per}/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default CardComponent
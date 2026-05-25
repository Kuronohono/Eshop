import React from 'react'

const ProductDetailsPage = ({product}) => {
  return (
    <div className='flex flex-col w-full gap-2 mt-10'>
      <h1 className="font-satoshibold text-[1.25em] lg:text-[1.5em]">Details</h1>
        <span>{product?.description}</span>
      <ul className='flex flex-col gap-2'>
        <li className='details_li'>Type: <span className='details_span'>{product?.productType}</span></li>
        <li className='details_li'>Gender: <span className='details_span'>{product?.gender}</span></li>
        <li className='details_li'>DressStyle: <span className='details_span'>{product?.dressStyle}</span></li>
        <li className='details_li'>Brand: <span className='details_span'>{product?.productBrand}</span></li>
      </ul>
    </div>
  )
}

export default ProductDetailsPage
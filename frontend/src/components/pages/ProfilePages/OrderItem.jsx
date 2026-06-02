import React from 'react'
import NoImageAvailable from '../../../assets/No_Image_Available.jpg'
import { useNavigate } from 'react-router-dom'

const OrderItem = ( {order} ) => {
    const navigate = useNavigate()
  return (
    <div className='order_itemDiv'>
        {
            order.map( (item) => (
                <div key={item.id} className='flex gap-2 cursor-pointer' onClick={() => navigate(`/${item.product?.id}`,{
                     state: { item: item.product } 
                })}>
                    <img src={item?.imageUrls?.[0] || NoImageAvailable} className="order_itemImg"/>
                    <div className='flex flex-col justify-between gap-2'>
                        <h1>{item.name}</h1>
                        <h1>{item.quantity}</h1>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default OrderItem
import React from 'react'
import NoImageAvailable from '../../../assets/No_Image_Available.jpg'
import { useNavigate } from 'react-router-dom'

const OrderItem = ( {order} ) => {
    const navigate = useNavigate()

    const items = Array.isArray(order?.items) ? order.items : []
    const createdAt = order?.createdAt ? new Date(order.createdAt) : null
    const createdAtText = createdAt && !Number.isNaN(createdAt.getTime())
        ? createdAt.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A"

  return (
    <div className='order_itemDiv flex flex-col gap-4'>
        <div className='flex flex-col gap-1 border-b border-black/10 pb-3'>
            <h2 className='font-satoshibold text-[17px]'>Order #{order?.id ?? "N/A"}</h2>
            <p className='font-satoshi text-sm text-black/60'>Placed on {createdAtText}</p>
            <p className='font-satoshi text-sm text-black/80'>Status: <span className='font-satoshibold'>{order?.status ?? "N/A"}</span></p>
            <p className='font-satoshi text-sm text-black/80'>Total: ${Number(order?.totalPrice ?? 0).toFixed(2)}</p>
        </div>

        {items.length === 0 ? (
            <p className='font-satoshi text-sm text-black/60'>No items in this order.</p>
        ) : (
            items.map((item, index) => (
                <div key={`${order?.id}-${item?.productId}-${index}`}
                    className='flex gap-3 cursor-pointer'>
                    <img src={item?.imageUrl || NoImageAvailable} className="order_itemImg"/>
                    <div className='flex flex-col justify-between gap-1'>
                        <h1 className='font-satoshibold'>{item?.productName ?? "Product"}</h1>
                        <h1 className='font-satoshi text-sm text-black/70'>Quantity: {item?.quantity ?? 0}</h1>
                        <h1 className='font-satoshi text-sm text-black/70'>Price: ${Number(item?.priceAtPurchase ?? 0).toFixed(2)}</h1>
                    </div>
                </div>
            ))
        )}
    </div>
  )
}

export default OrderItem
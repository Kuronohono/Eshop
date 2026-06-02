import React from 'react'
import OrderItem from './OrderItem'

const Orders = ( {userData}) => {
  if (!userData) {
    return (
      <div>
        <h1 className="page_header">Orders</h1>
        <p className="font-satoshi text-gray-500 mt-5">Loading your orders...</p>
      </div>
    )
  }

  const orders = userData.orders ?? []

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className="page_header">Orders</h1>  
      </div>
      {orders.length === 0 ? (
        <p className="font-satoshi text-gray-500 mt-5">You have no orders yet.</p>
      ) : (
        <div className="flex flex-col gap-5 lg:gap-7 mt-5">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
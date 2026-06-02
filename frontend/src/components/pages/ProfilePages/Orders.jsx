import React, { useState, useEffect } from 'react'
import OrderItem from './OrderItem'

const Orders = ( {userData}) => {
  const [data, setData] = useState([])

    if (!userData) {
    return (
      <div>
        <h1 className="page_header">Orders</h1>
        <p className="font-satoshi text-gray-500 mt-5">Loading your orders...</p>
      </div>
    )
  }

  const orders = userData.orders ?? []
  console.log(orders);

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className="page_header">Orders</h1>  
      </div>
      <div className="flex flex-col gap-5 lg:gap-7 mt-5">
         <OrderItem order={orders}/>
        </div>
    </div>
  )
}

export default Orders
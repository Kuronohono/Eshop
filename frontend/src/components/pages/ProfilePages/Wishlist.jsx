import React from 'react'
import WishlistComponent from '../../OtherComponents/CardComponent/WishlistComponent'

const Wishlist = ({ userData }) => {
  
  if (!userData) {
    return (
      <div>
        <h1 className="page_header">Wishlist</h1>
        <p className="font-satoshi text-gray-500 mt-5">Loading your wishlist...</p>
      </div>
    )
  }

  const wishlist = userData.wishlist ?? []

  return (
    <div className='flex flex-col gap-10'>
      
      <div className='flex justify-between'>
        <h1 className="page_header">Wishlist</h1>

      </div>

      {wishlist.length === 0 ? (
        <p className="font-satoshi text-gray-500 mt-5">Your wishlist is empty. Try adding in some products.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-7 mt-5">
          {wishlist.map((product) => (
            <div key={product.id}>
              <WishlistComponent product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist

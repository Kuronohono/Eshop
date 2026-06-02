import React, { useEffect, useState } from 'react'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const [loading, setLoading] = useState(true)
  const [cart_products, setCartProducts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null)
  const promoDiscount = location.state?.promoDiscount ?? 0;
  const [AppliedPromo, setAppliedPromo] = useState(
    promoDiscount !== null &&
    promoDiscount !== undefined &&
    promoDiscount !== 0 &&
    promoDiscount !== ""
  );

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  })


    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        if (!token) {
            localStorage.setItem("cartCount", "0");
            window.dispatchEvent(new Event("cartUpdated"));
            setLoading(false);
            return;
        }

        fetch("http://localhost:8085/users/me/cart", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || `Failed to load cart (${res.status})`);
                }
                return res.json();
            })
            .then((data) => {
                const items = Array.isArray(data) ? data : [];
                setCartProducts(items);
                localStorage.setItem("cartCount", String(items.length));
                window.dispatchEvent(new Event("cartUpdated"));
            })
            .catch((err) => {
                console.error(err);
                setCartProducts([]);
            })
            .finally(() => setLoading(false));
      }, []);

          const subtotal = cart_products.reduce((sum, item) => {
            const price = (item?.product?.price ?? item?.price ?? 0) * (1 - (item?.product?.discount ?? item?.discount ?? 0) / 100)
            const quantity = item?.quantity ?? 1
            return sum + price * quantity
          }, 0)

    const deliveryFee = cart_products.reduce((sum, item) => sum + (item?.quantity ?? 1) * 20, 0)

    const total = subtotal - (subtotal * promoDiscount / 100) + deliveryFee 

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'zip', 'country']
    const missing = requiredFields.find(field => !formData[field].trim())
    if (missing) {
      setFormError('Please fill in all required fields before continuing.')
      return
    }
    setFormError(null)
    navigate("/Payment", { state: { promoDiscount } })
  }


  return (
    <div className='screen-adapt'>
      <div className='flex flex-col w-full'>
        <Breadcrumb />
        <h1 className="font-integralcf text-[36px]">Checkout</h1>

        <div className='flex flex-col lg:flex-row gap-5'>

        <div className='item_container px-[5%] py-[3%] flex-3'>
          <h2 className="font-satoshibold text-[1.5em] font-medium mb-6">Billing address</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Personal info */}
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex flex-col flex-1">
                <label className="text-sm text-gray-500 mb-1">First name</label>
                <input name="firstName" type="text" placeholder="John"
                  value={formData.firstName} onChange={handleChange} required
                  className="border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-sm text-gray-500 mb-1">Last name</label>
                <input name="lastName" type="text" placeholder="Doe"
                  value={formData.lastName} onChange={handleChange} required
                  className="border rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Email address</label>
              <input name="email" type="email" placeholder="john@example.com"
                value={formData.email} onChange={handleChange} required
                className="border rounded-lg px-3 py-2 text-sm" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Phone number</label>
              <input name="phone" type="tel" placeholder="+1 (555) 000-0000"
                value={formData.phone} onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm" />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Street address</label>
              <input name="address" type="text" placeholder="123 Main Street"
                value={formData.address} onChange={handleChange} required
                className="border rounded-lg px-3 py-2 text-sm" />
            </div>


            <div className="flex gap-3 flex-col lg:flex-row">
              <div className="flex flex-col flex-1">
                <label className="text-sm text-gray-500 mb-1">City</label>
                <input name="city" type="text" placeholder="Athens"
                  value={formData.city} onChange={handleChange} required
                  className="border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-sm text-gray-500 mb-1">ZIP / postal code</label>
                <input name="zip" type="text" placeholder="10001"
                  value={formData.zip} onChange={handleChange} required
                  className="border rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>

            <div className="flex gap-3">
              
              <div className="flex flex-col flex-1">
                <label className="text-sm text-gray-500 mb-1">Country</label>
                <select name="country" value={formData.country} onChange={handleChange} required
                  className="border rounded-lg px-3 py-2 text-sm bg-white">
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="GR">Greece</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>

          </form>
        </div>

            <div className='item_container flex-2 px-[2%] py-[2%]'>
                    <h2 className="font-satoshibold text-[1.5em] font-medium mb-6">Details</h2>
                    
                    <div className='flex flex-col gap-5 w-full'>
                      {
                        cart_products.map( (product) => (
                          <div key={product.id} className='grid grid-cols-3 w-full items-center text-center '>
                            <h1 className='checkout_h1 text-start'>{product?.product?.name}</h1>
                            <h1 className='checkout_h1'>{product.quantity}</h1>
                            <h1 className='checkout_h1'>{product.product.price}€</h1>
                          </div>
                        ) )
                     }

                      <div className='w-full h-0 border border-black/30'/>

                      <div className='flex flex-col gap-5'>
                        <div className="flex justify-between items-center">
                            <span className="cart_details">Subtotal</span>
                            <span className="cart_details_data">{subtotal.toFixed(2)}€</span>
                        </div>

                         {AppliedPromo && (
                            <div className="flex justify-between items-center">
                                <span className="cart_details">Promo ({promoDiscount}% off)</span>
                                <span className="cart_details_data_disc">-{(subtotal * promoDiscount / 100).toFixed(2)}€</span>
                            </div>
                        )}

                         <div className="flex justify-between items-center">
                            <span className="cart_details">Delivery Fee</span>
                            <span className="cart_details_data">{deliveryFee.toFixed(2)}€</span>
                        </div>

                      </div>
                      <button type="submit" className="cart_checkout_btn text-center w-full block" onClick={handleSubmit}> 
                        Confirm
                      </button>
                      {formError && (
                        <p className="text-red-500 text-sm font-medium">
                          {formError}
                        </p>
                      )}
                    </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
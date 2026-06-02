import React, { useState } from 'react'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import { useLocation, useNavigate } from 'react-router-dom'

const PAYMENT_METHODS = [
  { id: 'card',   label: 'Credit / Debit Card',  icon: '💳' },
]

const Payment = () => {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { promoDiscount } = location.state ?? {}

  const [selected,  setSelected]  = useState('card')
  const [cardData,  setCardData]  = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [formError, setFormError] = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [success,   setSuccess]   = useState(false)

  const handleCardChange = (e) => {
    let { name, value } = e.target

    // Auto-format card number  →  1234 5678 9012 3456
    if (name === 'number') {
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    }
    // Auto-format expiry  →  MM/YY
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').slice(0, 4)
      if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2)
    }
    // CVV max 4 digits
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }

    setCardData(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    if (selected === 'card') {
      const raw = cardData.number.replace(/\s/g, '')
      if (raw.length < 16)         return 'Enter a valid 16-digit card number.'
      if (!cardData.name.trim())   return 'Enter the cardholder name.'
      if (cardData.expiry.length < 5) return 'Enter a valid expiry date (MM/YY).'
      if (cardData.cvv.length < 3) return 'Enter a valid CVV.'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const error = validate()
    if (error) { setFormError(error); return }

    setFormError(null)
    setLoading(true)

    try {
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1800))

        // Place the order (clears cart + creates order record)
        const token = localStorage.getItem('token')
        const res = await fetch('http://localhost:8085/orders/place', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
        })

        if (!res.ok) throw new Error(await res.text())

        // Clear cart count in UI
        localStorage.setItem('cartCount', '0')
        window.dispatchEvent(new Event('cartUpdated'))

        setSuccess(true)
        setTimeout(() => navigate('/'), 2400)

    } catch (err) {
        setFormError('Payment failed: ' + err.message)
    } finally {
        setLoading(false)
    }
}

  // ── Success state ─────────────────────────────────────────
  if (success) return (
    <div className="screen-adapt flex items-center justify-center min-h-[60vh]">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="text-6xl">✅</div>
        <h2 className="font-satoshibold text-2xl">Payment Confirmed!</h2>
        <p className="text-gray-500 text-sm">Redirecting to your order…</p>
      </div>
    </div>
  )

  return (
    <div className="screen-adapt">
      <div className="flex flex-col w-full">
        <Breadcrumb />
        <h1 className="font-integralcf text-[36px]">Payment</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-5">

          {/* ── Left: method selector + card form ── */}
          <div className="item_container px-[5%] py-[3%] flex-3 flex flex-col gap-6">

            <h2 className="font-satoshibold text-[1.5em] font-medium">Payment method</h2>

            {/* Method tiles */}
            <div className="grid grid-cols-2 gap-3">
              {PAYMENT_METHODS.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => { setSelected(m.id); setFormError(null) }}
                  className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 text-sm font-medium transition-all
                    ${selected === m.id
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-400 text-gray-700'}`}
                >
                  <span className="text-xl">{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>

            {/* Card form — only shown when 'card' is selected */}
            {selected === 'card' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">Card number</label>
                  <input
                    name="number" type="text" placeholder="1234 5678 9012 3456"
                    value={cardData.number} onChange={handleCardChange}
                    className="border rounded-lg px-3 py-2 text-sm tracking-widest"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">Cardholder name</label>
                  <input
                    name="name" type="text" placeholder="John Doe"
                    value={cardData.name} onChange={handleCardChange}
                    className="border rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col flex-1">
                    <label className="text-sm text-gray-500 mb-1">Expiry</label>
                    <input
                      name="expiry" type="text" placeholder="MM/YY"
                      value={cardData.expiry} onChange={handleCardChange}
                      className="border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="text-sm text-gray-500 mb-1">CVV</label>
                    <input
                      name="cvv" type="password" placeholder="•••"
                      value={cardData.cvv} onChange={handleCardChange}
                      className="border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Non-card placeholder */}
            {selected !== 'card' && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm">
                You'll be redirected to{' '}
                <span className="font-semibold text-gray-600">
                  {PAYMENT_METHODS.find(m => m.id === selected)?.label}
                </span>{' '}
                to complete your payment.
              </div>
            )}

          </div>

          {/* ── Right: summary + submit ── */}
          <div className="item_container flex-2 px-[2%] py-[2%] flex flex-col gap-5">
            <h2 className="font-satoshibold text-[1.5em] font-medium">Summary</h2>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="cart_details">Method</span>
                <span className="cart_details_data font-medium">
                  {PAYMENT_METHODS.find(m => m.id === selected)?.label}
                </span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="cart_details">Promo</span>
                  <span className="cart_details_data_disc">-{promoDiscount}%</span>
                </div>
              )}
            </div>

            <div className="w-full h-0 border border-black/30" />

            {formError && (
              <p className="text-red-500 text-sm font-medium">{formError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="cart_checkout_btn text-center w-full block disabled:opacity-60"
            >
              {loading ? 'Processing…' : 'Pay now'}
            </button>

            <p className="text-xs text-gray-400 text-center">
            This is a mock payment — no real charge will be made.
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Payment
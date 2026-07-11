import { useContext, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
}

const PlaceOrder = () => {
  const { products, cartItems, currency, delivery_fee, placeOrder } = useContext(ShopContext)
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [paymentMethod, setPaymentMethod] = useState('cod')

  const cartData = useMemo(
    () =>
      Object.entries(cartItems).flatMap(([productId, sizes]) => {
        const product = products.find((item) => item._id === productId)
        if (!product) return []

        return Object.entries(sizes)
          .filter(([, quantity]) => quantity > 0)
          .map(([size, quantity]) => ({ product, size, quantity }))
      }),
    [cartItems, products]
  )

  const subtotal = cartData.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const order = placeOrder({ customer: form, paymentMethod })
    if (order) navigate('/orders')
  }

  if (cartData.length === 0) {
    return (
      <section className='border-t border-stone-200 py-24 text-center sm:py-32'>
        <p className='text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400'>Checkout</p>
        <h1 className='mt-4 text-3xl font-medium tracking-tight text-stone-950'>Your cart is empty</h1>
        <p className='mt-3 text-sm text-stone-500'>Add products before continuing to checkout.</p>
        <Link to='/collection' className='mt-8 inline-block bg-stone-950 px-9 py-4 text-[10px] font-medium tracking-[0.2em] text-white'>
          EXPLORE COLLECTION
        </Link>
      </section>
    )
  }

  const inputClass = 'w-full border border-stone-300 bg-white px-4 py-3.5 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900'

  return (
    <form onSubmit={handleSubmit} className='border-t border-stone-200 pb-24 pt-10 sm:pt-14'>
      <div className='mb-10 text-2xl sm:mb-12 sm:text-3xl'>
        <Title text1='SECURE' text2='CHECKOUT' />
        <p className='mt-1 text-sm text-stone-500'>Complete your delivery and payment details.</p>
      </div>

      <div className='grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16'>
        <div>
          <section>
            <div className='mb-6 flex items-center gap-4'>
              <span className='flex h-8 w-8 items-center justify-center rounded-full bg-stone-950 text-xs text-white'>1</span>
              <h2 className='text-xs font-medium uppercase tracking-[0.18em] text-stone-950'>Delivery information</h2>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <input required className={inputClass} name='firstName' value={form.firstName} onChange={updateField} placeholder='First name' autoComplete='given-name' />
              <input required className={inputClass} name='lastName' value={form.lastName} onChange={updateField} placeholder='Last name' autoComplete='family-name' />
              <input required className={inputClass} type='email' name='email' value={form.email} onChange={updateField} placeholder='Email address' autoComplete='email' />
              <input required className={inputClass} type='tel' name='phone' value={form.phone} onChange={updateField} placeholder='Phone number' autoComplete='tel' />
              <input required className={`${inputClass} sm:col-span-2`} name='street' value={form.street} onChange={updateField} placeholder='Street address' autoComplete='street-address' />
              <input required className={inputClass} name='city' value={form.city} onChange={updateField} placeholder='City' autoComplete='address-level2' />
              <input required className={inputClass} name='state' value={form.state} onChange={updateField} placeholder='State / Province' autoComplete='address-level1' />
              <input required className={inputClass} name='zipCode' value={form.zipCode} onChange={updateField} placeholder='ZIP / Postal code' autoComplete='postal-code' />
              <input required className={inputClass} name='country' value={form.country} onChange={updateField} placeholder='Country' autoComplete='country-name' />
            </div>
          </section>

          <section className='mt-12 border-t border-stone-200 pt-10'>
            <div className='mb-6 flex items-center gap-4'>
              <span className='flex h-8 w-8 items-center justify-center rounded-full bg-stone-950 text-xs text-white'>2</span>
              <div>
                <h2 className='text-xs font-medium uppercase tracking-[0.18em] text-stone-950'>Payment method</h2>
                <p className='mt-1 text-xs text-stone-400'>Demo checkout — no real payment is processed.</p>
              </div>
            </div>

            <div className='grid gap-3 sm:grid-cols-3'>
              {[
                { id: 'stripe', label: 'Stripe', image: assets.stripe_logo },
                { id: 'razorpay', label: 'Razorpay', image: assets.razorpay_logo },
                { id: 'cod', label: 'Cash on delivery' },
              ].map((method) => (
                <button
                  key={method.id}
                  type='button'
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex min-h-16 items-center justify-center gap-3 border px-4 py-3 transition-all ${
                    paymentMethod === method.id
                      ? 'border-stone-950 bg-[#f7f5f2] shadow-sm'
                      : 'border-stone-300 bg-white hover:border-stone-600'
                  }`}
                  aria-pressed={paymentMethod === method.id}
                >
                  <span className={`h-3 w-3 rounded-full border ${paymentMethod === method.id ? 'border-[4px] border-stone-950' : 'border-stone-400'}`}></span>
                  {method.image ? <img className='max-h-5 max-w-20 object-contain' src={method.image} alt={method.label} /> : <span className='text-[10px] font-medium uppercase tracking-[0.12em]'>{method.label}</span>}
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className='bg-[#f7f5f2] p-6 sm:p-8 lg:sticky lg:top-8'>
          <h2 className='text-xs font-medium uppercase tracking-[0.2em] text-stone-950'>Order summary</h2>
          <div className='mt-6 max-h-72 space-y-5 overflow-y-auto border-b border-stone-300 pb-6'>
            {cartData.map(({ product, size, quantity }) => (
              <div key={`${product._id}-${size}`} className='flex gap-4'>
                <div className='relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-stone-200'>
                  <img className='h-full w-full object-cover' src={product.image[0]} alt={product.name} />
                  <span className='absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-950 px-1 text-[9px] text-white'>{quantity}</span>
                </div>
                <div className='min-w-0 flex-1 py-1'>
                  <p className='line-clamp-2 text-xs font-medium leading-5 text-stone-900'>{product.name}</p>
                  <p className='mt-1 text-[10px] text-stone-500'>Size {size}</p>
                </div>
                <p className='py-1 text-xs font-medium'>{currency}{product.price * quantity}</p>
              </div>
            ))}
          </div>

          <div className='space-y-4 border-b border-stone-300 py-6 text-sm'>
            <div className='flex justify-between text-stone-600'><span>Subtotal</span><span>{currency}{subtotal}</span></div>
            <div className='flex justify-between text-stone-600'><span>Shipping</span><span>{currency}{delivery_fee}</span></div>
          </div>
          <div className='flex items-end justify-between py-6'>
            <div><p className='text-xs font-medium uppercase tracking-[0.14em]'>Total</p><p className='mt-1 text-[10px] text-stone-400'>Taxes included</p></div>
            <p className='text-2xl font-medium'>{currency}{subtotal + delivery_fee}</p>
          </div>
          <button type='submit' className='w-full bg-stone-950 px-8 py-4 text-[10px] font-medium tracking-[0.2em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-stone-800'>
            PLACE ORDER
          </button>
          <p className='mt-4 text-center text-[10px] leading-5 text-stone-400'>By placing your order, you agree to our terms and returns policy.</p>
        </aside>
      </div>
    </form>
  )
}

export default PlaceOrder

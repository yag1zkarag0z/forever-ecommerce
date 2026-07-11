import { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Cart = () => {
  const {
    products,
    currency,
    delivery_fee,
    cartItems,
    updateCartQuantity,
    removeFromCart,
  } = useContext(ShopContext)

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
  const shipping = cartData.length > 0 ? delivery_fee : 0
  const total = subtotal + shipping

  if (cartData.length === 0) {
    return (
      <section className='border-t border-stone-200 py-24 text-center sm:py-32'>
        <p className='text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400'>Your selection</p>
        <h1 className='mt-4 text-3xl font-medium tracking-tight text-stone-950'>Your cart is empty</h1>
        <p className='mx-auto mt-4 max-w-md text-sm leading-6 text-stone-500'>
          Explore the collection and add your favorite pieces to your cart.
        </p>
        <Link
          to='/collection'
          className='mt-8 inline-block bg-stone-950 px-9 py-4 text-[11px] font-medium tracking-[0.2em] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-md'
        >
          EXPLORE COLLECTION
        </Link>
      </section>
    )
  }

  return (
    <div className='border-t border-stone-200 pb-24 pt-10 sm:pt-14'>
      <div className='mb-10 text-2xl sm:mb-12 sm:text-3xl'>
        <Title text1='YOUR' text2='CART' />
        <p className='mt-1 text-sm text-stone-500'>
          {cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your selection
        </p>
      </div>

      <div className='grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16'>
        <section aria-label='Cart items'>
          <div className='hidden border-b border-stone-300 pb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400 sm:grid sm:grid-cols-[1fr_150px_90px]'>
            <span>Product</span>
            <span className='text-center'>Quantity</span>
            <span className='text-right'>Total</span>
          </div>

          <div className='divide-y divide-stone-200'>
            {cartData.map(({ product, size, quantity }) => (
              <article
                key={`${product._id}-${size}`}
                className='grid gap-5 py-6 sm:grid-cols-[1fr_150px_90px] sm:items-center sm:py-7'
              >
                <div className='flex min-w-0 gap-4 sm:gap-5'>
                  <Link
                    to={`/product/${product._id}`}
                    className='group aspect-[3/4] w-24 shrink-0 overflow-hidden bg-[#f3f1ee] sm:w-28'
                  >
                    <img
                      className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]'
                      src={product.image[0]}
                      alt={product.name}
                    />
                  </Link>

                  <div className='flex min-w-0 flex-1 flex-col justify-center'>
                    <p className='text-[9px] uppercase tracking-[0.18em] text-stone-400'>
                      {product.category} / {product.subCategory}
                    </p>
                    <Link
                      to={`/product/${product._id}`}
                      className='mt-2 line-clamp-2 text-sm font-medium leading-5 text-stone-900 transition-colors hover:text-stone-500 sm:text-base'
                    >
                      {product.name}
                    </Link>
                    <div className='mt-3 flex items-center gap-3 text-xs text-stone-500'>
                      <span>{currency}{product.price}</span>
                      <span className='h-3 w-px bg-stone-300'></span>
                      <span>Size {size}</span>
                    </div>
                    <button
                      type='button'
                      onClick={() => removeFromCart(product._id, size)}
                      className='mt-4 flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-stone-400 transition-colors hover:text-red-700 sm:hidden'
                    >
                      <img className='w-3' src={assets.bin_icon} alt='' /> Remove
                    </button>
                  </div>
                </div>

                <div className='flex items-center justify-between border-t border-stone-100 pt-4 sm:justify-center sm:border-0 sm:pt-0'>
                  <span className='text-[10px] uppercase tracking-[0.14em] text-stone-400 sm:hidden'>Quantity</span>
                  <div className='flex h-10 items-center border border-stone-300 bg-white'>
                    <button
                      type='button'
                      className='h-full w-9 text-lg text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-950'
                      onClick={() => updateCartQuantity(product._id, size, quantity - 1)}
                      aria-label={`Decrease ${product.name} quantity`}
                    >
                      −
                    </button>
                    <input
                      className='h-full w-10 border-x border-stone-200 text-center text-xs outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                      type='number'
                      min='1'
                      value={quantity}
                      onChange={(event) => {
                        const nextQuantity = Number(event.target.value)
                        if (Number.isInteger(nextQuantity) && nextQuantity > 0) {
                          updateCartQuantity(product._id, size, nextQuantity)
                        }
                      }}
                      aria-label={`${product.name} quantity`}
                    />
                    <button
                      type='button'
                      className='h-full w-9 text-lg text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-950'
                      onClick={() => updateCartQuantity(product._id, size, quantity + 1)}
                      aria-label={`Increase ${product.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className='hidden text-right sm:block'>
                  <p className='text-sm font-medium text-stone-950'>
                    {currency}{product.price * quantity}
                  </p>
                  <button
                    type='button'
                    onClick={() => removeFromCart(product._id, size)}
                    className='ml-auto mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-stone-400 transition-colors hover:text-red-700'
                  >
                    <img className='w-3' src={assets.bin_icon} alt='' /> Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <Link
            to='/collection'
            className='mt-5 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-stone-950'
          >
            <span aria-hidden='true'>←</span> Continue shopping
          </Link>
        </section>

        <aside className='bg-[#f7f5f2] p-6 sm:p-8 lg:sticky lg:top-8' aria-label='Order summary'>
          <p className='text-xs font-medium uppercase tracking-[0.2em] text-stone-900'>Order summary</p>

          <div className='mt-7 space-y-4 border-b border-stone-300 pb-6 text-sm'>
            <div className='flex justify-between text-stone-600'>
              <span>Subtotal</span>
              <span className='font-medium text-stone-900'>{currency}{subtotal}</span>
            </div>
            <div className='flex justify-between text-stone-600'>
              <span>Shipping</span>
              <span className='font-medium text-stone-900'>{currency}{shipping}</span>
            </div>
          </div>

          <div className='flex items-end justify-between py-6'>
            <div>
              <p className='text-xs font-medium uppercase tracking-[0.14em] text-stone-900'>Total</p>
              <p className='mt-1 text-[10px] text-stone-400'>Taxes included</p>
            </div>
            <p className='text-2xl font-medium tracking-tight text-stone-950'>{currency}{total}</p>
          </div>

          <Link
            to='/place-order'
            className='block w-full bg-stone-950 px-8 py-4 text-center text-[10px] font-medium tracking-[0.2em] text-white shadow-[0_12px_28px_rgba(28,25,23,0.16)] transition-all hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-[0_16px_34px_rgba(28,25,23,0.22)]'
          >
            PROCEED TO CHECKOUT
          </Link>

          <div className='mt-5 flex items-center justify-center gap-2 text-[10px] text-stone-400'>
            <span className='h-1.5 w-1.5 rounded-full bg-emerald-500'></span>
            Secure checkout
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Cart

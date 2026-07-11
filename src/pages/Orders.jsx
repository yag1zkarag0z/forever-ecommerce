import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const paymentLabels = {
  cod: 'Cash on delivery',
  stripe: 'Stripe',
  razorpay: 'Razorpay',
}

const Orders = () => {
  const { orders, currency } = useContext(ShopContext)

  if (orders.length === 0) {
    return (
      <section className='border-t border-stone-200 py-24 text-center sm:py-32'>
        <p className='text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400'>Order history</p>
        <h1 className='mt-4 text-3xl font-medium tracking-tight text-stone-950'>No orders yet</h1>
        <p className='mx-auto mt-4 max-w-md text-sm leading-6 text-stone-500'>
          Once you place an order, its products and delivery status will appear here.
        </p>
        <Link to='/collection' className='mt-8 inline-block bg-stone-950 px-9 py-4 text-[10px] font-medium tracking-[0.2em] text-white transition-colors hover:bg-stone-800'>
          START SHOPPING
        </Link>
      </section>
    )
  }

  return (
    <div className='border-t border-stone-200 pb-24 pt-10 sm:pt-14'>
      <div className='mb-10 text-2xl sm:mb-12 sm:text-3xl'>
        <Title text1='MY' text2='ORDERS' />
        <p className='mt-1 text-sm text-stone-500'>Review your recent purchases and delivery status.</p>
      </div>

      <div className='space-y-8'>
        {orders.map((order) => (
          <article key={order.id} className='border border-stone-200 bg-white'>
            <header className='grid gap-4 bg-[#f7f5f2] px-5 py-5 text-xs sm:grid-cols-4 sm:px-7'>
              <div>
                <p className='text-[9px] uppercase tracking-[0.16em] text-stone-400'>Order number</p>
                <p className='mt-1 font-medium text-stone-900'>{order.id}</p>
              </div>
              <div>
                <p className='text-[9px] uppercase tracking-[0.16em] text-stone-400'>Date placed</p>
                <p className='mt-1 text-stone-700'>{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(order.date))}</p>
              </div>
              <div>
                <p className='text-[9px] uppercase tracking-[0.16em] text-stone-400'>Payment</p>
                <p className='mt-1 text-stone-700'>{paymentLabels[order.paymentMethod] || order.paymentMethod}</p>
              </div>
              <div className='sm:text-right'>
                <p className='text-[9px] uppercase tracking-[0.16em] text-stone-400'>Order total</p>
                <p className='mt-1 text-base font-medium text-stone-950'>{currency}{order.total}</p>
              </div>
            </header>

            <div className='divide-y divide-stone-200 px-5 sm:px-7'>
              {order.items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className='grid gap-5 py-6 sm:grid-cols-[1fr_auto] sm:items-center'>
                  <div className='flex min-w-0 gap-4 sm:gap-5'>
                    <Link to={`/product/${item.productId}`} className='aspect-[3/4] w-20 shrink-0 overflow-hidden bg-stone-100'>
                      <img className='h-full w-full object-cover' src={item.image} alt={item.name} />
                    </Link>
                    <div className='flex min-w-0 flex-col justify-center'>
                      <Link to={`/product/${item.productId}`} className='text-sm font-medium text-stone-900 transition-colors hover:text-stone-500 sm:text-base'>{item.name}</Link>
                      <p className='mt-2 text-xs text-stone-500'>{currency}{item.price} · Size {item.size} · Qty {item.quantity}</p>
                    </div>
                  </div>

                  <div className='flex items-center justify-between gap-8 border-t border-stone-100 pt-4 sm:border-0 sm:pt-0'>
                    <div>
                      <p className='flex items-center gap-2 text-xs font-medium text-stone-800'>
                        <span className='h-2 w-2 rounded-full bg-emerald-500'></span>
                        {order.status}
                      </p>
                      <p className='mt-1 pl-4 text-[10px] text-stone-400'>We are preparing your item.</p>
                    </div>
                    <Link to={`/product/${item.productId}`} className='border border-stone-300 px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.14em] text-stone-700 transition-colors hover:border-stone-950 hover:bg-stone-950 hover:text-white'>
                      View item
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <footer className='flex flex-col gap-2 border-t border-stone-200 px-5 py-4 text-[10px] text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:px-7'>
              <p>Delivering to {order.customer.city}, {order.customer.country}</p>
              <p>Shipping: {currency}{order.delivery}</p>
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Orders

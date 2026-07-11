import React from 'react'

const NewsLetter = () => {

    const onSubmitHandler = (event) =>  {
          event.preventDefault();
  }
  return (
    <section className='bg-stone-900 px-5 py-16 text-center text-white sm:px-10 sm:py-20'>
      <p className='prata-regular text-2xl sm:text-3xl'>A little something for your inbox.</p>
      <p className='mx-auto mt-4 max-w-lg text-sm leading-6 text-stone-400'>
        Subscribe for new arrivals, private offers and receive 20% off your first order.
      </p>
      <form onSubmit={onSubmitHandler} className='mx-auto mt-8 flex w-full max-w-xl border-b border-stone-500'>
        <label htmlFor='newsletter-email' className='sr-only'>Email address</label>
        <input id='newsletter-email' className='min-w-0 flex-1 bg-transparent px-1 py-4 text-sm text-white outline-none placeholder:text-stone-500' type='email' placeholder='Email address' required/>
        <button className='px-3 py-4 text-xs font-semibold tracking-[0.18em] transition-colors hover:text-stone-300 sm:px-6' type='submit'>SUBSCRIBE</button>
      </form>
    </section>
  )
}

export default NewsLetter

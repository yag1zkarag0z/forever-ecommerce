import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
const OurPolicy = () => {
  return (
    <section className='grid grid-cols-1 border-y border-stone-200 py-4 text-center text-sm text-stone-700 sm:grid-cols-3 sm:py-12'>
      
      <div className='px-6 py-8 sm:border-r sm:border-stone-200 sm:py-4'>
        <img src={assets.exchange_icon} className='mx-auto mb-5 w-10' alt='' />
        <p className='mb-2 font-semibold tracking-wide'>Easy Exchange</p>
        <p className='text-sm leading-6 text-stone-500'>A simple, hassle-free exchange process.</p>
      </div>
      <div className='border-y border-stone-200 px-6 py-8 sm:border-y-0 sm:border-r sm:py-4'>
        <img src={assets.quality_icon} className='mx-auto mb-5 w-10' alt='' />
        <p className='mb-2 font-semibold tracking-wide'>7-Day Returns</p>
        <p className='text-sm leading-6 text-stone-500'>Shop confidently with easy returns.</p>
      </div>
      <div className='px-6 py-8 sm:py-4'>
        <img src={assets.support_img} className='mx-auto mb-5 w-10' alt='' />
        <p className='mb-2 font-semibold tracking-wide'>Dedicated Support</p>
        <p className='text-sm leading-6 text-stone-500'>Here to help whenever you need us.</p>
      </div>
    </section>
  )
}

export default OurPolicy

import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <section className='my-6 flex min-h-[520px] flex-col overflow-hidden bg-[#f1ede7] sm:my-8 sm:flex-row lg:min-h-[620px]'>
      {/* Hero Left Side */}
      <div className='flex w-full items-center px-8 py-16 sm:w-1/2 sm:px-10 sm:py-0 lg:px-20'>
        <div className='max-w-md text-stone-800'>
            <div className='flex items-center gap-3'>
                <span className='h-px w-8 bg-stone-700 md:w-11'></span>
                <p className='text-xs font-semibold tracking-[0.22em] md:text-sm'>NEW SEASON</p>
            </div>
            <h1 className='prata-regular py-5 text-4xl leading-tight sm:text-5xl lg:text-6xl'>Quiet confidence,<br />made to last.</h1>
            <p className='mb-8 max-w-sm text-sm leading-7 text-stone-600 sm:text-base'>Discover considered essentials designed for everyday wear and effortless combinations.</p>
            <Link to='/collection' className='inline-flex items-center gap-4 border-b border-stone-900 pb-1 text-xs font-semibold tracking-[0.18em] transition-all hover:gap-6'>
              SHOP THE COLLECTION
              <span aria-hidden='true'>→</span>
            </Link>
        </div>
      </div>
      {/* Hero Right Side */}
      <div className='w-full overflow-hidden sm:w-1/2'>
        <img src={assets.hero_img} className='h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]' alt='Latest fashion collection' />
      </div>
    </section>
  )
}

export default Hero

import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <footer className='pt-16 sm:pt-20'>
      <div className='grid gap-12 border-b border-stone-200 pb-14 text-sm sm:grid-cols-[2fr_1fr_1fr] lg:gap-20'>
        <div className='max-w-md'>
          <img src={assets.logo} className='mb-6 w-36' alt='Forever logo' />
          <p className='leading-7 text-stone-500'>
            Thoughtfully selected pieces for a wardrobe that feels effortless, timeless and entirely your own.
          </p>
        </div>

        <div>
          <p className='mb-5 text-xs font-semibold tracking-[0.18em] text-stone-950'>EXPLORE</p>
          <ul className='space-y-3 text-stone-500'>
            <li><Link className='transition-colors hover:text-stone-950' to='/'>Home</Link></li>
            <li><Link className='transition-colors hover:text-stone-950' to='/collection'>Collection</Link></li>
            <li><Link className='transition-colors hover:text-stone-950' to='/about'>About</Link></li>
            <li><Link className='transition-colors hover:text-stone-950' to='/contact'>Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className='mb-5 text-xs font-semibold tracking-[0.18em] text-stone-950'>CONNECT</p>
          <a
            href='https://www.linkedin.com/in/yagiz-karagoz-b18820358/'
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-3 text-stone-500 transition-colors hover:text-stone-950'
          >
            <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
              <path d='M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z'/>
            </svg>
            <span>Yağız Karagöz</span>
          </a>
        </div>
      </div>

      <div className='flex flex-col gap-2 py-6 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between'>
        <p>© {new Date().getFullYear()} Forever. All rights reserved.</p>
        <p>Designed & developed by Yağız Karagöz</p>
      </div>
    </footer>
  )
}

export default Footer

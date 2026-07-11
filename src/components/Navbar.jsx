import { assets } from '../../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {

  const [visible,setVisible] = useState(false);

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/collection', label: 'COLLECTION' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
  ]

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt='Logo' />
      </Link>

      <ul className='hidden sm:flex items-center gap-5 text-sm text-gray-700'>
        {navLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className='flex flex-col items-center gap-1 transition-colors hover:text-black'
          >
            <p>{item.label}</p>
            <hr className='hidden h-[1.5px] w-2/4 border-none bg-gray-700' />
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} className='w-5 cursor-pointer' alt='Search' />

        <div className='group relative'>
          <img src={assets.profile_icon} className='w-5 cursor-pointer' alt='Profile' />

          <div className='absolute right-0 z-10 hidden pt-4 group-hover:block'>
            <div className='flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500 shadow-sm'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <Link to='/orders' className='cursor-pointer hover:text-black'>Orders</Link>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='Cart' />
          <p className='absolute bottom-[-5px] right-[-5px] aspect-square w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white'>
            0
          </p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='Menu' />
      </div>

      {/*  Sidebar menu for small screens  */}
      <div className={`absolute top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex cursor-pointer items-center gap-4 p-3'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
            <p>Back</p>
          </div>

          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              onClick={() => setVisible(false)}
              className='border py-2 pl-6'
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar

import { assets } from '../../assets/frontend_assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

  const [visible,setVisible] = useState(false);
  const { setShowSearch, getCartCount, user, logoutUser } = useContext(ShopContext)
  const navigate = useNavigate()

  const openSearch = () => {
    setShowSearch(true)
    navigate('/collection')
  }

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/collection', label: 'COLLECTION' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
  ]

  return (
    <>
    <header className='relative z-30 flex items-center justify-between border-b border-stone-200 bg-[#fcfcfb]/95 py-5 font-medium backdrop-blur-md sm:py-6'>
      <Link to='/' aria-label='Go to home page'>
        <img src={assets.logo} className='w-32 sm:w-36' alt='Forever logo' />
      </Link>

      <nav className='hidden sm:block' aria-label='Main navigation'>
      <ul className='flex items-center gap-7 text-xs tracking-[0.14em] text-stone-600 lg:gap-10'>
        {navLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className='flex flex-col items-center gap-1.5 transition-colors duration-200 hover:text-stone-950'
          >
            <p>{item.label}</p>
            <hr className='hidden h-px w-1/2 border-none bg-stone-900' />
          </NavLink>
        ))}
      </ul>
      </nav>

      <div className='flex items-center gap-4 sm:gap-5'>
        <button onClick={openSearch} className='rounded-full p-2 transition-colors hover:bg-stone-100' aria-label='Search'>
          <img src={assets.search_icon} className='w-[18px]' alt='' />
        </button>

        <div className='group relative'>
          <button className='rounded-full p-2 transition-colors hover:bg-stone-100' aria-label='Open profile menu'>
            <img src={assets.profile_icon} className='w-[18px]' alt='' />
          </button>

          <div className='absolute right-0 z-10 hidden pt-3 group-hover:block'>
            <div className='flex w-48 flex-col gap-1 rounded-sm border border-stone-200 bg-white p-2 text-sm text-stone-600 shadow-[0_18px_45px_rgba(28,25,23,0.12)]'>
              {user ? (
                <div className='border-b border-stone-100 px-3 py-2'>
                  <p className='truncate text-xs font-medium text-stone-900'>{user.name}</p>
                  <p className='mt-0.5 truncate text-[10px] text-stone-400'>{user.email}</p>
                </div>
              ) : (
                <Link to='/login' className='cursor-pointer px-3 py-2 transition-colors hover:bg-stone-50 hover:text-black'>Sign In</Link>
              )}
              <Link to='/orders' className='cursor-pointer px-3 py-2 transition-colors hover:bg-stone-50 hover:text-black'>Orders</Link>
              {user && <button type='button' onClick={logoutUser} className='cursor-pointer px-3 py-2 text-left transition-colors hover:bg-stone-50 hover:text-black'>Logout</button>}
            </div>
          </div>
        </div>

        <Link to='/cart' className='relative rounded-full p-2 transition-colors hover:bg-stone-100' aria-label='Shopping cart'>
          <img src={assets.cart_icon} className='w-[18px] min-w-[18px]' alt='' />
          <p className='absolute bottom-0 right-0 aspect-square w-4 rounded-full bg-stone-950 text-center text-[8px] leading-4 text-white'>
            {getCartCount()}
          </p>
        </Link>

        <button onClick={() => setVisible(true)} className='rounded-full p-2 transition-colors hover:bg-stone-100 sm:hidden' aria-label='Open menu'>
          <img src={assets.menu_icon} className='w-[18px]' alt='' />
        </button>
      </div>

    </header>

      {/* Sidebar menu for small screens */}
      <aside className={`fixed inset-0 z-50 h-dvh overflow-y-auto bg-[#fcfcfb] shadow-2xl transition-transform duration-300 ease-out sm:hidden ${visible ? 'translate-x-0' : 'pointer-events-none translate-x-full'}`} aria-hidden={!visible}>
        <div className='flex min-h-dvh flex-col text-stone-700'>
          <button onClick={() => setVisible(false)} className='flex items-center gap-4 border-b border-stone-200 px-6 py-6 text-sm tracking-wide'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
            <p>Back</p>
          </button>

          <nav className='flex flex-1 flex-col px-6 py-8' aria-label='Mobile navigation'>
          <p className='mb-4 text-[9px] font-medium uppercase tracking-[0.24em] text-stone-400'>Navigation</p>
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              onClick={() => setVisible(false)}
              className='border-b border-stone-200 py-5 text-sm tracking-[0.16em] transition-colors hover:text-black'
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}

          <div className='mt-auto border-t border-stone-200 pt-6 text-xs text-stone-500'>
            <Link onClick={() => setVisible(false)} to={user ? '/orders' : '/login'} className='block py-3 tracking-[0.12em]'>
              {user ? 'MY ORDERS' : 'SIGN IN'}
            </Link>
            <Link onClick={() => setVisible(false)} to='/cart' className='flex items-center justify-between py-3 tracking-[0.12em]'>
              <span>SHOPPING CART</span>
              <span className='flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-950 px-1 text-[9px] text-white'>{getCartCount()}</span>
            </Link>
          </div>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Navbar

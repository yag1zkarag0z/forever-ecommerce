import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const location = useLocation()

  if (!showSearch || location.pathname !== '/collection') return null

  return (
    <div className='border-b border-stone-200 bg-stone-50 py-5 text-center'>
      <form
        className='mx-auto flex w-full max-w-xl items-center gap-3 px-4'
        role='search'
        onSubmit={(event) => event.preventDefault()}
      >
        <div className='flex flex-1 items-center rounded-full border border-stone-400 bg-white px-5 py-2.5'>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setShowSearch(false)
            }}
            className='flex-1 bg-transparent text-sm outline-none'
            type='search'
            placeholder='Search products...'
            aria-label='Search products'
            autoFocus
          />
          <img className='w-4' src={assets.search_icon} alt='' />
        </div>

        <button
          type='button'
          className='rounded-full p-2 transition-colors hover:bg-stone-200'
          onClick={() => setShowSearch(false)}
          aria-label='Close search'
        >
          <img className='w-3' src={assets.cross_icon} alt='' />
        </button>
      </form>
    </div>
  )
}

export default SearchBar

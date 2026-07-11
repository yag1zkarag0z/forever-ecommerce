import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
 
    const { currency } = useContext(ShopContext)
 
    return (
    <article className='group'>
      <Link className='cursor-pointer text-stone-700' to={`/product/${id}`}>
      <div className='aspect-[3/4] overflow-hidden bg-stone-100'>
        <img className='h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]' src={image[0]} alt={name} />
      </div>
      <p className='pb-1 pt-4 text-sm leading-5 text-stone-700 transition-colors group-hover:text-black'>{name}</p>
      <p className='text-sm font-semibold tracking-wide text-stone-950'>{currency}{price}</p>
      </Link>
    </article>
  )
}

export default ProductItem

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const BestSeller = () => {

    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller)
        setBestSeller(bestProduct.slice(0,5))
    }, [products])

  return (
    <section className='border-t border-stone-200 py-16 sm:py-20'>

        <div className='pb-10 text-center text-2xl sm:pb-12 sm:text-3xl'>
          <Title text1='BEST' text2='SELLERS' />
          <p className='mx-auto max-w-xl text-sm leading-6 text-stone-500 sm:text-base'>
            Explore customer favorites designed to bring effortless style and lasting comfort to your wardrobe.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-5'>
          {bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      
    </section>
  )
}

export default BestSeller

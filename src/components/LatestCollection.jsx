import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const LatestCollection = () => {
  
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <section className='py-16 sm:py-20'>
      <div className='pb-10 text-center text-2xl sm:pb-12 sm:text-3xl'>
        <Title text1='LATEST' text2='COLLECTION' />
        <p className='mx-auto max-w-xl text-sm leading-6 text-stone-500 sm:text-base'>
          Discover our newest arrivals, carefully selected to refresh your everyday style.
        </p>
      </div>

      <div className='grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-5'>
        {latestProducts.map((item) => (
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

export default LatestCollection

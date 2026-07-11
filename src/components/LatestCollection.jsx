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
    <>
      <div className='py-8 text-center text-3xl'>
        <Title text1='LATEST' text2='COLLECTION' />
        <p className='m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base'>
          Discover our newest arrivals, carefully selected to refresh your everyday style.
        </p>
      </div>

      <div className='grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
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
    </>
  )
}

export default LatestCollection

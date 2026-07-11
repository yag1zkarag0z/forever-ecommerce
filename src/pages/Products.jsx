import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
import Title from '../components/Title'

const Products = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [sizeError, setSizeError] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const product = useMemo(
    () => products.find((item) => item._id === productId),
    [products, productId]
  )

  const relatedProducts = useMemo(() => {
    if (!product) return []

    return products
      .filter(
        (item) =>
          item._id !== product._id &&
          (item.category === product.category ||
            item.subCategory === product.subCategory)
      )
      .slice(0, 5)
  }, [products, product])

  useEffect(() => {
    setSelectedImage(0)
    setSelectedSize('')
    setSizeError(false)
    setAddedToCart(false)
  }, [productId])

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      return
    }

    addToCart(product._id, selectedSize)
    setSizeError(false)
    setAddedToCart(true)
  }

  if (!product) {
    return (
      <section className='border-t border-stone-200 py-28 text-center sm:py-36'>
        <p className='text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400'>Forever collection</p>
        <h1 className='mt-4 text-2xl font-medium tracking-tight text-stone-900'>Product not found</h1>
        <p className='mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500'>The product may have been removed or the link is incorrect.</p>
        <Link
          to='/collection'
          className='mt-8 inline-block bg-stone-950 px-8 py-3.5 text-[11px] font-medium tracking-[0.18em] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-md'
        >
          BACK TO COLLECTION
        </Link>
      </section>
    )
  }

  return (
    <div className='border-t border-stone-200 pb-24 pt-6 sm:pt-8 lg:pb-28'>
      <nav className='mb-7 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-stone-400 sm:mb-10' aria-label='Breadcrumb'>
        <Link className='transition-colors hover:text-stone-800' to='/'>Home</Link>
        <span>/</span>
        <Link className='transition-colors hover:text-stone-800' to='/collection'>Collection</Link>
        <span>/</span>
        <span className='max-w-44 truncate text-stone-700 sm:max-w-none'>{product.name}</span>
      </nav>

      <section className='grid gap-10 md:grid-cols-2 md:items-start lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-20 xl:gap-24'>
        <div className='flex min-w-0 flex-col-reverse gap-4 sm:flex-row sm:gap-5'>
          <div className='flex gap-3 overflow-x-auto pb-1 sm:w-[88px] sm:flex-col sm:overflow-y-auto sm:pb-0'>
            {product.image.map((image, index) => (
              <button
                key={image}
                type='button'
                onClick={() => setSelectedImage(index)}
                className={`group/thumb aspect-[3/4] w-20 shrink-0 overflow-hidden border bg-[#f4f2ef] transition-all duration-300 sm:w-full ${
                  selectedImage === index
                    ? 'border-stone-900 shadow-sm'
                    : 'border-stone-200 opacity-65 hover:border-stone-400 hover:opacity-100'
                }`}
                aria-label={`View product image ${index + 1}`}
              >
                <img className='h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-[1.03]' src={image} alt='' />
              </button>
            ))}
          </div>

          <div className='group/main relative aspect-[3/4] flex-1 overflow-hidden bg-[#f3f1ee] shadow-[0_18px_55px_rgba(28,25,23,0.08)]'>
            {product.bestseller && (
              <span className='absolute left-4 top-4 z-10 bg-white/90 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.22em] text-stone-800 shadow-sm backdrop-blur-sm'>
                Bestseller
              </span>
            )}
            <img
              className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover/main:scale-[1.015]'
              src={product.image[selectedImage]}
              alt={product.name}
            />
          </div>
        </div>

        <div className='flex flex-col md:py-3 lg:sticky lg:top-8 lg:py-6'>
          <div className='mb-5 flex items-center justify-between border-b border-stone-200 pb-5'>
            <p className='text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500'>
            {product.category} / {product.subCategory}
            </p>
            <span className='flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-emerald-700'>
              <span className='h-1.5 w-1.5 rounded-full bg-emerald-500'></span>
              In stock
            </span>
          </div>
          <h1 className='max-w-xl text-[1.75rem] font-medium leading-[1.2] tracking-[-0.025em] text-stone-950 sm:text-4xl'>
            {product.name}
          </h1>

          <div className='mt-5 flex items-center gap-3'>
            <div className='flex gap-1' aria-label='Rated 4 out of 5 stars'>
              {[0, 1, 2, 3].map((star) => (
                <img key={star} className='w-3.5' src={assets.star_icon} alt='' />
              ))}
              <img className='w-3.5' src={assets.star_dull_icon} alt='' />
            </div>
            <span className='border-l border-stone-300 pl-3 text-[11px] text-stone-500'>122 reviews</span>
          </div>

          <p className='mt-7 text-3xl font-medium tracking-tight text-stone-950'>
            {currency}{product.price}
          </p>
          <p className='mt-1 text-[10px] uppercase tracking-[0.14em] text-stone-400'>Taxes included</p>
          <p className='mt-7 max-w-xl border-l border-stone-300 pl-5 text-sm leading-7 text-stone-600'>
            {product.description}
          </p>

          <div className='mt-9 border-t border-stone-200 pt-7'>
            <div className='flex items-center justify-between'>
              <p className='text-xs font-medium uppercase tracking-[0.14em] text-stone-900'>Select size</p>
              {sizeError && <p className='text-xs text-red-600'>Please select a size</p>}
            </div>
            <div className='mt-4 flex flex-wrap gap-2.5'>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type='button'
                  onClick={() => {
                    setSelectedSize(size)
                    setSizeError(false)
                    setAddedToCart(false)
                  }}
                  className={`min-w-12 border px-4 py-3 text-xs font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? 'border-stone-950 bg-stone-950 text-white shadow-sm'
                      : 'border-stone-300 bg-white text-stone-700 hover:-translate-y-0.5 hover:border-stone-700'
                  }`}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type='button'
            onClick={handleAddToCart}
            className='mt-8 w-full bg-stone-950 px-10 py-[1.1rem] text-[11px] font-medium tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(28,25,23,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-[0_16px_36px_rgba(28,25,23,0.24)]'
          >
            {addedToCart ? 'ADDED TO CART' : 'ADD TO CART'}
          </button>

          <div className='mt-8 grid gap-px overflow-hidden border border-stone-200 bg-stone-200 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3'>
            <div className='bg-[#faf9f7] px-4 py-4'>
              <p className='text-[10px] font-medium uppercase tracking-[0.14em] text-stone-800'>Authentic</p>
              <p className='mt-1 text-[11px] leading-5 text-stone-500'>100% original product</p>
            </div>
            <div className='bg-[#faf9f7] px-4 py-4'>
              <p className='text-[10px] font-medium uppercase tracking-[0.14em] text-stone-800'>Delivery</p>
              <p className='mt-1 text-[11px] leading-5 text-stone-500'>Cash on delivery</p>
            </div>
            <div className='bg-[#faf9f7] px-4 py-4'>
              <p className='text-[10px] font-medium uppercase tracking-[0.14em] text-stone-800'>Returns</p>
              <p className='mt-1 text-[11px] leading-5 text-stone-500'>Easy returns in 7 days</p>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-24 border-t border-stone-200 pt-12 lg:mt-28'>
        <div className='flex border-b border-stone-300'>
          <p className='border-b-2 border-stone-950 px-5 pb-4 text-[10px] font-medium tracking-[0.16em] text-stone-950'>DESCRIPTION</p>
          <p className='px-5 pb-4 text-[10px] tracking-[0.16em] text-stone-400'>REVIEWS (122)</p>
        </div>
        <div className='grid gap-8 bg-[#faf9f7] px-6 py-8 text-sm leading-7 text-stone-600 sm:px-8 md:grid-cols-[0.35fr_1fr] md:gap-16 md:py-10'>
          <div>
            <p className='text-[10px] font-medium uppercase tracking-[0.2em] text-stone-900'>Product details</p>
            <p className='mt-2 text-xs text-stone-400'>{product.category} · {product.subCategory}</p>
          </div>
          <div>
          <p>{product.description}</p>
          <p className='mt-4'>
            Designed for everyday comfort and easy styling. Follow the care instructions on the label to preserve the fabric and fit.
          </p>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className='mt-24 lg:mt-28'>
          <div className='mb-12 text-center text-2xl sm:text-3xl'>
            <Title text1='RELATED' text2='PRODUCTS' />
          </div>
          <div className='grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-5'>
            {relatedProducts.map((item) => (
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
      )}
    </div>
  )
}

export default Products

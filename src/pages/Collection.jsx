import { useContext, useMemo, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
const Collection = () => { 
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleFilter = (value, setFilter) => {
    setFilter((currentFilters) =>
      currentFilters.includes(value)
        ? currentFilters.filter((item) => item !== value)
        : [...currentFilters, value]
    );
  };

  const filterProducts = useMemo(() => {
    let filtered = [...products];

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    const searchTerm = search.trim().toLowerCase();
    if (showSearch && searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
    }

    if (sortType === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, category, subCategory, sortType, search, showSearch]);

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  const hasActiveFilters = category.length > 0 || subCategory.length > 0;

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter((current) => !current)}
        >FILTERS
          <img className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          {['Men', 'Women', 'Kids'].map((item) => (
            <label key={item} className="flex cursor-pointer gap-2">
              <input
                className='w-3'
                type="checkbox"
                checked={category.includes(item)}
                onChange={() => toggleFilter(item, setCategory)}
              />
              {item}
            </label>
          ))}
        </div>
        </div>
        {/* SubCategory Filter */}
         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>TYPE</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
            <label key={item} className="flex cursor-pointer gap-2">
              <input
                className='w-3'
                type="checkbox"
                checked={subCategory.includes(item)}
                onChange={() => toggleFilter(item, setSubCategory)}
              />
              {item}
            </label>
          ))}
        </div>
        </div>
        {hasActiveFilters && (
          <button
            type='button'
            className='mb-5 text-sm text-gray-600 underline underline-offset-4 hover:text-black'
            onClick={clearFilters}
          >
            Clear filters
          </button>
        )}
      </div>

    {/* Right Side */}
    <div className="min-w-0 flex-1">

    <div className="flex justify-between text-base sm:text-2xl mb-4">
      <Title text1={'ALL'} text2={'COLLECTIONS'}/>
      {/*  Product Sort */}
      <select
        className='border-2 border-gray-300 text-sm px-2'
        value={sortType}
        onChange={(event) => setSortType(event.target.value)}
        aria-label='Sort products'
      >
        <option value="relevant">
          Sort by: Relevant
        </option>
        <option value="low-high">
          Sort by: Low to High
        </option>
        <option value="high-low">
          Sort by: High to Low
        </option>
      </select>
    </div>
     
     {/* Map Products */}
     {filterProducts.length > 0 ? (
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      {
        filterProducts.map((item) =>(
          <ProductItem
            key={item._id}
            name={item.name}
            id={item._id}
            image={item.image}
            price={item.price}
          />
        ))
      }
     </div>
     ) : (
       <div className='py-20 text-center text-sm text-gray-500'>
         No products match the selected filters.
       </div>
     )}

    </div>
    </div>
  )
}

export default Collection

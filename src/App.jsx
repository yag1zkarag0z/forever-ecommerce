import './App.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Content'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import SearchBar from './components/SearchBar';

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 900)

    return () => window.clearTimeout(loadingTimer)
  }, [])

  return (
    <>
      {isLoading && (
        <div className='intro-loader' role='status' aria-live='polite' aria-label='Loading Forever store'>
          <div className='intro-loader__content'>
            <p className='intro-loader__eyebrow'>EST. 2026</p>
            <p className='intro-loader__brand prata-regular'>FOREVER</p>
            <div className='intro-loader__track' aria-hidden='true'>
              <span />
            </div>
            <span className='sr-only'>Loading</span>
          </div>
        </div>
      )}

      <div className='mx-auto min-h-screen max-w-[1440px] px-4 sm:px-8 md:px-12 lg:px-16' aria-busy={isLoading}>
        <Navbar />
        <SearchBar />
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/collection' element={<Collection/>} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />}/>
            <Route path='/product/:productId' element={<Products />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/place-order' element={<PlaceOrder />}/>
            <Route path='/orders' element={<Orders />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App

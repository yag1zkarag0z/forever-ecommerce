import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  const { user, loginUser, logoutUser } = useContext(ShopContext)
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    loginUser({ name: mode === 'register' ? form.name : '', email: form.email })
    navigate('/collection')
  }

  if (user) {
    return (
      <section className='border-t border-stone-200 py-20 sm:py-28'>
        <div className='mx-auto max-w-lg bg-[#f7f5f2] px-7 py-12 text-center sm:px-12'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-950 text-xl font-medium uppercase text-white'>
            {user.name.charAt(0)}
          </div>
          <p className='mt-6 text-[10px] uppercase tracking-[0.2em] text-stone-400'>Signed in as</p>
          <h1 className='mt-2 text-2xl font-medium text-stone-950'>{user.name}</h1>
          <p className='mt-2 text-sm text-stone-500'>{user.email}</p>
          <div className='mt-8 grid gap-3 sm:grid-cols-2'>
            <button onClick={() => navigate('/orders')} className='bg-stone-950 px-6 py-3.5 text-[10px] font-medium tracking-[0.18em] text-white transition-colors hover:bg-stone-800'>MY ORDERS</button>
            <button onClick={logoutUser} className='border border-stone-400 px-6 py-3.5 text-[10px] font-medium tracking-[0.18em] text-stone-800 transition-colors hover:border-stone-950'>SIGN OUT</button>
          </div>
        </div>
      </section>
    )
  }

  const inputClass = 'w-full border-b border-stone-300 bg-transparent py-3.5 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-950'

  return (
    <section className='border-t border-stone-200 py-14 sm:py-20'>
      <div className='mx-auto grid max-w-5xl overflow-hidden border border-stone-200 bg-white shadow-[0_24px_70px_rgba(28,25,23,0.08)] md:grid-cols-[0.9fr_1.1fr]'>
        <div className='hidden bg-stone-950 p-10 text-white md:flex md:flex-col md:justify-between lg:p-14'>
          <p className='text-[10px] uppercase tracking-[0.28em] text-stone-400'>Forever membership</p>
          <div>
            <h1 className='max-w-xs text-4xl font-medium leading-tight tracking-tight'>A more personal way to shop.</h1>
            <p className='mt-5 max-w-sm text-sm leading-7 text-stone-400'>Save your details, review orders and enjoy a seamless checkout experience.</p>
          </div>
          <p className='text-[10px] uppercase tracking-[0.16em] text-stone-500'>Curated essentials · Thoughtful service</p>
        </div>

        <div className='px-6 py-10 sm:px-12 sm:py-14 lg:px-16'>
          <div className='flex border-b border-stone-200'>
            {[
              { id: 'login', label: 'Sign in' },
              { id: 'register', label: 'Create account' },
            ].map((item) => (
              <button
                key={item.id}
                type='button'
                onClick={() => setMode(item.id)}
                className={`flex-1 border-b-2 pb-4 text-[10px] font-medium uppercase tracking-[0.17em] transition-colors ${mode === item.id ? 'border-stone-950 text-stone-950' : 'border-transparent text-stone-400'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className='py-8'>
            <p className='text-[10px] uppercase tracking-[0.22em] text-stone-400'>{mode === 'login' ? 'Welcome back' : 'Join Forever'}</p>
            <h2 className='mt-3 text-3xl font-medium tracking-tight text-stone-950'>{mode === 'login' ? 'Sign in to your account' : 'Create your account'}</h2>
            <p className='mt-3 text-sm leading-6 text-stone-500'>{mode === 'login' ? 'Enter your details to continue.' : 'Create an account to keep your orders in one place.'}</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {mode === 'register' && <input required className={inputClass} name='name' value={form.name} onChange={updateField} placeholder='Full name' autoComplete='name' />}
            <input required className={inputClass} type='email' name='email' value={form.email} onChange={updateField} placeholder='Email address' autoComplete='email' />
            <input required minLength='6' className={inputClass} type='password' name='password' value={form.password} onChange={updateField} placeholder='Password' autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />

            <div className='flex items-center justify-between pt-2 text-xs text-stone-500'>
              <label className='flex cursor-pointer items-center gap-2'><input type='checkbox' className='accent-stone-950' /> Remember me</label>
              {mode === 'login' && <button type='button' className='underline underline-offset-4 hover:text-stone-950'>Forgot password?</button>}
            </div>

            <button type='submit' className='mt-4 w-full bg-stone-950 px-8 py-4 text-[10px] font-medium tracking-[0.2em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-stone-800'>
              {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className='mt-5 text-center text-[10px] leading-5 text-stone-400'>Demo authentication only. Connect a backend before using real customer credentials.</p>
        </div>
      </div>
    </section>
  )
}

export default Login

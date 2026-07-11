import { useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import Title from '../components/Title'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    setSubmitted(true)
  }

  const inputClass = 'w-full border-b border-stone-300 bg-transparent py-3.5 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-950'

  return (
    <div className='border-t border-stone-200 pb-24 pt-10 sm:pt-14'>
      <div className='mb-10 text-center text-2xl sm:mb-14 sm:text-3xl'>
        <Title text1='CONTACT' text2='US' />
        <p className='mx-auto mt-1 max-w-xl text-sm leading-6 text-stone-500'>Questions, feedback or styling help—we would love to hear from you.</p>
      </div>

      <section className='grid overflow-hidden border border-stone-200 bg-white shadow-[0_24px_70px_rgba(28,25,23,0.08)] lg:grid-cols-2'>
        <div className='relative min-h-[380px] overflow-hidden bg-stone-100 sm:min-h-[520px]'>
          <img className='absolute inset-0 h-full w-full object-cover' src={assets.contact_img} alt='Forever customer care' />
          <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 to-transparent px-7 pb-8 pt-28 text-white sm:px-10 sm:pb-10'>
            <p className='text-[10px] uppercase tracking-[0.22em] text-stone-300'>Customer care</p>
            <p className='mt-3 max-w-sm text-2xl font-medium leading-tight'>Here when you need us.</p>
          </div>
        </div>

        <div className='p-6 sm:p-10 lg:p-14'>
          <p className='text-[10px] font-medium uppercase tracking-[0.24em] text-stone-400'>Send a message</p>
          <h1 className='mt-4 text-3xl font-medium tracking-tight text-stone-950'>How can we help?</h1>
          <p className='mt-3 text-sm leading-6 text-stone-500'>Complete the form and our customer care team will get back to you shortly.</p>

          {submitted ? (
            <div className='mt-10 border border-emerald-200 bg-emerald-50 px-6 py-8'>
              <p className='text-sm font-medium text-emerald-900'>Thank you for your message.</p>
              <p className='mt-2 text-xs leading-6 text-emerald-700'>This demo form was submitted successfully. Connect a form service or backend to receive real messages.</p>
              <button type='button' onClick={() => setSubmitted(false)} className='mt-5 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-900 underline underline-offset-4'>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='mt-7 space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <input required className={inputClass} name='name' placeholder='Full name' autoComplete='name' />
                <input required className={inputClass} type='email' name='email' placeholder='Email address' autoComplete='email' />
              </div>
              <select required defaultValue='' className={`${inputClass} cursor-pointer`} name='subject'>
                <option value='' disabled>Select a subject</option>
                <option value='order'>Order support</option>
                <option value='product'>Product information</option>
                <option value='returns'>Returns and exchanges</option>
                <option value='other'>Other</option>
              </select>
              <textarea required className={`${inputClass} min-h-28 resize-y`} name='message' placeholder='Your message' />
              <button type='submit' className='mt-4 w-full bg-stone-950 px-8 py-4 text-[10px] font-medium tracking-[0.2em] text-white transition-all hover:-translate-y-0.5 hover:bg-stone-800'>SEND MESSAGE</button>
              <p className='text-center text-[10px] text-stone-400'>Demo form — no personal information is transmitted.</p>
            </form>
          )}
        </div>
      </section>

      <section className='grid gap-px border-x border-b border-stone-200 bg-stone-200 md:grid-cols-3'>
        {[
          { title: 'Email us', value: 'support@forever.example', note: 'Replies within 1–2 business days' },
          { title: 'Call us', value: '+90 212 000 00 00', note: 'Mon–Fri, 09:00–18:00' },
          { title: 'Visit us', value: 'Istanbul, Türkiye', note: 'By appointment only' },
        ].map((item) => (
          <div key={item.title} className='bg-[#faf9f7] p-7 text-center sm:p-9'>
            <p className='text-[9px] font-medium uppercase tracking-[0.2em] text-stone-400'>{item.title}</p>
            <p className='mt-3 text-sm font-medium text-stone-900'>{item.value}</p>
            <p className='mt-2 text-[11px] text-stone-500'>{item.note}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Contact

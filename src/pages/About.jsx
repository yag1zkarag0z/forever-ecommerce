import { Link } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets'
import Title from '../components/Title'

const About = () => {
  return (
    <div className='relative border-t border-stone-200 pb-24 pt-10 sm:pt-14'>
      <div className='pointer-events-none absolute right-0 top-0 -z-10 h-[520px] w-2/3 bg-[radial-gradient(circle_at_top_right,rgba(214,211,209,0.2),transparent_68%)]'></div>
      <section className='grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28'>
        <div className='order-2 lg:order-1 lg:py-10'>
          <div className='flex items-center gap-3'>
            <span className='h-px w-8 bg-stone-400'></span>
            <p className='text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400'>Our story</p>
          </div>
          <h1 className='mt-5 max-w-xl text-4xl font-medium leading-[1.1] tracking-[-0.035em] text-stone-950 sm:text-5xl lg:text-6xl'>
            Style made to live with you.
          </h1>
          <p className='mt-8 max-w-xl border-l border-stone-400 pl-6 text-sm leading-7 text-stone-600 sm:text-base'>
            Forever was created around a simple idea: getting dressed should feel effortless. We bring together versatile silhouettes, considered details and dependable quality for wardrobes built beyond a single season.
          </p>
          <p className='mt-5 max-w-xl text-sm leading-7 text-stone-500'>
            Every collection balances everyday comfort with a refined point of view, making it easier to discover pieces that feel personal, useful and enduring.
          </p>
          <Link to='/collection' className='group mt-9 inline-flex items-center gap-4 bg-stone-950 px-9 py-4 text-[10px] font-medium tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(28,25,23,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-[0_18px_38px_rgba(28,25,23,0.22)]'>
            DISCOVER THE COLLECTION <span className='text-sm transition-transform duration-300 group-hover:translate-x-1'>→</span>
          </Link>
        </div>

        <div className='group order-1 relative lg:order-2'>
          <div className='absolute -inset-3 -z-10 border border-stone-200 bg-[#f5f3f0] sm:-inset-5'></div>
          <div className='relative aspect-[4/5] overflow-hidden bg-stone-100 shadow-[0_28px_80px_rgba(28,25,23,0.13)]'>
            <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-stone-950/10 via-transparent to-white/5'></div>
            <img className='h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]' src={assets.about_img} alt='Forever studio and collection' />
          </div>
          <div className='absolute -bottom-5 -left-3 z-20 border border-stone-100 bg-white/95 px-6 py-5 shadow-[0_18px_45px_rgba(28,25,23,0.14)] backdrop-blur-sm sm:-left-6 sm:px-8'>
            <p className='text-2xl font-medium text-stone-950'>Since 2026</p>
            <p className='mt-1 text-[9px] uppercase tracking-[0.18em] text-stone-400'>Thoughtfully curated</p>
          </div>
        </div>
      </section>

      <section className='relative mt-28 border-y border-stone-200 py-16 sm:mt-36 sm:py-20'>
        <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#faf9f7] via-white/40 to-[#faf9f7]'></div>
        <div className='mb-12 text-center text-2xl sm:text-3xl'>
          <Title text1='WHY' text2='CHOOSE US' />
          <p className='mx-auto mt-1 max-w-xl text-sm leading-6 text-stone-500'>A considered experience from first discovery to everyday wear.</p>
        </div>

        <div className='grid gap-px overflow-hidden border border-stone-200 bg-stone-200 shadow-[0_20px_55px_rgba(28,25,23,0.06)] md:grid-cols-3'>
          {[
            { number: '01', title: 'Curated quality', text: 'We focus on versatile pieces, comfortable fabrics and details designed to last beyond the moment.' },
            { number: '02', title: 'Effortless experience', text: 'Clear discovery, secure checkout and straightforward service make every step feel considered.' },
            { number: '03', title: 'Customer first', text: 'Responsive support and easy returns give you confidence before and after every purchase.' },
          ].map((item) => (
            <article key={item.number} className='group/card relative bg-[#faf9f7] p-8 transition-colors duration-300 hover:bg-white sm:p-10'>
              <span className='absolute left-0 top-0 h-0.5 w-0 bg-stone-950 transition-all duration-500 group-hover/card:w-full'></span>
              <div className='flex items-center gap-3'>
                <p className='text-[10px] font-medium tracking-[0.2em] text-stone-400'>{item.number}</p>
                <span className='h-px w-6 bg-stone-300 transition-all duration-300 group-hover/card:w-10 group-hover/card:bg-stone-500'></span>
              </div>
              <h2 className='mt-8 text-xl font-medium tracking-tight text-stone-950 transition-transform duration-300 group-hover/card:translate-x-1'>{item.title}</h2>
              <p className='mt-4 text-sm leading-7 text-stone-500'>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='grid gap-12 py-20 md:grid-cols-[0.7fr_1.3fr] md:items-start lg:gap-24 lg:py-28'>
        <div className='md:sticky md:top-8'>
          <p className='text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400'>Our approach</p>
          <h2 className='mt-4 text-3xl font-medium tracking-tight text-stone-950'>Less noise. Better choices.</h2>
        </div>
        <div className='grid gap-5 sm:grid-cols-2'>
          <div className='group border border-stone-200 bg-white p-6 shadow-[0_12px_35px_rgba(28,25,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_20px_45px_rgba(28,25,23,0.08)] sm:p-8'>
            <span className='mb-8 block h-px w-8 bg-stone-400 transition-all duration-300 group-hover:w-14 group-hover:bg-stone-950'></span>
            <p className='text-xs font-medium uppercase tracking-[0.16em] text-stone-800'>Designed for real life</p>
            <p className='mt-4 text-sm leading-7 text-stone-500'>Our edit prioritizes pieces that move naturally between work, weekends and everything in between.</p>
          </div>
          <div className='group border border-stone-200 bg-white p-6 shadow-[0_12px_35px_rgba(28,25,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_20px_45px_rgba(28,25,23,0.08)] sm:p-8'>
            <span className='mb-8 block h-px w-8 bg-stone-400 transition-all duration-300 group-hover:w-14 group-hover:bg-stone-950'></span>
            <p className='text-xs font-medium uppercase tracking-[0.16em] text-stone-800'>Always evolving</p>
            <p className='mt-4 text-sm leading-7 text-stone-500'>We listen, learn and refine the experience to make shopping clearer and more personal over time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

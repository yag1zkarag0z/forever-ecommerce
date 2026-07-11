import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='mb-4 inline-flex items-center gap-3'>
        <span className='h-px w-8 bg-stone-400 sm:w-12'></span>
        <p className='text-stone-500'>{text1} <span className='font-medium text-stone-900'>{text2}</span></p>
        <span className='h-px w-8 bg-stone-400 sm:w-12'></span>
    </div>
  )
}

export default Title

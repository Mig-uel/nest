'use client'

import { ClipLoader } from 'react-spinners'

const LoadingPage = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <ClipLoader
        color='#3B82F6'
        cssOverride={{
          display: 'block',
        }}
        size={100}
        aria-label='Loading spinner'
      />
    </div>
  )
}
export default LoadingPage

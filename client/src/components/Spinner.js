import React from 'react'
import {Circles, CirclesWithBar, ThreeCircles} from 'react-loader-spinner'
const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <ThreeCircles
      color='#21AFFF'
      height={80}
      width={200}
      className='m-5'
        />
        <p className='text-lg font-semibold mt-2 px-2'>{message}</p>
    </div>
  )
  
}

export default Spinner

import React from 'react'
import heroimg from '../../../public/assests/home/heroimage.png'
import Testimonial1 from '../../../public/assests/Testimonial/t1.jpg'
import product3 from '../../../public/assests/products/f3.jpg'
import { FaStar } from 'react-icons/fa'
function HeroSectionBg() {
  return (
    <div className='w-full h-full relative overflow-hidden'>
      <div className='w-96 h-96 bg-yellow-300 absolute top-16 right-0 z-20' ></div>
      <div className='w-80 h-80 bg-green-300 absolute top-44 right-72' ></div>
      <div className='w-80 h-80 bg-red-300 absolute bottom-0 right-1/3' ></div>
      <div className='h-full absolute right-52 top-10 z-40 scale-110'>
        <img src={heroimg} alt="heroimg" className='h-full' />
      </div>
      <div className="bg-white w-auto p-2 rounded-full absolute top-48 right-40 z-40">
        <div className="w-full flex items-center justify-center">
          <img src={Testimonial1} alt="" className="w-10 h-10 rounded-full border -mr-3 z-10" />
          <img src={Testimonial1} alt="" className="w-10 h-10 rounded-full border -mr-3 z-20" />
          <img src={Testimonial1} alt="" className="w-10 h-10 rounded-full border -mr-3 z-30" />
          <img src={Testimonial1} alt="" className="w-10 h-10 rounded-full border -mr-3 z-40" />
          <img src={Testimonial1} alt="" className="w-10 h-10 rounded-full border z-50" />
        </div>
      </div>
      <div className='absolute top-80 right-60 z-50 bg-white p-2 pb-3 flex items-center justify-center rounded-2xl -rotate-12'>
        <div className='text-5xl'>
          👒
        </div>
      </div>
      <div className='absolute bottom-20 right-1/3 z-50 bg-white p-2 pb-3 flex items-center justify-center rounded-2xl rotate-12 shadow-md'>
        <div className='text-5xl'>
          👚
        </div>
      </div>
      <div className='h-48 absolute top-80 right-1/3 z-50 bg-white p-4   rounded-2xl -rotate-3  shadow-xl'>
        <div className='-translate-y-8  flex flex-col justify-center gap-4'>
        <img src={product3} alt="" className='w-32 rounded-xl' />
        <div className='flex flex-col justify-center items-center '>
          <p className='font-semibold'>Goa shirt</p>
          <p className='text-red-400 font-semibold'>$320</p>
        </div>
        </div>
      </div>

      <div className="bg-white w-auto p-4 px-8 rounded-xl absolute bottom-20 right-40 z-40 shadow-lg">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <div>
            <p className='text-xl font-medium'>10k + review</p>
          </div>
          <div className='flex gap-2'>
          <div className='flex gap-1'>
          <FaStar className='text-yellow-400 text-xl'/>
          <FaStar className='text-yellow-400 text-xl'/>
          <FaStar className='text-yellow-400 text-xl'/>
          <FaStar className='text-yellow-400 text-xl'/>
          <FaStar className='text-yellow-400 text-xl'/>
          </div>
          <p className='fontsemi-bold text-slate-500 text-balance text-sm'>(4.8)</p>
          </div>
        </div>


    </div>
    </div>
  )
}

export default HeroSectionBg

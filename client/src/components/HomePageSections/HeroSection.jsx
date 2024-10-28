import React from 'react'
import Button from '../Button/Button'
import { FaArrowRight, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import HeroSectionBg from '../herosection Bg/herosectionbg'
import product1 from '../../../public/assests/products/f1.jpg'
import product2 from '../../../public/assests/products/f2.jpg'

function HeroSection() {
    return (
        <div className='flex lg:flex-row lg:h-screen relative '>
            <div className='absolute z-20 w-full h-full pt-10 pr-4'>
                <HeroSectionBg/>
            </div>
            <div className='lg:w-1/2 p-20 mt-4 h-full bg-transparent flex flex-col gap-4 justify-between z-30 '>
                <div className='flex flex-col gap-6 justify-evenly'>
                    <div className='flex gap-4'>
                        <FaFacebook className='text-2xl text-gray-700' />
                        <FaInstagram className='text-2xl text-gray-700' />
                        <FaLinkedin className='text-2xl text-gray-700' />
                    </div>
                    
                </div>
                <h1 className='md:text-3xl lg:text-6xl font-semibold'>Discover the Latest Trends for you .</h1>
                    <p className='md:text-xl text-slate-700'>Explore our new collection for the season , Lorem ipsum dolor sit.</p>
                    <div className='flex gap-4'>
                        <Button size='xl' className='flex gap-4'>
                            <p>Shop Now</p>
                            <FaArrowRight />
                        </Button>
                        <Button variant='normal' size='xl'>
                            Learn More
                        </Button>
                    </div>
                <div className='flex gap-4'>
                    <div className='flex flex-col gap-4 w-40 h-40 '>
                        <img src={product1} alt="" className='rounded-lg' />
                        <div className='flex justify-between'>
                            <p className='font-semibold'>shirt</p>
                            <p className='text-red-400 font-semibold'>$120</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 w-40  h-40 '>
                        <img src={product2} alt="" className='rounded-lg' />
                        <div className='flex justify-between'>
                            <p className='font-semibold'>green shirt</p>
                            <p className='text-red-400 font-semibold'>$320</p>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default HeroSection

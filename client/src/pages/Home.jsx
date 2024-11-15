import React, { useEffect, useRef } from 'react';
import { products } from '../data';
import Testimonial from '../components/Testimonial';
import ProductCard from '../components/ProductCard';
import gsap from 'gsap';
import HeroSection from '../components/HomePageSections/HeroSection';

const Home = () => {
    const testimonialBox = useRef(null);

    useEffect(() => {
        gsap.to(testimonialBox.current, {
            x: '-100vw',
            duration: 10,
            repeat: -1,
            ease: 'linear',
        });
    }, []);
    
    return (
        <div className="container mx-auto bg-white dark:bg-black">
            <HeroSection />

            <section className="py-8 md:py-16 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6 md:mb-10">Featured Products</h2>
                <ProductCard products={products.slice(0, 4)} />
            </section>

            <section className="py-8 md:py-16 bg-gray-100">
                <div className="text-center mb-6 md:mb-10">
                    <h2 className="text-3xl font-bold">Latest Collection</h2>
                    <p className="text-lg text-gray-600">Fresh styles handpicked for you</p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
                <div className="overflow-hidden relative w-full" ref={testimonialBox}>
                    <div className="flex items-center gap-10 whitespace-nowrap">
                        {['Jane Doe', 'John Smith', 'Emily Johnson'].map((name, index) => (
                            <div key={index} className="w-96 p-6 bg-gray-100 rounded-lg shadow-lg inline-block">
                                <p className="italic text-gray-700 mb-4">
                                    {index === 0
                                        ? '"Amazing quality! I\'m in love with my new outfit. Will definitely shop again."'
                                        : index === 1
                                        ? '"Fast delivery and excellent customer service!"'
                                        : '"This is my go-to store for the latest fashion trends!"'}
                                </p>
                                <p className="font-bold">— {name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="relative py-12 md:py-24 bg-cover bg-center text-white"
                style={{
                    backgroundImage: `url('https://img.freepik.com/free-photo/beautiful-brunette-woman-holding-shopping-bags_23-2148359561.jpg')`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative container mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4">Stay Updated With Our Newsletter</h2>
                        <p className="text-lg mb-8">Sign up for exclusive offers, new arrivals, and the latest updates in fashion.</p>
                        <form className="px-10 flex flex-col sm:flex-row justify-center">
                            <input
                                type="email"
                                className="w-full sm:w-2/3 p-3 md:rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4 sm:mb-0"
                                placeholder="Enter your email address"
                                aria-label="Email address for newsletter subscription"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-yellow-500 text-black font-semibold px-6 py-3 md:rounded-r-lg hover:bg-yellow-600 transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

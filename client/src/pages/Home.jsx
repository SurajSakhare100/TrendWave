import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data';
import Testimonial from '../components/Testimonial';
import ProductCard from '../components/ProductCard';
import gsap from 'gsap'
const Home = () => {
    const testimonialBox=useRef(null);
    useEffect(() => {
        gsap.to(testimonialBox.current, {
            x: '-100vw', // Move to the left of the screen
            duration: 5, // Time for one loop
            repeat: -1, // Infinite repeat
            ease: 'linear',
             // Smooth, linear transition
        });

        return () => {
            // Optional cleanup
        };
    }, []);
    
    return (
        <div className="container mx-auto">
            {/* Hero Section */}
            <div className="relative bg-cover bg-center h-screen brightness-200" style={{ backgroundImage: `url('https://img.freepik.com/free-photo/close-up-woman-front-clothing-piles_23-2150951005.jpg?t=st=1725543899~exp=1725547499~hmac=c15eb4bcbca412ad0232589957e032c9c703585a5772b4da4dbb0cd4d7800f2c&w=1060')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">Discover the Latest Trends</h1>
                        <p className="text-xl mb-8">Explore our new collection for the season</p>
                        <button className="bg-white text-black py-2 px-6 rounded-full mr-4">Shop Now</button>
                        <button className="bg-transparent border border-white text-white py-2 px-6 rounded-full">Learn More</button>
                    </div>
                </div>
            </div>

            {/* Featured Products Section */}
            <section className="py-8 md:py-16">
                <h2 className="text-3xl font-bold text-center md:mb-10">Featured Products</h2>
                <ProductCard products={products.slice(0, 4)} /> {/* Display the first 4 products */}
            </section>

            {/* Latest Collection Section */}
            <section className="py-8 md:py-16 bg-gray-100">
                <div className="text-center md:mb-10">
                    <h2 className="text-3xl font-bold">Latest Collection</h2>
                    <p className="text-lg text-gray-600">Fresh styles handpicked for you</p>
                </div>
            </section>

            {/* Custom Testimonial Section with Infinite Scroll */}
            <section className="py-16 bg-white">
                <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
                <div className="overflow-hidden relative w-full transform translate-x-full" ref={testimonialBox}>
                    <div className="flex items-center justify-start gap-10 animate-scroll-infinite whitespace-nowrap">
                        {/* Sample Testimonials */}
                        <div className="w-96 p-6 bg-gray-100 rounded-lg shadow-lg inline-block">
                            <p className="italic text-gray-700 mb-4">"Amazing quality! I'm in love with my new outfit. Will definitely shop again."</p>
                            <p className="font-bold">— Jane Doe</p>
                        </div>
                        <div className="w-96 p-6 bg-gray-100 rounded-lg shadow-lg inline-block">
                            <p className="italic text-gray-700 mb-4">"Fast delivery and excellent customer service!"</p>
                            <p className="font-bold">— John Smith</p>
                        </div>
                        <div className="w-96 p-6 bg-gray-100 rounded-lg shadow-lg inline-block">
                            <p className="italic text-gray-700 mb-4">"This is my go-to store for the latest fashion trends!"</p>
                            <p className="font-bold">— Emily Johnson</p>
                        </div>
                        {/* Add more testimonials here */}
                    </div>
                </div>
            </section>

            {/* Modern Newsletter Section */}
            <section className="relative py-12 h-full md:py-24 bg-cover bg-center text-white" style={{ backgroundImage: `url('https://img.freepik.com/free-photo/beautiful-brunette-woman-holding-shopping-bags_23-2148359561.jpg?w=1060&t=st=1725543899~exp=1725547499~hmac=131df4c8d56d2ec64cc4411dbb4e7742b31c705a9736d524e490b000fe41e58a')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative container mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4">Stay Updated With Our Newsletter</h2>
                        <p className="text-lg mb-8">Sign up for exclusive offers, new arrivals, and the latest updates in fashion.</p>
                        <form className="px-10  flex flex-col sm:flex-row justify-center">
                            <input
                                type="email"
                                className="w-full sm:w-2/3 p-3 md:rounded-l-lg text-black focus:outline-none mb-4 sm:mb-0"
                                placeholder="Enter your email address"
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

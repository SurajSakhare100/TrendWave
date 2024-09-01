import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data';
import Testimonial from '../components/Testimonial';
import ProductCard from '../components/ProductCard';

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            {/* Hero Section */}
            <section className="relative bg-blue-500 text-white rounded-lg overflow-hidden mb-8">
                <img 
                    src="https://via.placeholder.com/1500x600?text=Hero+Image" 
                    alt="Hero" 
                    className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
                    <h1 className="text-5xl font-bold mb-4 text-center">Discover the Best Deals on Fashion</h1>
                    <p className="text-lg mb-8 text-center">Find your perfect style with our exclusive collections and discounts.</p>
                    <Link to="/shop" className="bg-primary text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition">Shop Now</Link>
                </div>
            </section>

        <ProductCard product={products}/>

            {/* Testimonials Section */}
           <Testimonial/>
        </div>
    );
};

export default Home;

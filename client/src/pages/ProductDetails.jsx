import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import f1 from '../../public/assests/products/f1.jpg'

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    const [selectedImage, setSelectedImage] = useState(product.image);
    const [selectedSize, setSelectedSize] = useState('Select Size');

    if (!product) {
        return <div className="container mx-auto p-4 text-center">Product not found</div>;
    }

    // Function to handle image change on click
    const handleImageClick = () => {
        // Logic to change image or open a modal can go here
        console.log('Image clicked');
    };

    // Function to handle size selection
    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    // Calculate star rating
    const rating = 4.5; // Example rating, replace with actual product rating
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div className="container mx-auto py-14 px-40">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className='flex flex-col md:w-1/2'>
                <img 
                    src={f1} 
                    alt={product.name} 
                    className="w-full aspect-square object-cover rounded cursor-pointer mb-4 md:mb-0"
                    onClick={handleImageClick}
                />
                <div className='flex gap-4 origin-center mt-4'>
                
                <img 
                    src={f1} 
                    alt={product.name} 
                    className="w-full md:w-1/2 aspect-square object-cover rounded cursor-pointer mb-4 md:mb-0"
                    onClick={handleImageClick}
                />
                <img 
                    src={f1} 
                    alt={product.name} 
                    className="w-full md:w-1/2 aspect-square object-cover rounded cursor-pointer mb-4 md:mb-0"
                    onClick={handleImageClick}
                />
                <img 
                    src={f1} 
                    alt={product.name} 
                    className="w-full md:w-1/2 aspect-square object-cover rounded cursor-pointer mb-4 md:mb-0"
                    onClick={handleImageClick}
                />
                <img 
                    src={f1} 
                    alt={product.name} 
                    className="w-full md:w-1/2 aspect-square object-cover rounded cursor-pointer mb-4 md:mb-0"
                    onClick={handleImageClick}
                />
                </div>
                </div>
                
                <div className="md:w-1/2 md:ml-8">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
                    
                    <div className="flex items-center mb-4">
                        {[...Array(fullStars)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                        ))}
                        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
                        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                            <FaRegStar key={i} className="text-gray-300" />
                        ))}
                    </div>

                    <p className="text-gray-700 mb-4">{product.description}</p>
                    
                    <div className="mb-4">
                        <label htmlFor="size" className="block text-gray-700 font-medium mb-2">Select Size:</label>
                        <select 
                            id="size" 
                            value={selectedSize} 
                            onChange={handleSizeChange} 
                            className="border border-gray-300 rounded-lg py-2 px-4 w-40"
                        >
                            <option disabled>Select Size</option>
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                            <option value="XL">Extra Large</option>
                        </select>
                    </div>

                    <button
                        onClick={() => addToCart(product, selectedSize)}
                        className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Add to Cart
                    </button>

                </div>
            </div>
                
        </div>
    );
};

export default ProductDetails;

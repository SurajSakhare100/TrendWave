import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {  addToCartAPI } from '../../app/features/cartSlice.js';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('Select Size');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch product details from the API
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
                setSelectedImage(response.data.image); // Set the default image
                setLoading(false);
            } catch (err) {
                setError('Product not found');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleAddToCart = () => {
        if (product && selectedSize !== 'Select Size') {
            dispatch(addToCartAPI({userId:"123",product:{id:product._id,price:product.price,image:product.image}}));
        } else {
            alert('Please select a size before adding to cart.');
        }
    };

    if (loading) {
        return <div className="container mx-auto p-4 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-4 text-center">{error}</div>;
    }

    if (!product) {
        return <div className="container mx-auto p-4 text-center">Product not found</div>;
    }

    // Calculate star rating
    const rating = product.rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div className="container mx-auto py-14 px-40">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex flex-col md:w-1/2">
                    <img 
                        src={selectedImage} 
                        alt={product.name} 
                        className="w-full object-cover rounded cursor-pointer mb-4 md:mb-0"
                        onClick={() => handleImageClick(product.image)}
                    />
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
                            {product.sizes && product.sizes.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleAddToCart}
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

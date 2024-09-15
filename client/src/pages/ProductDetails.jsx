import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAPI } from '../app/features/cartSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('Select Size');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const userId=useSelector((state)=>state.user._id)
    useEffect(() => {
        // Fetch product details from the API
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/products/${id}`);
                setProduct(response.data.data);
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
            dispatch(addToCartAPI({ userId, product: { id: id, price: product.price, image: product.image } }));
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
        <div className="container mx-auto py-14 px-20">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex flex-col md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full object-cover rounded cursor-pointer mb-4 md:mb-0"
                        onClick={() => handleImageClick(product.image)}
                    />
                </div>

                <div className="md:w-1/2 md:ml-8">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>

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
                            className=" border-gray-300 bg-gray-50 border-2  py-2 px-4 w-40"
                        >
                            <option disabled>Select Size</option>
                            {product.sizes && product.sizes.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-600 text-white py-2 px-4 w-40  hover:bg-blue-700"
                    >
                        Add to Cart
                    </button>

                    <div className='mt-4 font-normal' 
                    >
                        <p>Category : <span>{product.category}</span></p>
                        <p>Tags: <span>{product.tags}</span></p>

                    </div>
                </div>
            </div>
            <div className='mt-20'>
                <div className='border-b '>
                            <ul className='flex w-full h-full text-md '>
                                <li className=' h-full border py-3 px-6 font-semibold'>
                                Description
                                </li>
                                <li className='h-full border py-3 px-6'>
                                Reviews(0)
                                </li>
                            </ul>
                </div>
                <div className='flex flex-col space-y-2 text-gray-600 py-10'>
                    <h2>
                    A key objective is engaging digital marketing customers and allowing them to interact with the brand through servicing and delivery of digital media. Information is easy to access at a fast rate through the use of digital communications. 
                    </h2>
                    <h4>
                    Users with access to the Internet can use many digital mediums, such as Facebook, YouTube, Forums, and Email etc. Through Digital communications it creates a Multi-communication channel where information can be quickly exchanged around the world by anyone without any regard to whom they are.[28] Social segregation plays no part through social mediums due to lack of face to face communication and information being wide spread instead to a selective audience. 
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

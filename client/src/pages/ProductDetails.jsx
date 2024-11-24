import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { addToCartAPI, fetchCart } from '../app/features/cartSlice';
import { getProductById } from '..';
import Button from '../components/Button/Button';
import LikeProduct from '../components/Like Product/LikeProduct';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('Select Size');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user?._id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                if (response.success) {
                    setProduct(response.data);
                    setSelectedImage(response.data.image || '/default-image.jpg');
                } else {
                    setError('Product not found.');
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to load product details.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (product && selectedSize !== 'Select Size') {
            await dispatch(addToCartAPI({
                userId,
                product: {
                    id,
                    price: product?.price,
                    image: selectedImage,
                },
            }));
            await dispatch(fetchCart());
        } else {
            alert('Please select a size before adding to cart.');
        }
    };

    if (loading) {
        return <div className="container mx-auto p-4 text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-4 text-center text-red-600 dark:text-red-400">{error}</div>;
    }

    if (!product) {
        return <div className="container mx-auto p-4 text-center text-gray-600 dark:text-gray-300">Product not found.</div>;
    }

    const rating = product?.rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div className="mx-auto py-10 px-10 mt-16 bg-white dark:bg-black">
            <div className="flex flex-col sm:flex-row max-w-4xl gap-12 justify-between mx-auto">
                <div className="w-full ">
                    <img
                        src={selectedImage || '/default-image.jpg'}
                        alt={product?.name || 'Product image'}
                        className="w-full object-cover mx-auto shadow-sm cursor-pointer mb-4"
                        onClick={() => setSelectedImage(product?.image || '/default-image.jpg')}
                    />
                </div>
                <div className="">
                    <div className="flex justify-end">
                        <LikeProduct productId={product?._id} className="text-xl" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-black dark:text-white">{product?.name}</h1>
                    <p className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">₹{product?.price?.toFixed(2)}</p>

                    <div className="flex items-center mb-4">
                        {[...Array(fullStars)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                        ))}
                        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
                        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                            <FaRegStar key={i} className="text-gray-300" />
                        ))}
                    </div>

                    <p className="text-gray-800 dark:text-gray-300 mb-4">{product?.description}</p>

                    {product?.sizes?.length > 0 && (
                        <div className="mb-4">
                            <label htmlFor="size" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                                Select Size:
                            </label>
                            <select
                                id="size"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2 px-4 w-40"
                                aria-label="Select product size"
                            >
                                <option disabled>Select Size</option>
                                {product?.sizes?.map((size, index) => (
                                    <option key={index} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <Button onClick={handleAddToCart} size="xl" className="flex-shrink">
                        Add to Cart
                    </Button>

                    <div className="mt-4 font-normal text-gray-700 dark:text-gray-300">
                        <p>Category: <span>{product?.category}</span></p>
                        <p>Tags: <span>{product?.tags?.join(', ')}</span></p>
                    </div>
                </div>
            </div>

            <div className="mt-16 border-b dark:border-gray-700">
                <ul className="flex space-x-6 text-md font-semibold text-gray-600 dark:text-gray-400">
                    <li className="border-b-2 border-blue-600 py-3 px-6">Description</li>
                    <li className="py-3 px-6">Reviews (0)</li>
                </ul>
            </div>

            <div className="py-8 text-gray-700 dark:text-gray-300">
                <h2 className="text-lg mb-4 font-medium">Product Details</h2>
                <p>
                    {product?.description || 'Detailed description of the product will be available soon.'}
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;

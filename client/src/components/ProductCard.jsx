import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import f1 from '../../public/assests/products/f1.jpg';

const ProductCard = ({ products }) => {
    // Generate star rating based on product rating
    const renderStars = (rating = 0) => (
        Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                className={index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}
            />
        ))
    );

    return (
        <div className="flex flex-wrap gap-6 p-6 overflow-y-auto">
            {products?.map((product) => (
                <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow-md bg-white cursor-pointer hover:shadow-lg flex-shrink-0 transition-shadow duration-300 w-full sm:w-64 md:w-80"
                >
                    <Link to={`/products/${product.id}`}>
                        <img
                            src={product.image || f1}
                            alt={product.name || 'Product Image'}
                            className="w-full aspect-square object-cover rounded mb-4 hover:opacity-80 transition-opacity duration-300"
                        />
                        <h2 className="text-xl font-semibold mb-2 truncate">{product.name || 'Product Name'}</h2>
                        <div className="text-lg font-bold text-gray-800 mb-2">
                            {product.price ? `$${product.price.toFixed(2)}` : 'N/A'}
                        </div>
                        <div className="flex items-center text-yellow-500 mb-2">
                            {renderStars(product.rating)}
                        </div>
                    </Link>
                    <Link
                        to={`/products/${product.id}`}
                        className="block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                    >
                        View Product
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductCard;

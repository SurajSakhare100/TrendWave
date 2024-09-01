import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // Import star icon for ratings

const ProductCard = ({ product }) => {
    // Generate star rating based on product rating
    const renderStars = (rating) => (
        Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
            />
        ))
    );

    return (
        <div className="border rounded-lg p-4 shadow-lg bg-white cursor-pointer hover:shadow-xl transition-shadow duration-300">
            
            
            <Link
                to={`/products/${product.id}`}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-4 hover:opacity-80 transition-opacity duration-300"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            {/* <p className="text-lg font-bold text-gray-800 mb-2">${product.price.toFixed(2)}</p> */}
            <div className="flex text-yellow-500 mb-2">
                {renderStars(product.rating)}
            </div>
            </Link>
        </div>
    );
};

export default ProductCard;

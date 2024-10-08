import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // Import star icon for ratings
import f1 from '../../public/assests/products/f1.jpg'

const ProductCard = ({ products }) => {
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
        <div className="flex overflow-y-scroll gap-6 p-6 ">
            {products?.map((product) => (
                <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow-lg bg-white cursor-pointer hover:shadow-xl  flex-shrink-0 transition-shadow duration-300"
                >
                    <Link to={`/products/${product.id}`}>
                        <img
                            src={f1}
                            alt={product.name}
                            className="w-56 md:w-96 aspect-square object-cover rounded mb-4 hover:opacity-80 transition-opacity duration-300"
                        />
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <div className="text-lg font-bold text-gray-800 mb-2">
                            ${product.price.toFixed(2)}
                        </div>
                        <div className="flex text-yellow-500 mb-2">
                            {renderStars(product.rating)}
                        </div>
                    </Link>
                    <Link
                        to={`/products/${product.id}`}
                        className="block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                        View Product
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductCard;

import React from 'react';
import PropTypes from 'prop-types';
import f1 from '../../public/assests/products/f1.jpg'
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ProductList = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <div key={product.id} 
                className="bg-white border border-gray-200 rounded-lg  overflow-hidden hover:scale-[104%] hover:shadow-md delay-75 ease-in-out transition-all cursor-pointer"
                
                >
                    <Link to={`${product.id}`}>
                    <img 
                        src={f1}
                        alt={product.name} 
                        className="aspect-square object-cover" 
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">{product.name}</h2>
                        <div className="flex flex-col justify-between items-center">
                            <span className="text-xl  font-bold text-gray-900">${product.price.toFixed(2)}</span>
                            <div className="text-yellow-400 flex items-center px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                            </div>
                        </div>
                    </div>
                    </Link>
                    
                </div>
            ))}
        </div>
    );
};

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ProductList;

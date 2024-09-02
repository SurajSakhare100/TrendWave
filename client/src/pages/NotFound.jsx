import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="w-full flex items-center justify-center min-h-screen  bg-gray-100">
            <div className="p-8 space-y-8 bg-white rounded-lg shadow-lg  text-center">
                <h1 className="text-6xl font-extrabold text-blue-500">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
                <p className="text-gray-600">
                    Oops! The page you're looking for doesn't exist. It might have been removed, or the URL might be incorrect.
                </p>
                <Link 
                    to="/" 
                    className="inline-flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <FaHome className="mr-2" />
                    Back to Home
                </Link>
                <div className="flex justify-center space-x-4 mt-6">
                    <Link 
                        to="/shop"
                        className="px-4 py-2 text-sm font-medium text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
                    >
                        Visit Shop
                    </Link>
                    <Link 
                        to="/contact"
                        className="px-4 py-2 text-sm font-medium text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

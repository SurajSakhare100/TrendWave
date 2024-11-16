import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
            <motion.div
                className="p-8 space-y-8 bg-white rounded-lg shadow-xl text-center max-w-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <motion.h1
                    className="text-8xl font-extrabold text-blue-500"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    404
                </motion.h1>
                <h2 className="text-2xl font-semibold text-gray-800">
                    Page Not Found
                </h2>
                <p className="text-gray-600">
                    Oops! The page you're looking for doesn't exist. It might have been removed or the URL might be incorrect.
                </p>
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <FaHome className="mr-2" />
                        Back to Home
                    </Link>
                </motion.div>
                <motion.div
                    className="flex justify-center space-x-4 mt-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        to="/shop"
                        className="px-4 py-2 text-sm font-medium text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white shadow-sm"
                    >
                        Visit Shop
                    </Link>
                    <Link
                        to="/contact"
                        className="px-4 py-2 text-sm font-medium text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white shadow-sm"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;

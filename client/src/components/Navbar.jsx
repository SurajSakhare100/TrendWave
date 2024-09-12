import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaBell } from 'react-icons/fa';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo and Mobile Menu Button */}
                <div className="flex items-center space-x-4 w-full">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-2xl font-bold hover:text-gray-400 transition-colors">Trend Wave</Link>
                        <button
                            className="md:hidden text-2xl hover:text-gray-400 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
                        <Link to="/about" className="hover:text-gray-400 transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-gray-400 transition-colors">Contact Us</Link>
                        <Link to="/products" className="hover:text-gray-400 transition-colors">Products</Link>
                    </div>
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/auth/signin" className="hover:text-gray-400 transition-colors"><FaUser /></Link>
                        <Link to="/notify" className="hover:text-gray-400 transition-colors"><FaBell /></Link>
                        <Link to="/cart" className="flex items-center space-x-1 hover:text-gray-400 transition-colors">
                            <FaShoppingCart />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                    <div className="flex flex-col items-center justify-center h-full space-y-6 text-white">
                        <button
                            className="absolute top-4 right-4 text-2xl hover:text-gray-400 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FaTimes />
                        </button>
                        <Link to="/" className="text-2xl hover:text-gray-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/products" className="text-2xl hover:text-gray-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Products</Link>
                        <Link to="/cart" className="flex items-center space-x-1 text-2xl hover:text-gray-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                            <FaShoppingCart />
                            <span>Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes,FaUser, FaBell } from 'react-icons/fa';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-gray-800  text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo and Mobile Menu Button */}
                <div className="w-full flex items-center space-x-4 justify-between px-10">
                    <div>
                        <Link to="/" className="text-2xl font-bold">Trend Wave</Link>
                        <button
                            className="md:hidden text-2xl"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                    <div className=' hidden md:flex space-x-16 items-center'>
                        <Link to="/" className="">Home</Link>
                        <Link to="/about" className="">About</Link>
                        <Link to="/contact" className="">Contact US</Link>
                        <Link to="/products" className="hover:underline">Products</Link>
                    </div>
                    <div className="hidden md:flex  space-x-6 items-center">

                        <Link to="/auth/signin" className="hover:underline"><FaUser /></Link>
                        <Link to="/notify" className="hover:underline"><FaBell /></Link>
                        <Link to="/cart" className="flex items-center space-x-1 hover:underline">
                            <FaShoppingCart />
                        </Link>
                    </div>
                </div>

                {/* Desktop Menu */}


                {/* Mobile Menu */}
                <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                    <div className="flex flex-col items-center justify-center h-full space-y-6 text-white">
                        <button
                            className="absolute top-4 right-4 text-2xl"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FaTimes />
                        </button>
                        <Link to="/" className="text-2xl" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/products" className="text-2xl" onClick={() => setIsMenuOpen(false)}>Products</Link>
                        <Link to="/cart" className="flex items-center space-x-1 text-2xl" onClick={() => setIsMenuOpen(false)}>
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

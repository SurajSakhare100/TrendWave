import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { LuShoppingBag } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../app/features/userSlices';
import { fetchCart } from '../app/features/cartSlice';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useSelector((state) => state.user);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]); 

    useEffect(() => {
        if (userId) {
            dispatch(fetchCart(userId));
        }
    }, [dispatch, userId]);

    const cartLength = cartItems.length;

    const menuItems = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact Us" },
        { to: "/products", label: "Products" },
    ];

    return (
        <nav className="dark:bg-gray-800 bg-white dark:text-white text-black shadow-lg sticky top-0 z-50 text-nowrap">
            <div className="container mx-auto flex justify-between items-center py-4">
                {/* Logo and Mobile Menu Button */}
                <div className="h-full flex items-center justify-between space-x-6 w-full px-10">
                    <Link to="/" className="text-2xl font-bold hover:text-blue-700 transition-colors ">Trend Wave</Link>
                    <button
                        className="sm:hidden text-2xl hover:text-blue-700 font-medium transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <div className="hidden sm:flex space-x-8 items-center">
                        {menuItems.map(item => (
                            <Link key={item.to} to={item.to} className="hover:text-blue-700 font-medium transition-colors">{item.label}</Link>
                        ))}
                    </div>
                    <div className="hidden sm:flex space-x-6 items-center">
                        <Link to="/auth/signin" className="hover:text-blue-700 font-medium transition-colors"><FaUser /></Link>
                        <Link to="/notify" className="hover:text-blue-700 font-medium transition-colors text-xl"><LuShoppingBag/></Link>
                        <Link to="/cart" className="flex items-center space-x-1 hover:text-blue-700 font-medium transition-colors">
                            <FaShoppingCart />
                            <div className='w-4 h-4 flex items-center justify-center text-[13px] font-bold font-poppins rounded-full -translate-x-[50%] -translate-y-[50%]'>{cartLength}</div>
                        </Link>
                        <Link to={`/admin/${user._id}`} className='text-black'>
                            {user?.profilePicture && (
                                <img src={user.profilePicture} alt="User Profile" className='rounded-full border-2 w-12 h-12' />
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}>
                    <div className="flex flex-col items-center justify-center h-full space-y-6 text-white">
                        <button
                            className="absolute top-4 right-4 text-2xl hover:text-blue-700 font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close mobile menu"
                        >
                            <FaTimes />
                        </button>
                        {menuItems.map(item => (
                            <Link key={item.to} to={item.to} className="text-2xl hover:text-blue-700 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                                {item.label}
                            </Link>
                        ))}
                        <Link to="/cart" className="flex items-center space-x-1 text-2xl hover:text-blue-700 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
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

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { LuShoppingBag } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../app/features/userSlices';
import { fetchCart } from '../app/features/cartSlice'; // Make sure this action is available in your slice

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useSelector((state) => state.user);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (userId) {
            dispatch(fetchCart(userId)); 
        }
    }, [dispatch, userId]);

    const cartLength = cartItems?.length;

    const menuItems = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact Us" },
        { to: "/products", label: "Products" },
    ];

    return (
        <nav className="dark:bg-black bg-white dark:text-white text-black shadow-lg py-2 fixed w-full top-0 z-40 text-nowrap">
            <div className="mx-auto flex justify-between items-center py-3">
                <div className="h-full flex items-center justify-between space-x-6 w-full px-10">
                    <Link to="/" className="text-2xl font-bold hover:text-blue-700 transition-colors ">Trend Wave</Link>
                    <button
                        className="sm:hidden text-2xl hover:text-blue-700 font-medium transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? '' : <FaBars />}
                    </button>
                    <div className="hidden sm:flex space-x-8 items-center">
                        {menuItems.map(item => (
                            <Link key={item.to} to={item.to} className="hover:text-blue-700 font-medium transition-colors">{item.label}</Link>
                        ))}
                    </div>
                    <div className="hidden sm:flex space-x-6 items-center">
                        <Link to="/auth/signin" className="hover:text-blue-700 font-medium transition-colors"><FaUser /></Link>
                        <Link to="/notify" className="hover:text-blue-700 font-medium transition-colors text-xl"><LuShoppingBag /></Link>
                        <Link to="/cart" className="flex items-center space-x-1 hover:text-blue-700 font-medium transition-colors">
                            <FaShoppingCart />
                            <div className='w-4 h-4 flex items-center justify-center text-[13px] font-bold font-poppins rounded-full -translate-x-[50%] -translate-y-[50%]'>{cartLength}</div>
                        </Link>
                        <div className="relative">
                                <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                                    <img
                                        src={user?.profile_url}
                                        alt="User Profile"
                                        className="rounded-full w-10 h-10 border-2"
                                    />
                                </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                    <Link
                                        to={`/wishlist`}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Wishlist
                                    </Link>
                                    <Link
                                        to={`/admin/${user._id}`}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Admin Page
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}>
                    <div className="flex flex-col items-center justify-center h-full space-y-6 text-white">
                        <button
                            className="absolute top-8 right-8 text-2xl hover:text-blue-700 font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close mobile menu"
                        >
                            <FaTimes />
                        </button>
                        {menuItems.map(item => (
                            <Link key={item.to} to={item.to} className="text-2xl hover:text-blue-700 font-medium transition-colors" onClick={() => setIsMenuOpen(false)} >
                                {item.label}
                            </Link>
                        ))}
                        <Link to="/cart" className="flex items-center space-x-1 text-2xl hover:text-blue-700 font-medium transition-colors" onClick={() => setIsMenuOpen(false)} >
                            <FaShoppingCart />
                            <span>Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    //     <div className="grid grid-cols-12 gap-4 relative bg-white dark:bg-gray-900">
    //     <div className="col-span-12">
    //       <header>
    //         <div className="border-b border-gray-200 dark:border-gray-700">
    //           <div className="px-4 mx-auto sm:px-6 lg:px-8">
    //             <nav className="relative flex items-center justify-between h-16 lg:h-20">
    //               {/* Navigation Links */}
    //               <div className="hidden lg:flex lg:items-center lg:space-x-10">
    //                 {["Men", "Women", "Kids", "Pricing"].map((item, index) => (
    //                   <a
    //                     key={index}
    //                     href="#"
    //                     className="text-base font-medium text-black hover:text-blue-600 focus:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
    //                   >
    //                     {item}
    //                   </a>
    //                 ))}
    //               </div>
  
    //               {/* Logo */}
    //               <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
    //                 <div className="flex-shrink-0">
    //                   <a href="#" title="" className="flex">
    //                     <img
    //                       className="w-auto h-8 lg:h-10"
    //                       src="https://website-builderx-assets.s3.ap-south-1.amazonaws.com/official/logo-1.png"
    //                       alt="Company Logo"
    //                     />
    //                   </a>
    //                 </div>
    //               </div>
  
    //               {/* Mobile Buttons */}
    //               <button
    //                 type="button"
    //                 className="flex items-center justify-center ml-auto text-white bg-black rounded-full w-9 h-9 lg:hidden dark:bg-gray-800"
    //               >
    //                 <svg
    //                   className="w-5 h-5"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth="2"
    //                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    //                   />
    //                 </svg>
    //               </button>
  
    //               <button
    //                 type="button"
    //                 className="inline-flex p-2 ml-5 text-black rounded-md lg:hidden hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
    //                 onClick={() => setExpanded(!expanded)}
    //               >
    //                 <svg
    //                   className="w-6 h-6"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth="2"
    //                     d="M4 6h16M4 12h16m-7 6h7"
    //                   />
    //                 </svg>
    //               </button>
  
    //               {/* Right Icons */}
    //               <div className="hidden lg:flex lg:items-center lg:space-x-10">
    //                 <a
    //                   href="#"
    //                   className="flex items-center justify-center w-10 h-10 text-black rounded-full dark:text-gray-200"
    //                 >
    //                   <svg
    //                     className="w-6 h-6"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth="2"
    //                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    //                     />
    //                   </svg>
    //                 </a>
  
    //                 <a
    //                   href="#"
    //                   className="text-base font-medium text-black dark:text-gray-200"
    //                 >
    //                   Login
    //                 </a>
    //               </div>
    //             </nav>
    //           </div>
    //         </div>
  
    //         {/* Mobile Menu */}
    //         {expanded && (
    //           <nav className="py-4 bg-white lg:hidden dark:bg-gray-900">
    //             <div className="px-4 mx-auto sm:px-6 lg:px-8">
    //               <div className="flex items-center justify-between">
    //                 <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
    //                   Menu
    //                 </p>
  
    //                 <button
    //                   type="button"
    //                   className="inline-flex p-2 text-black hover:bg-gray-100 focus:bg-gray-100 rounded-md dark:text-gray-200 dark:hover:bg-gray-700"
    //                   onClick={() => setExpanded(false)}
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="w-6 h-6"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth="2"
    //                       d="M6 18L18 6M6 6l12 12"
    //                     />
    //                   </svg>
    //                 </button>
    //               </div>
  
    //               <div className="mt-6">
    //                 <div className="flex flex-col space-y-2">
    //                   {["Features", "Solutions", "Resources", "Pricing"].map(
    //                     (item, index) => (
    //                       <a
    //                         key={index}
    //                         href="#"
    //                         className="py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
    //                       >
    //                         {item}
    //                       </a>
    //                     )
    //                   )}
    //                 </div>
  
    //                 <hr className="my-4 border-gray-200 dark:border-gray-700" />
  
    //                 <div className="flex flex-col space-y-2">
    //                   <a
    //                     href="#"
    //                     className="py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
    //                   >
    //                     Sign up
    //                   </a>
    //                   <a
    //                     href="#"
    //                     className="py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
    //                   >
    //                     Sign in
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </nav>
    //         )}
    //       </header>
    //     </div>
    //   </div>
        
    );
};

export default Navbar;

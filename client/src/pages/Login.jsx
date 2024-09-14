import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuth } from '../components/GoogleAuth';
import { loginUser } from '../index.js'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../app/features/userSlices.js';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null); 
    const [showPassword, setShowPassword] = useState(false);
    const user=useSelector((state)=>state.user)
    const navigate=useNavigate()
    console.log(user)
    const dispatch=useDispatch(null)
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        try {
            const userData = await loginUser( {...form });
            if (userData) {
                dispatch(setUser(userData))
                navigate('/');
            } else {
                setError('Invalid email or password.'); // Set error message
            }
        } catch (error) {
            setError('An error occurred during login.'); // Set error message for API errors
            console.error('Error occurred during login:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-8 space-y-6 ">
                <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-gray-700 border  border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-gray-700 border  border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white  hover:bg-gray-800 bg-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                    <p className='text-xl text-center mt-2'>Or</p>
                </form>
                <GoogleAuth />
                <p className="text-sm text-center text-gray-600">
                    Don't have an account? <Link to="/auth/signup" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../index.js';

const Register = () => {
    const [form, setForm] = useState({
        username:'',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const user= await registerUser({
           ...form
          });
        //   navigate('/login');
        } catch (error) {
          console.log(error.message);
        }
      };

    const togglePasswordVisibility = () => {
        setTimeout(()=>{
            setShowPassword(!showPassword);
        },[100])
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-700">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                        Username
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-gray-700 border  border-black  focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>
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
                                className="w-full px-4 py-2 text-gray-700 border  border-black  focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                className="w-full px-4 py-2 text-gray-700  border border-black  focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                            Confirm Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-gray-700  border border-black  focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white   hover:bg-gray-800 bg-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Already have an account? <Link to="/auth/signin" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

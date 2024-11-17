import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../app/features/userSlices.js';
import Input from '../components/Input/Input.jsx';
import Button from '../components/Button/Button.jsx';
import {GoogleAuth} from '../components/GoogleAuth'; // Import corrected

const Login = () => {
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const login = async (data) => {
        setError(''); // Clear previous errors
        try {
            const userData = await loginUser(data);
            if (userData) {
                navigate('/');
            } else {
                setError('Invalid email or password.'); // Set error message
            }
        } catch (error) {
            setError('An error occurred during login.'); // Set error message for API errors
            console.error('Error occurred during login:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-700">Sign In</h1>
                {error && (
                    <p className="text-red-500 text-center text-sm">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit(login)} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Enter a valid email',
                            },
                        })}
                        error={errors.email && errors.email.message}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long',
                            },
                        })}
                        error={errors.password && errors.password.message}
                    />
                    <Button variant="primary" size="md" className="w-full" type="submit">
                        Sign In
                    </Button>
                </form>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">or</span>
                    </div>
                </div>

                <GoogleAuth />

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/auth/signup" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

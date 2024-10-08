import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuth } from '../components/GoogleAuth';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser} from '../app/features/userSlices.js';
import { useForm } from 'react-hook-form';
import Input from '../components/Input/Input.jsx';
import Button from '../components/Button/Button.jsx';

const Login = () => {
    const [error, setError] = useState(null); 
    const user=useSelector((state)=>state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const login = async(data) => {
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
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-8  ">
                <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>
               {/* Email */}
               <form onSubmit={handleSubmit(login)}>
               <Input
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Enter a valid email',
                        },
                    })}
                    error={errors.email && errors.email.message}
                />

                {/* Password */}
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters long',
                        },
                    })}
                    error={errors.password && errors.password.message}
                />

                {/* Submit Button */}
                <Button variant="primary" size="md" className='w-full' type='submit'>
                    Sign In
                </Button>
            </form>
            <div>
            <p className='text-center text-2xl py-2'> or</p>
            </div>
                <GoogleAuth />
                <p className="text-md text-center text-gray-600 mt-4">
                    Don't have an account? <Link to="/auth/signup" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

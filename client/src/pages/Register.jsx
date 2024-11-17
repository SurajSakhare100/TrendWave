import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../index.js';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            navigate('/auth/signin');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-12 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-700">Register to TrendWave</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Username */}
                    <Input
                        label="Username"
                        placeholder="Enter username"
                        {...register('username', { required: 'Username is required' })}
                        error={errors.username && errors.username.message}
                    />
                    {/* Profile Name */}
                    <Input
                        label="Profile Name"
                        placeholder="Enter full name"
                        {...register('profileName', { required: 'Profile Name is required' })}
                        error={errors.profileName && errors.profileName.message}
                    />
                    {/* Email */}
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
                    <Button variant="primary" size="md" className="w-full" type="submit">
                        Register
                    </Button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

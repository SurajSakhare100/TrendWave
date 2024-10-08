import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input/Input';
import Container from '../components/Container/Container';
import Button from '../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../index.js';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate=useNavigate()

    const onSubmit = async(data) => {
    try {
      await registerUser(data);
      navigate('/auth/signin');
    } catch (error) {
      console.log(error.message);
    }
    };

    return (
        <Container className="py-10 flex justify-center flex-col items-center h-full md:h-screen "> {/* Add custom padding */}
            <h1 className="text-center text-3xl font-bold mb-2">Register To TrendWave</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-96">
                <h2 className="text-2xl font-bold mb-5"></h2>
                {/* Username */}
                <Input
                    label="Username"
                    placeholder="Enter username"
                    {...register('username', { required: 'Username is required' })}
                    error={errors.username && errors.username.message}
                />
                {/* profileName */}
                <Input
                    label="ProfileName"
                    placeholder="Enter full Name"
                    {...register('profileName', { required: 'profileName is required' })}
                    error={errors.username && errors.username.message}
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
                <Button variant="primary" size="md" className='w-full' type='submit'>
                    Register
                </Button>
                <p className="text-md text-center text-gray-600 mt-4">
                   Already have an account? <Link to="/auth/signin" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </form>
        </Container>
    );
};

export default Register;

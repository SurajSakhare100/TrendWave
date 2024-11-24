import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../index.js";
import { showSuccessToast, showErrorToast } from "../utils/toast.js";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      if (response?.status === 201) {
        showSuccessToast("Registration successful! Redirecting to login...");
        navigate("/auth/signin");
      } else {
        throw new Error(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      showErrorToast(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Register to TrendWave
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <Input
            label="Username"
            placeholder="Enter your username"
            className="w-full "
            {...register("username", { required: "Username is required" })}
            error={errors.username && errors.username.message}
          />
          {/* Profile Name */}
          <Input
            label="Profile Name"
            placeholder="Enter your full name"
            className="w-full"
            {...register("profileName", { required: "Profile Name is required" })}
            error={errors.profileName && errors.profileName.message}
          />
          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="w-full"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email",
              },
            })}
            error={errors.email && errors.email.message}
          />
          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            error={errors.password && errors.password.message}
          />
          {/* Submit Button */}
          <Button
            variant="primary"
            size="md"
            type="submit"
            className="w-full  "
          >
            Register
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

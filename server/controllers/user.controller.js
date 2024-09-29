import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/user.model.js';
import { options } from '../utils/constant.js';

// Register a new user with enhanced validation
export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, username, password, profileName, profile_url, address } = req.body;

  // Basic validation
  if (!email || !username || !password) {
    return next(new ApiError(400, 'Email, Username, and Password are required'));
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new ApiError(400, 'Invalid email format'));
  }

  // Validate password strength
  if (password.length < 8) {
    return next(new ApiError(400, 'Password must be at least 8 characters long'));
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError(400, 'Email already exists'));
  }

  // Check if username already exists
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return next(new ApiError(400, 'Username already exists'));
  }

  // Create a new user
  const newUser = new User({
    email,
    username,
    password,
    profileName,
    profile_url,
    address,
  });

  await newUser.save();
  return res.status(201).json(new ApiResponse(201, newUser, 'User registered successfully'));
});

// Login user
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return next(new ApiError(400, 'Email and password are required'));
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new ApiError(400, 'Invalid email format'));
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(400, 'User not found'));
  }

  // Check if password matches
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return next(new ApiError(400, 'Invalid credentials'));
  }

  // Generate access and refresh tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save refresh token in the database
  user.refresh_token = refreshToken;
  await user.save();

  // Set refresh token and access token as HTTP-only cookies
  const cookieOptions = options; // Ensure options is properly defined in the 'constant.js'

  // Exclude sensitive fields like password, refresh_token, and address
  const safeUser = await User.findById(user._id).select('-password -refresh_token -address');

  // Send the access token and user information back to the client
  return res
    .cookie('refreshToken', refreshToken, cookieOptions)
    .cookie('accessToken', accessToken, cookieOptions)
    .status(200)
    .json(new ApiResponse(200, safeUser, 'User logged in successfully'));
});

// Get user profile
export const getUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password -refresh_token');
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    return res.status(200).json(new ApiResponse(200, user, 'User profile fetched successfully'));
  } catch (error) {
    return next(new ApiError(500, 'An error occurred while fetching the user profile'));
  }
});

// Update user profile
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const { username, profileName, profile_url, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, profileName, profile_url, address },
      { new: true, runValidators: true }
    ).select('-password -refresh_token');
    
    if (!updatedUser) {
      return next(new ApiError(404, 'User not found'));
    }

    return res.status(200).json(new ApiResponse(200, updatedUser, 'User profile updated successfully'));
  } catch (error) {
    return next(new ApiError(500, 'An error occurred while updating the user profile'));
  }
});

// Delete user
export const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) {
      return next(new ApiError(404, 'User not found'));
    }

    return res.status(200).json(new ApiResponse(200, 'User deleted successfully'));
  } catch (error) {
    return next(new ApiError(500, 'An error occurred while deleting the user'));
  }
});

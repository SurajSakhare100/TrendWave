import { url } from "@/lib";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [], // Initial state to store the wishlist products
  status: "idle", // Status for loading, success, failure
  error: null, // Error state
};

export const fetchWishlist = createAsyncThunk(
  "wishlist/get",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/shop/wishlist/${userId}`, {
        withCredentials: true,
      });
      return response.data; // Assume response.data contains the wishlist
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle errors properly
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/shop/wishlist/add`,
        { userId, productId },
        { withCredentials: true }
      );
      return response.data; // Assume response.data contains the added product
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle errors properly
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/shop/wishlist/remove`,
        { userId, productId },
        { withCredentials: true }
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle errors properly
    }
  }
);

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {}, // No custom reducers, only async thunks
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading"; // Indicate loading state
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded"; // Wishlist fetched successfully
        state.products = action.payload.wishlist || []; // Set the fetched products
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed"; // Failed to fetch wishlist
        state.error = action.payload || action.error.message; // Capture the error message
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.products = action.payload.wishlist || [];// Optimistically add the product
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload || action.error.message; // Capture the error message
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.wishlist || [];
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message; // Capture the error message
      });
  },
});

export default WishlistSlice.reducer;

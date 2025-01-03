import { url } from "@/lib";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],  // Initial state to store the wishlist products
  status: "idle",  // Status for loading, success, failure
  error: null,  // Error state
};

// Fetch wishlist (GET request)
export const fetchWishlist = createAsyncThunk(
  "wishlist/get",
  async (userId) => {
    try {
      const response = await axios.get(`${url}/shop/wishlist/${userId}`, {
        withCredentials: true,
      });
      return response.data.wishlist; 
    } catch (error) {
      throw error;  // Proper error handling
    }
  }
);

// Add to wishlist (POST request)
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async ({ userId, productId }) => {
    try {
      const response = await axios.post(
        `${url}/shop/wishlist/add`,
        { userId, productId },
        { withCredentials: true }
      );
      return response.data;  // Should return the updated list of products
    } catch (error) {
      throw error;  // Proper error handling
    }
  }
);

// Remove from wishlist (POST request)
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async ({ userId, productId }) => {
    try {
      const response = await axios.post(
        `${url}/shop/wishlist/remove`,
        { userId, productId },
        { withCredentials: true }
      );
      return response.data;  // Ensure this returns the updated list of products
    } catch (error) {
      throw error;  // Proper error handling
    }
  }
);

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},  // No custom reducers, only async thunks
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";  // Indicate loading state
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";  // Wishlist fetched successfully
        state.products = action.payload.products;  // Set the fetched products
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";  // Failed to fetch wishlist
        state.error = action.error.message;  // Capture the error message
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.products.push(action.payload.product);  // Optimistically add the product
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload.productId  // Remove the product
        );
      });
  },
});

export default WishlistSlice.reducer;

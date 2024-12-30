import { url } from "@/lib";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  wishlist: {
    _id: "",
    userId: "",
    products: [], // Initialize products as an empty array
  },
};

// Fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/get",
  async (userId) => {
    const response = await axios.get(`${url}/shop/wishlist/${userId}`, {
      withCredentials: true,
    });
    return response.data; // Ensure this returns an object with wishlist details
  }
);

// Add to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async ( userId, productId ) => {
    const response = await axios.post(
      `${url}/shop/wishlist/add`,
      { userId, productId },
      {
        withCredentials: true,
      }
    );
    return response.data; 
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async ({ userId, productId }) => {
    const response = await axios.post(
      `${url}/shop/wishlist/remove`,
      { userId, productId },
      {
        withCredentials: true,
      }
    );
    return response.data; // Ensure this returns updated wishlist data
  }
);

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.wishlist = action.payload?.wishlist || { _id: "", userId: "", products: [] };
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.isLoading = false;
        state.wishlist = { _id: "", userId: "", products: [] }; // Reset on failure
      })

      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload?.wishlist || { _id: "", userId: "", products: [] }; // Update wishlist
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.isLoading = false;
      })

      // Remove from Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload?.wishlist || { _id: "", userId: "", products: [] }; // Update wishlist
      })
      .addCase(removeFromWishlist.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default WishlistSlice.reducer;

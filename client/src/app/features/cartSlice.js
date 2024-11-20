import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  totalPrice: 0,
  status: 'idle',
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
  const response = await axios.get(`http://localhost:5000/api/v1/carts`,{withCredentials:true});
  return response.data.data;
});

export const addToCartAPI = createAsyncThunk('cart/addToCartAPI', async ({ userId, product }) => {
  const response = await axios.post(`http://localhost:5000/api/v1/carts`, {
    productId: product.id,
    price: product.price,
    image: product.image,
    quantity: 1,
  },{withCredentials:true});
  return response.data;
});

export const removeFromCartAPI = createAsyncThunk('cart/removeFromCartAPI', async ({ userId, productId }) => {
  const response = await axios.delete(`http://localhost:5000/api/v1/carts/${productId}`,{withCredentials:true});
  return response.data;
});

export const updateQuantityAPI = createAsyncThunk('cart/updateQuantityAPI', async ({ userId, productId, quantity }) => {
  const response = await axios.put(`http://localhost:5000/api/v1/carts`, {productId, quantity },{withCredentials:true});
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.status = 'succeeded';
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(updateQuantityAPI.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;

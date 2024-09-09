// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice.js';
import productReducer from '../features/productSlice.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;

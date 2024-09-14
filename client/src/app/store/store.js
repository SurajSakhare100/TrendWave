import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlices.js';
import prductReducer from '../features/productSlice.js';
import cartReducer from '../features/cartSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    product:prductReducer,
    cart:cartReducer,

  },
});

export default store;

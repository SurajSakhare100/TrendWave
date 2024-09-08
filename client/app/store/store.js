// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice.js';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;

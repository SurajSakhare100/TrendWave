// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';

const url = "http://localhost:5000";

// Thunk for fetching products based on filters
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async ({ filters, page }, thunkAPI) => {
      try {
        // Make the API request with filters and page
        const response = await axios.get(`${url}/api/products/filters`, {
          params: { ...filters, page }
        });
        return response.data;
      } catch (err) {
        return thunkAPI.rejectWithValue('Error fetching products');
      }
    }
  );

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    categories: ['Men', 'Women', 'Child'],
    subcategories: ['Topwear', 'Jackets', 'Pants', 'Tshirts', 'Polos', 'Sweaters', 'Cardigans', 'Hoodies', 'Sweatshirts', 'Skirts', 'Shorts', 'Tracksuits', 'Shirts', 'Dresses'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    filters: { category: '', subcategory: '', priceRange: '', size: '' },
    loading: false,
    error: null,
    page: 1,
    pageSize: 5
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1; // Reset to page 1 when filters change
    },
    setPage(state, action) {
        state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        if(action.payload.total==0){
        state.pageSize=0;
        }else{
            state.pageSize=action.payload.totalPages;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters , setPage } = productSlice.actions;
export default productSlice.reducer;

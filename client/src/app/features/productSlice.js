import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";

// Thunk for fetching products based on filters
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ filters, page }, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/api/v1/products/filters`, {
        params: { ...filters, page },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error fetching products");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categories: ["Men", "Women", "Child"],
    subcategories: [
      "Topwear", "Jackets", "Pants", "Tshirts", "Polos", "Sweaters", "Cardigans",
      "Hoodies", "Sweatshirts", "Skirts", "Shorts", "Tracksuits", "Shirts", "Dresses"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"], // Available sizes
    filters: {
      category: "",
      subcategory: "",
      minPrice: 0,
      maxPrice: 10000,
      sizes: [], // Handle multiple sizes
    },
    loading: false,
    error: null,
    page: 1,
    pageSize: 5,
    totalProducts: 0, // Track total products count
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1; // Reset to page 1 when filters change
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalProducts: (state, action) => {
      state.totalProducts = action.payload;
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
        state.totalProducts = action.payload.pagination.totalProducts; // Set total products
        state.pageSize = action.payload.pagination.totalPages;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage, setTotalProducts } = productSlice.actions;
export default productSlice.reducer;

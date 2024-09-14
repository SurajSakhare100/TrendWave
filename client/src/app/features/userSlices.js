import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser } from '../../index.js';

// Define the initial state for the user
const initialState = {
  id: null,
  username: '',
  email: '',
  profilePicture: '',
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create an async thunk for fetching the user data
export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  const response = await getCurrentUser();
  return response;
});

// Create a slice for the user state
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...action.payload, isAuthenticated: true };
    },
    updateUserProfile(state, action) {
      const { username, profilePicture } = action.payload;
      state.username = username;
      state.profilePicture = profilePicture;
    },
    logoutUser(state) {
      return { ...initialState, isAuthenticated: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        return { ...action.payload, isAuthenticated: true, status: 'succeeded' };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the actions
export const { setUser, updateUserProfile, logoutUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;

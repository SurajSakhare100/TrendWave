import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Use product routes
app.use('/api', productRoutes);
app.use('/api/cart', cartRoutes);

// Get port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

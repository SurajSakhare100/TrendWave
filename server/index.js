import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import cartRoutes from './routes/cart.routes.js';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';
// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
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
app.use('/api/auth', authRoutes);

app.use('/api/orders', orderRoutes);


// Get port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

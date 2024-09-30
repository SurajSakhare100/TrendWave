import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import cartRoutes from './routes/cart.routes.js';
import userRoutes from './routes/user.routes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';
import cookieParser from 'cookie-parser';
// Load environment variables from .env file
dotenv.config();

const app = express();
const clientURL ='http://localhost:5173';
app.use(cors({
  origin: clientURL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.json());


// Use product routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/carts', cartRoutes);

app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/users', userRoutes);


// Get port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

export default app;


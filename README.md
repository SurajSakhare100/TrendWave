# TrendWave - MERN Stack Clothing E-Commerce Platform

TrendWave is a modern, responsive, and feature-rich clothing e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform is designed to provide a seamless shopping experience for users while offering robust functionality for managing products, users, orders, and payments.

---

## Features

### User Features
- **Account Management**: User registration, login, and profile updates.
- **Product Browsing**: View a wide range of products with categories and filters.
- **Search**: Powerful search functionality to quickly find products.
- **Cart & Checkout**: Add products to a shopping cart and proceed to secure checkout.
- **Order History**: View past orders and their statuses.

### Admin Features
- **Dashboard**: Overview of orders, sales, and customer statistics.
- **Product Management**: Add, edit, and delete products.
- **Order Management**: Update order statuses and manage returns.
- **User Management**: Manage customer accounts and roles.

### Additional Features
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Payment Integration**: Secure payments via Stripe or PayPal.
- **Authentication**: Protected routes using JSON Web Tokens (JWT).
- **Wishlist**: Users can save favorite items for later.

---

## Technology Stack

### Frontend
- **React.js**: For building the user interface.
- **Redux Toolkit**: For state management.
- **Tailwind CSS**: For responsive and modern styling.

### Backend
- **Node.js**: Runtime environment for building scalable backend services.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.

### Additional Tools
- **Cloudinary**: For image upload and storage.
- **Stripe/PayPal SDK**: For payment processing.
- **JWT**: For authentication and authorization.
- **Vercel/Netlify**: For frontend deployment.
- **Heroku/Render**: For backend deployment.

---

## Installation

### Prerequisites
- **Node.js** (v14 or later)
- **MongoDB** (local or cloud-based)
- **Yarn** or **npm**

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/trendwave.git
   cd trendwave

### Install Dependencies

# Install frontend dependencies
```bash
cd client
npm install
```

# Install backend dependencies

```bash
cd ../server
npm install
```
#Environment Variables
Create .env files in both client and server directories.

Server Environment Variables (.env)


```bash
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
```
Client Environment Variables (.env)

```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your-stripe-public-key

```bash
# Start the backend server
cd server
npm run dev

# Start the frontend server
cd ../client
npm start
Access the Application
Frontend: http://localhost:3000
Backend API: http://localhost:5000

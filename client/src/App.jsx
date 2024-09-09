import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { products } from './data';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import About from './pages/About';
import ContactPage from './pages/ContactPage';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products products={products} />} />
                        <Route path="/products/:id" element={<ProductDetails  />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/auth/signup" element={<Register />} />
                        <Route path="/auth/signin" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;

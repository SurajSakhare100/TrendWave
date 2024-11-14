import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store/store'; // Import your Redux store
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { products } from './data';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer/Footer';
import CheckoutForm from './components/CheckoutForm';
import WishList from './pages/WishList';
import ReviewProduct from './pages/reviewProduct';
import Dashboard from './pages/Dashboard';
import './css/style.css';
import './components/charts/ChartjsConfig';

const App = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Provider store={store}> {/* Wrap in Provider */}
                <Router>
                    <div className="app">
                        <Navbar />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/products" element={<Products products={products} />} />
                                <Route path="/products/:id" element={<ProductDetails />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/auth/signup" element={<Register />} />
                                <Route path="/auth/signin" element={<Login />} />
                                <Route path="/check" element={<CheckoutForm />} />
                                <Route path="/wishlist" element={<WishList />} />
                                <Route path="/products/:productId/review" element={<ReviewProduct />} />

                                {/* Admin Page Route */}
                                <Route path="/admin/:id/*" element={<AdminPage />} />
                                <Route path="/admin/dashboard" element={<Dashboard />} />

                                {/* Fallback Route */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </Provider> {/* End of Provider */}
        </GoogleOAuthProvider>
    );
};

export default App;

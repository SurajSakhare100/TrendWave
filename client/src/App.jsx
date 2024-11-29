import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store/store'; // Import your Redux store
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Products from './pages/Products';
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
import './components/charts/ChartjsConfig';
import  { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import CashFreePayment from './pages/CashfreePayment';
const Products = lazy(() => import('./pages/Products'));
const App = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return (
        <Suspense fallback={<div className='h-screen bg-white dark:bg-gray-900'>Loading...</div>}>
        <GoogleOAuthProvider clientId={clientId}>
            <Provider store={store}> 
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
                                <Route path="/payment/cashfree/:id" element={<CashFreePayment />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/auth/signup" element={<Register />} />
                                <Route path="/auth/signin" element={<Login />} />
                                <Route path="/check" element={<CheckoutForm />} />
                                <Route path="/wishlist" element={<WishList />} />
                                <Route path="/products/:productId/review" element={<ReviewProduct />} />

                                {/* Admin Page Route */}
                                <Route path="/admin/:id/*" element={<AdminPage />} />

                                {/* Fallback Route */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                        <ToastContainer />
                        <Footer />
                    </div>
                </Router>
            </Provider> {/* End of Provider */}
        </GoogleOAuthProvider>
        </Suspense>
    );
};

export default App;

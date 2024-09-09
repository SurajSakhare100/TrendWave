import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { clearCart } from '../../app/features/cartSlice';
import axios from 'axios';

const Checkout = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Assume you have a backend endpoint to handle order creation
            const response = await axios.post('http://localhost:5000/api/orders', {
                items: cart,
                shippingAddress,
                paymentMethod,
            });
            if (response.data.success) {
                // dispatch(clearCart()); // Clear cart on successful order
                setSuccess(true);
                setShippingAddress('');
                setPaymentMethod('');
            }
        } catch (err) {
            setError('Failed to process the order');
        }
        setLoading(false);
    };

    const handleAddressChange = (event) => {
        setShippingAddress(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    if (loading) {
        return <div className="container mx-auto p-4 text-center">Processing...</div>;
    }

    return (
        <div className="container mx-auto py-14 px-40">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            {success && <div className="text-green-500 mb-4">Order placed successfully!</div>}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
                <textarea
                    value={shippingAddress}
                    onChange={handleAddressChange}
                    rows="4"
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                    placeholder="Enter your shipping address"
                />
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
                <select
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                >
                    <option value="">Select Payment Method</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank-transfer">Bank Transfer</option>
                </select>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
                <div className="border-t border-gray-300 pt-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between mb-2">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="border-t border-gray-300 pt-2 mt-2">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${calculateTotal()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleCheckout}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                Place Order
            </button>
        </div>
    );
};

export default Checkout;

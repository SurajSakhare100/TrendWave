import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const user = useSelector((state) => state.user);
    const items = useSelector((state) => state.cart.items);
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleOrder = async () => {
        setErrorMessage('');
        setOrderSuccess(false);

        try {
            const response = await axios.post(`http://localhost:5000/api/v1/orders/${user?._id}/create`, {
                shippingAddress,
                paymentMethod,
                items
            });

            if (response.status === 200) {
                setOrderSuccess(true);
                setTimeout(() => {
                    navigate('/orders'); // Updated to redirect to an appropriate orders page.
                }, 2000);
            } else {
                throw new Error(response.data?.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Order failed', error);
            setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg my-10">
            <h2 className="text-xl font-semibold mb-4">Checkout</h2>
            <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                    <div className="space-y-3">
                        {['address', 'city', 'postalCode', 'country'].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 capitalize">
                                    {field}
                                </label>
                                <input
                                    type="text"
                                    name={field}
                                    value={shippingAddress[field]}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="PayPal">PayPal</option>
                        <option value="Credit Card">Credit Card</option>
                    </select>
                </div>
                <button
                    onClick={handleOrder}
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Place Order
                </button>
                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
                        {errorMessage}
                    </div>
                )}
                {orderSuccess && (
                    <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
                        Order placed successfully! Redirecting...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;

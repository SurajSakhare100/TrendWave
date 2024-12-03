import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaPaypal, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

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
    const [orderId, setorderId] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [orderSuccess, setOrderSuccess] = useState('');
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
            },{withCredentials:true});

            if (response.status === 201) {
                setorderId(response.data.data);
                if (response.data.data.approvalLink) {
                    window.location.href = response.data.data.approvalLink;
                  }
            } else {
                throw new Error(response.data?.message || 'Failed to place order');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 pt-24 pb-10 text-black">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-semibold mb-4 md:pb-4 border-black border-b-4">Checkout</h2>

                <div className="flex w-full mx-auto md:gap-24">
                    <div className="md:w-2/3 space-y-4">
                        <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                        <div className="border-b border-gray-200 pb-4">
                            <div className="space-y-3">
                                {['country', 'address', 'city','state', 'postalCode'].map((field) => (
                                    <div key={field}>
                                        <Input
                                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                                            type="text"
                                            placeholder={`Enter your ${field}`}
                                            name={field}
                                            value={shippingAddress[field]}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/3 border-black border h-fit p-8 rounded-sm">
                        <h2 className="text-3xl text-center font-semibold mb-4">Your Order</h2>
                        <ul className="space-y-6">
                            {items.map((item) => (
                                <li key={item._id} className="flex items-center justify-between border-b pb-4 border-black">
                                    <Link to={`/products/${item.productId._id}`}>
                                        <img
                                            src={item.image}
                                            alt={item.productId.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    </Link>
                                    <div className="w-full flex flex-col gap-2 sm:flex-row justify-between items-end sm:items-center">
                                        <div className="flex flex-col items-end sm:items-start sm:mx-4">
                                            <h2 className="md:text-lg font-semibold text-gray-800">
                                                {item.productId.name}
                                            </h2>
                                            <p className="text-gray-600 text-sm font-bold">
                                                Price: {item.price.toFixed(2)} RS
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between mt-6 font-semibold">
                            <span>Total</span>
                            <span>{calculateTotal()} RS</span>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                            <div className="space-y-3 ">
                                {['PayPal', 'COD'].map((method) => (
                                    <label key={method} className="inline-flex items-center cursor-pointer">
                                        <Input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method}
                                            checked={paymentMethod === method}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-2"
                                        />
                                        {method === 'PayPal' && <FaPaypal className="text-blue-600" />}
                                        {method === 'COD' }
                                        <span className="ml-2">{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Order Buttons */}
                        <Button onClick={handleOrder} size="xl" className="w-full mt-4">
                            Place Order
                        </Button>
                    </div>
                </div>

                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;

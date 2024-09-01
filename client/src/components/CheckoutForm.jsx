import React, { useState } from 'react';

const CheckoutForm = () => {
    const [form, setForm] = useState({
        name: '',
        address: '',
        payment: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={form.name} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="address" 
                placeholder="Address" 
                value={form.address} 
                onChange={handleChange} 
            />
            <select 
                name="payment" 
                value={form.payment} 
                onChange={handleChange}>
                <option value="">Payment Method</option>
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
            </select>
            <button type="submit">Place Order</button>
        </form>
    );
};

export default CheckoutForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { load } from '@cashfreepayments/cashfree-js';
import { useParams } from 'react-router-dom';

const CashFreePayment = () => {
    const [orderData, setOrderData] = useState('')
    const { id } = useParams();
    useEffect(() => {
        const handleOrder = async () => {

            try {
                const response = await axios.get(`http://localhost:5000/api/v1/orders/${id}`);
                // setOrderData(response.data.data)
                console.log(response)
            } catch (error) {
            }
        };
        handleOrder()
    }, [])
    // const handlePayment = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:3000/create-order', orderData);
    //         if (response.data.payment_session_id) {
    //             const paymentSessionId = response.data.payment_session_id;
    //             setPaymentLink(paymentSessionId);

    //             const checkoutOptions = {
    //                 paymentSessionId: paymentSessionId,
    //                 redirectTarget: '_modal',
    //             };
    //             console.log(checkoutOptions)
    //             const cashfree = await load({ mode: 'sandbox' });
    //             cashfree.checkout(checkoutOptions).then((res) => {
    //                 console.log('Payment Result:', res);
    //             }).catch((err) => {
    //                 console.error('Cashfree Checkout Error:', err);
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Payment creation failed:', error);
    //     }
    // };

    return (
        <div className="payment-container">
            <h2>Make Payment</h2>
            <p>Order Amount: ₹{orderData.orderAmount}</p>
            <p>Customer: {orderData.customerName}</p>

            {/* <button onClick={handlePayment} className="pay-now-btn">
                Pay Now
            </button> */}
        </div>
    );
};

export default CashFreePayment;

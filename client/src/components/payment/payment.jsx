import React from 'react';
import axios from 'axios';

const Payment = ({ amount }) => {
  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  React.useEffect(() => {
    loadRazorpay();
  }, []);

  const initiatePayment = async () => {
    try {
      const { data: orderData } = await axios.post('http://localhost:5000//api/payment/create-order', { amount });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: 'INR',
        name: 'E-commerce Clothing',
        description: 'Clothing Order Payment',
        order_id: orderData.orderId,
        handler: async (response) => {
          const paymentVerificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Step 3: Verify the payment on the server
          const verification = await axios.post('/api/payment/verify-payment', paymentVerificationData);

          if (verification.data.success) {
            alert('Payment Successful!');
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: 'Customer Name', // Customize based on user info
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Step 4: Open Razorpay payment UI
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment');
    }
  };

  return (
    <div>
      <button onClick={initiatePayment} className="btn btn-primary ">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;

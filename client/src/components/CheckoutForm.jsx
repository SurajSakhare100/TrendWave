
import React from 'react';
import Payment from './payment/payment';

const CheckoutForm = () => {
 
  const amount = 500; 
  return (
    <div>
      <h1>Checkout Page</h1>
      <p>Amount to pay: ₹{amount}</p>
      <Payment amount={amount} />
    </div>
  );
};

export default CheckoutForm;

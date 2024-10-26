import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  removeFromCartAPI, updateQuantityAPI } from '../app/features/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const carts=useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user._id);
  const handleRemove = (productId) => {
    dispatch(removeFromCartAPI({ userId, productId }));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantityAPI({ userId, productId, quantity }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {items?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {items?.map((item) => (
              <li key={item._id} className="flex items-center justify-between mb-4 p-4 border rounded-lg">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mr-4" />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-700">Price: {item.price.toFixed(2)} RS</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-16 p-1 border rounded-lg text-center"
                    onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value, 10))}
                  />
                  <button
                    onClick={() => handleRemove(item.productId._id)}
                    className="ml-4 p-2 bg-red-500 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Total Price: {totalPrice?.toFixed(2)} RS</h2>
          </div>
          <div className="mt-6">
            <button
              onClick={handleCheckout}
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

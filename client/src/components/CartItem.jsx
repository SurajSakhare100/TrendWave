import React from 'react';
import Button from './Button/Button';

const CartItem = ({ item, removeFromCart }) => {
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>${item.price}</p>
            <Button 
            onClick={() => removeFromCart(item.id)}
            type = "button"
            variant = "primary"
            size = "md"
            >Removes</Button>
        </div>
    );
};

export default CartItem;

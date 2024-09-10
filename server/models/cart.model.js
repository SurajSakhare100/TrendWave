import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true },
            image: { type: String }
        }
    ],
    totalPrice: { type: Number, default: 0 }  // Default value for totalPrice
}, { timestamps: true });

// Pre-save hook to recalculate totalPrice before saving
cartSchema.pre('save', function (next) {
    // Safeguard: Ensure each item's price and quantity are valid numbers
    this.totalPrice = this.items.reduce((total, item) => {
        const itemPrice = isNaN(item.price) ? 0 : item.price;
        const itemQuantity = isNaN(item.quantity) ? 0 : item.quantity;
        return total + itemPrice * itemQuantity;
    }, 0);
    
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

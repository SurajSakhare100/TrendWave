import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 },  // Default quantity is 1
            price: { type: Number,default:0 },  // Price of the product at the time of adding to cart
            stock: { type: Number, default:0},  // Available stock of the product
            image: { type: String },
            isFeatured: {
                type: Boolean,
                default: false,
            }, 
        }
    ],
    totalPrice: { type: Number, default: 0 }  // Total price of all items in the cart
}, { timestamps: true });

// Pre-save hook to recalculate totalPrice before saving
cartSchema.pre('save', function (next) {
    // Recalculate totalPrice based on the sum of each item's price and quantity
    this.totalPrice = this.items.reduce((total, item) => {
        // Validate that the price and quantity are valid numbers
        const itemPrice = isNaN(item.price) ? 0 : item.price;
        const itemQuantity = isNaN(item.quantity) ? 0 : item.quantity;

        // Add the item's total price (price * quantity) to the cart total
        return total + itemPrice * itemQuantity;
    }, 0);

    next();  // Continue to the next middleware or save operation
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

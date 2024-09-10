import Order from '../models/order.model.js';

// Create a new order
export const CreateOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        const { userId } = req.params;

        // Create a new order
        const newOrder = new Order({
            userId,
            items,
            shippingAddress,
            paymentMethod,
            totalPrice: items.reduce((acc, item) => acc + item.price * item.quantity, 0),  // Calculate total price
            status: 'Processing',  // Set the initial order status
            createdAt: Date.now()
        });

        // Save the order to the database
        await newOrder.save();

        // Clear the user's cart after order creation (assuming you already implemented this in the cart logic)
        await Cart.findOneAndUpdate(
            { userId },
            { $set: { items: [], totalPrice: 0 } }, // Empty cart and reset totalPrice
            { new: true }
        );

        res.json({ success: true, message: 'Order placed successfully', orderId: newOrder._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to process order' });
    }
};

// Get an order by its ID
export const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId).populate('items.productId');
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all orders for a specific user
export const getAllOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ userId }).populate('items.productId');
        if (!orders || orders.length === 0) return res.status(404).json({ message: 'No orders found' });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
